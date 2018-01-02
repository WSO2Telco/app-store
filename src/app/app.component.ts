import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoginAction } from './authentication/authentication.models';

@Component({
  selector: 'store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public opened: boolean;
  public rightNavOpened: boolean;

  ngOnInit(): void {
    setTimeout(() => {
      this.opened = true;
    }, 100);
  }

  private onMenuSelect(event: LoginAction) {
    if (event.type === 'Login') {
      this.rightNavOpened = !this.rightNavOpened;
    }
  }
}
