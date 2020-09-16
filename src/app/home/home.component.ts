import { Component } from '@angular/core';
import {UserStorageService} from "../_services/user-storage.service";
import {Router} from "@angular/router";
import {User} from "../_interfaces/user";
import {HomeService} from "./_services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {
  public userInfo: User;
  constructor(private userStorageService: UserStorageService,
              private homeService: HomeService,
              private router: Router) {
    this.userInfo = userStorageService.getUserAuthInfo;
    this.getPhotos()
  }

  logout(){
    this.userStorageService.removeFromLocalStorageUserInfo()
    this.router.navigate(['/auth'])
  }

  getPhotos() {
    this.homeService.searchPhotos().subscribe((resp) => {
      console.log(resp);
    })
  }
}
