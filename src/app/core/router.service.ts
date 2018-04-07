import { Injectable } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';

@Injectable()

export class RouterService {

  routeUrl = new BehaviorSubject(null);

  constructor(private _router: Router) {
    _router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: any) => {
        const absUrl = this.getAbsolutePath(event.url);
        this.routeUrl.next(absUrl);
        console.log(absUrl);
      });
  }

  getAbsolutePath(url: string): string {
    const idx = url.indexOf('/', 1);
    if (idx !== -1) {
      return url.slice(0, idx);
    } else {
      return url;
    }
  }

}
