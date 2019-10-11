import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApplicationsService } from '../../applications.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ApplicationDetailsKeys, GenerateKeyPayload } from '../../applications.data.models';
import { take } from 'rxjs/operators';
import { GenerateAppKey, GenerateAppKeySuccess } from '../../applications.actions';
import { Actions, ofType } from '@ngrx/effects';
import { NotificationService } from '../../../shared/services/notification.service';

@Component({
  selector: 'store-generate-key-form',
  templateUrl: './generate-key-form.component.html',
  styleUrls: ['./generate-key-form.component.scss']
})
export class GenerateKeyFormComponent implements OnInit, OnDestroy {

  @Input() keyEnv: string;
  public envLabel:string;
  public callback:string;
  public validity:string;

  private appId:string = null;
  private newKeyGenerated:boolean = false;
  public keyObject:ApplicationDetailsKeys;
  public keyPayload:GenerateKeyPayload = new GenerateKeyPayload();
  public keySecretVisibility:boolean = false

  grantTypes = [
    {
      name: 'Refresh Token',
      value: 'refresh_token',
      checked : true
    },
    {
      name: 'SAML2',
      value: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
      checked : true
    },
    {
      name: 'Implicit',
      value: 'implicit',
      checked : false
    },
    {
      name: 'Password',
      value: 'password',
      checked : true
    },
    {
      name: 'IWA-NTLM',
      value: 'iwa:ntlm',
      checked : true
    },
    {
      name: 'Client Credential',
      value: 'client_credentials',
      checked : true
    },
    {
      name: 'Code',
      value: 'authorization_code',
      checked : false
    },
    {
      name: 'JWT',
      value: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      checked : true
    }
  ];
  constructor(
    private appService: ApplicationsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private cd:ChangeDetectorRef,
    private actions$: Actions,
    private notification: NotificationService
  ) {
    this.route.params.subscribe(params => {
      this.appId = params['appId'];
    })
  }

  private storeSelect;

  ngOnInit() {
    this.envLabel = (this.keyEnv == 'PRODUCTION') ? "Production" : "Sandbox";
    this.keyPayload.keyType = this.keyEnv;

    this.storeSelect = this.store.select((s) => s.applications.selectedApplication.keys).pipe(take(1)).subscribe((appDetails) => {
      this.keyObject = appDetails.find(i => i.keyType == this.keyEnv);
      if(this.keyObject){
        console.log(this.keyObject);
        this.grantTypes.forEach((t, i) => {
          this.grantTypes[i].checked = this.keyObject.supportedGrantTypes.includes(t.value)
        })
        this.keyPayload.callbackUrl = this.keyObject.callbackUrl;
      }
      this.cd.detectChanges();
    });

    this.actions$.pipe(ofType(GenerateAppKeySuccess)).pipe(take(1)).subscribe(p => {
      this.newKeyGenerated = true;
    })
  }

  switchKeyVisibility(action){
    this.keySecretVisibility = action;
  }

  clickToCopy(text){
    const event = (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', text);
      e.preventDefault();
      document.removeEventListener('copy', event);
    }
    document.addEventListener('copy', event);
    document.execCommand('copy');
    this.notification.success('Copied to clipboard');
  }

  ngOnDestroy(){
    this.storeSelect.unsubscribe();
    this.cd.detach();
  }

  generateKey(){
    let supportedGrantTypes = this.grantTypes.filter(opt => opt.checked).map(opt => opt.value);
    this.keyPayload.supportedGrantTypes = supportedGrantTypes;

    if(this.keyObject || this.newKeyGenerated){
      this.appService.updateAppKey(this.appId, this.keyPayload).subscribe(response => {});
    }
    else{
      this.store.dispatch(GenerateAppKey({ 'appId' : this.appId, 'payload' : this.keyPayload}))
    }

  }

  callbackUpdate(value){
    if(!value || value == '') {
      this.grantTypes.forEach((t, i) => {
        if(t.value == 'implicit' || t.value == 'authorization_code') this.grantTypes[i].checked = false;
      })
    }
  }
}
