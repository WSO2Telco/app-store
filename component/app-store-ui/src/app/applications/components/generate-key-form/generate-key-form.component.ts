import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'store-generate-key-form',
  templateUrl: './generate-key-form.component.html',
  styleUrls: ['./generate-key-form.component.scss']
})
export class GenerateKeyFormComponent implements OnInit {

  @Input()
  formTitle: string;

  grantTyles = [
    {
      name: 'Refresh Token',
      value: 'RF'
    },
    {
      name: 'SAML2',
      value: 'SAML2'
    },
    {
      name: 'Implicit',
      value: 'Implicit'
    },
    {
      name: 'Password',
      value: 'PW'
    },
    {
      name: 'IWA-NTLM',
      value: 'IWA-NTLM'
    },
    {
      name: 'Client Credential',
      value: 'CC'
    },
    {
      name: 'Code',
      value: 'Code'
    }
  ];
  constructor() {}

  ngOnInit() {}
}
