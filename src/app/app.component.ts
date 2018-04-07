import { Component } from '@angular/core';
import { RouterService } from './core/router.service';
import { AuthService } from './core/auth.service';
// import { SideNavListComponent } from './ui/side-nav-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navList = Array(20);

  isAuthenticated = false;

  constructor(private _routerService: RouterService, private _authService: AuthService) {
    console.log('AppComponent Constructor Call');

    this._authService.currentUser$.subscribe(
      (user) => {
        if (user) {
          console.log('User already loggedin!');
          this.isAuthenticated = true;
        } else {
          console.log('User not logged-in: call loginAnonymously()');
          this._authService.loginAnonymously();
        }
      });
  }
}
