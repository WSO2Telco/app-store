import { Component, OnInit, Input } from '@angular/core';
import { ApplicationsService } from '../../applications.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'store-generate-key-form',
  templateUrl: './generate-key-form.component.html',
  styleUrls: ['./generate-key-form.component.scss']
})
export class GenerateKeyFormComponent implements OnInit {

  @Input() keyEnv: string;
  public envLabel:string;
  public callback:string;
  public validity:string;

  private appId:string = null;

  grantTyles = [
    {
      name: 'Refresh Token',
      value: 'refresh_token',
      checked : false
    },
    {
      name: 'SAML2',
      value: 'urn:ietf:params:oauth:grant-type:saml2-bearer',
      checked : false
    },
    {
      name: 'Implicit',
      value: 'implicit',
      checked : false
    },
    {
      name: 'Password',
      value: 'password',
      checked : false
    },
    {
      name: 'IWA-NTLM',
      value: 'iwa:ntlm',
      checked : false
    },
    {
      name: 'Client Credential',
      value: 'client_credentials',
      checked : false
    },
    {
      name: 'Code',
      value: 'authorization_code',
      checked : false
    },
    {
      name: 'JWT',
      value: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      checked : false
    }
  ];
  constructor(
    private appService: ApplicationsService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.appId = params['appId'];
    })
  }

  ngOnInit() {
    this.envLabel = (this.keyEnv == 'prod') ? "Production" : "Sandbox";
  }

  generateKey(){
    let supportedGrantTypes = this.grantTyles.filter(opt => opt.checked).map(opt => opt.value);
    let env = (this.keyEnv == 'prod') ? "PRODUCTION" : "SANDBOX";

    let payload = {
      "validityTime": "3600",
      "keyType": env,
      "accessAllowDomains": [ "ALL" ],
      "scopes": [ "am_application_scope", "default" ],
      "supportedGrantTypes": supportedGrantTypes
    }

    if(this.callback != ''){
      payload['callbackUrl'] = this.callback;
    }

    this.appService.generateAppKey(this.appId, payload).subscribe(response => {
      console.log(response);
    });

  }
}
