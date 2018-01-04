import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user/user.service';

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
      if (auth) {
        return true;
      } else {
        this.router.navigate(['/login', { redirectTo: state.url }]);
        return false;
      }
    });
  }
}
