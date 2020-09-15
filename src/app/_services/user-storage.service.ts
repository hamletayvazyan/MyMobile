import { Injectable } from '@angular/core';
import { User, UserLoginResponse} from "../_interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  get getToken(): string {
    if (this.getLocalStorageUserAuthInfo) {
      return this.getLocalStorageUserAuthInfo.token;
    }
  }

  get getUserAuthInfo(): User {
    if (this.getLocalStorageUserAuthInfo) {
      return this.getLocalStorageUserAuthInfo.user_info;
    }
  }

  // localStorage UserAuthInfo ---------------------------------------------
  get getLocalStorageUserAuthInfo(): UserLoginResponse {
    return JSON.parse(localStorage.getItem('userAuthInfo'));
  }

  setToLocalStorageUserAuthInfo(userAuthInfo: UserLoginResponse): void {
    localStorage.setItem('userAuthInfo', JSON.stringify(userAuthInfo));
  }

  // remove from storage
  removeFromLocalStorageUserInfo() {
    localStorage.removeItem('userAuthInfo');
  }
}
