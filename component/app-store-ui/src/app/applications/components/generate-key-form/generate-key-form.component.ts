import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ApplicationsService } from '../../applications.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.data.models';
import { ApplicationDetailsKeys, GenerateKeyPayload } from '../../applications.data.models';
import { GenerateAppKeyAction, RegenerateSecretAction, UpdateAppKeyAction } from '../../applications.actions';
import { Actions } from '@ngrx/effects';
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

  public keyObject:ApplicationDetailsKeys;
  public keyPayload:GenerateKeyPayload = new GenerateKeyPayload();
  public keySecretVisibility:boolean = false;

  public accessTokenExpanded = true; // = false;
  public accessTokenUser;
  public accessTokenGrant = 'password';
  public accessTokenAuth;
  public accessTokenValidity:number = 3600;
  public accessTokenVisible = false;

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

    this.storeSelect = this.store.select((s) => s.applications.selectedApplication.keys).subscribe((appDetails) => {
      this.keyObject = appDetails.find(i => i.keyType == this.keyEnv);
      if(this.keyObject){
        this.grantTypes.forEach((t, i) => {
          this.grantTypes[i].checked = this.keyObject.supportedGrantTypes.includes(t.value)
        })
        this.keyPayload.callbackUrl = this.keyObject.callbackUrl;
        this.accessTokenAuth = btoa(`${this.keyObject.consumerKey}:${this.keyObject.consumerSecret}`);
      }
      this.cd.detectChanges();
    });

    this.store.select((s) => s.authentication.loggedUser).subscribe((user) => {
      this.accessTokenUser = user;
    })
  }

  switchKeyVisibility(action){
    this.keySecretVisibility = action;
  }

  switchAccessTokenVisibility(action){
    this.accessTokenVisible = action;
  }

  ngOnDestroy(){
    this.storeSelect.unsubscribe();
    this.cd.detach();
  }

  generateKey(){
    let supportedGrantTypes = this.grantTypes.filter(opt => opt.checked).map(opt => opt.value);
    this.keyPayload.supportedGrantTypes = supportedGrantTypes;

    if(this.keyObject){
      this.store.dispatch(UpdateAppKeyAction({ 'appId' : this.appId, 'payload' : this.keyPayload}))
    }
    else{
      this.store.dispatch(GenerateAppKeyAction({ 'appId' : this.appId, 'payload' : this.keyPayload}))
    }

  }

  resetKey(){
    this.store.dispatch(RegenerateSecretAction({ 'payload' : this.keyObject.consumerKey}))
  }

  callbackUpdate(value){
    if(!value || value == '') {
      this.grantTypes.forEach((t, i) => {
        if(t.value == 'implicit' || t.value == 'authorization_code') this.grantTypes[i].checked = false;
      })
    }
  }

  accessTokenExpand(){
    this.accessTokenExpanded = true;
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

  copyAccessToken(){
    let accessToken = `curl -k -d "grant_type=${this.accessTokenGrant}`;
    if(this.accessTokenGrant == 'password') accessToken += `&username=${this.accessTokenUser}&password=Password`;
    accessToken += `" -H "Authorization: Basic ${this.accessTokenAuth}" https://192.168.56.1:8243/token`;

    this.clickToCopy(accessToken);
  }
}
