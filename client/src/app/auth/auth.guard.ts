import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user/user.service';
import { Login } from './interfaces/login';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.userService.checkUserSession();
    return this.userService.authNStatus().then((auth) => {
      console.log("In auth guard with auth status", auth);
      let loginStr = localStorage.getItem('poslogin');
        if(loginStr) {
          let login: Login = JSON.parse(loginStr);
          if(login && login.role.toUpperCase() == 'ADMIN') {
            return true;
          }
        }
        else
        this.router.navigate(['/login', { redirectTo: state.url }]);
        console.log('User is not authenticated to see this screen!!!');
        return false;
    });
  }
}
