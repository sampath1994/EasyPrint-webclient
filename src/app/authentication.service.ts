import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/signin?username=${username}&password=${password}`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getMyRole(){
    return this.http.get<any>(`${environment.apiUrl}/users/me`);
  }

  public isAuthenticated(): boolean {
    const token_obj = localStorage.getItem('currentUser');
    if(token_obj == null){
      return false;
    }else{
    const token = JSON.parse(token_obj).token;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
    }
  }
}
