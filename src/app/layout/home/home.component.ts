import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/login/user.service';
import { User } from 'src/app/login/user.model';
import { HomeService } from './home.service';
import { Lead, Policy } from './lead.model';
import { PolicyService } from './policy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  userInfo: User;
  leads: Lead[] = [];
  policies: Policy[] = [];

  users: User[] = []
  name: string;
  mobile: string;
  userId: number;
  subs = new Subscription()
  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private policyService: PolicyService) { }

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.loadLeads();
    this.loadUsers();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  loadLeads() {
    let id = this.userInfo.id;
    let url = this.userInfo.user_type === 0 ? "leads" : "leads/byuser/" + id
    this.subs.add(this.homeService.getLeads(url).subscribe(leads => {
      this.leads = leads;
    }))
  }


  loadUsers() {
    this.subs.add(this.userService.getUsers().subscribe(users => {
      this.users = users;
    }))
  }

  createLead() {
    this.subs.add(this.homeService.createLead(this.name, this.mobile, this.userId).subscribe(leads => {
      this.leads = leads;
      this.loadLeads();
      this.resetLead();
    }))
  }

  deleteLead(id) {

  }

  onClickLead(lead: Lead) {
    this.subs.add(this.policyService.getPolicyByLead(lead.id).subscribe(policies => {
      this.policies = policies
    }))
  }

  resetLead() {
    this.name = "";
    this.mobile = "";
    this.userId = undefined;
  }

  get isValidToCreateLead() {
    return this.name && this.userId && this.mobile
  }


  get isAdmin() {
    return this.userInfo.user_type === 0
  }
}
