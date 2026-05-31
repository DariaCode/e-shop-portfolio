import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss'],
    standalone: false
})
export class LoginButtonComponent {

  constructor(private auth: AuthService) { }

  login() {
    this.auth.login();
  }

}
