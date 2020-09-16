import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpIResponse, UserLoginRequest, UserLoginResponse} from "../../_interfaces/user";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public auth(user: UserLoginRequest): Observable<UserLoginResponse> {
        return this.getUsers()
            .pipe(
                map((resp) => {
                    const checkUser = resp.users.filter(i => i.email === user.email && i.password === user.password)[0]
                    let response: UserLoginResponse = {success: false};
                    if (checkUser) {
                        response.success = true;
                        response.token = checkUser.token;
                        response.user_info = checkUser
                        delete checkUser.password
                        delete checkUser.token
                    } else {
                        response.error = 'User not found';
                    }
                    return response
                })
            )
    }

    private getUsers(): Observable<HttpIResponse> {
        return this.http.get<HttpIResponse>('/assets/api/users.json');
    }

    public static generateToken(len: number): string {
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789".split("");
        let token = [];
        for (let i=0; i<len; i++) {
            let j = (Math.random() * (str.length-1)).toFixed(0);
            token[i] = str[j];
        }
        return token.join("");
    }
}
