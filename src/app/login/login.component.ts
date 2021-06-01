import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from './user.service';
import { LoginUser } from './user-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private service: UserService, 
    private authService: AuthService, 
    private route : Router) { }
  username: string;
  password: string;

  subs = new Subscription();

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onSubmit() {
    if (this.isValid) {
      let user: LoginUser = {
        email: this.username,
        password: this.password
      }
      this.subs.add(this.service.login(user).subscribe((userResponse) => {
        this.authService.setToken(userResponse.token);
        this.authService.setUserInfo(userResponse.user);

        this.route.navigateByUrl("/")
      }))
    }
  }

  get isValid() {
    return this.username && this.password
  }
}
