import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: AuthenticationService,private jwtHelper: JwtHelperService ,private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const expectedRole = next.data.expectedRole;
      if(this.auth.isAuthenticated()){
        const tokenPayload = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token);
        if(tokenPayload.auth[0].authority == expectedRole){
          return true;
        }else{
          this.router.navigate(['login']);
          return false;
        }
      }else{
        this.router.navigate(['login']);
        return false;
      }
  }
}
