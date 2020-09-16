import { Component } from '@angular/core';
import {UserStorageService} from "../_services/user-storage.service";
import {Router} from "@angular/router";
import {User} from "../_interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userInfo: User;
  constructor(private userStorageService: UserStorageService,
              private router: Router) {
    this.userInfo = userStorageService.getUserAuthInfo;
  }

  logout(){
    this.userStorageService.removeFromLocalStorageUserInfo()
    this.router.navigate(['/auth'])
  }
}
