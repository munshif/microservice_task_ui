import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';
import { UserService } from '../login/user.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {

  userInfo: User;
  subs = new Subscription();
  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  logoff() {
    this.authService.setToken("");
    this.authService.setUserInfo("");
    this.router.navigateByUrl("/login");
    this.subs.add(this.userService.logOut().subscribe())
  }

}
