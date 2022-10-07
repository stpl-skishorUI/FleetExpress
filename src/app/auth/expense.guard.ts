import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WebStorageService } from '../services/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {

  constructor(private webStorage: WebStorageService, private router: Router) { }
  
  canActivate( route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.router)
    console.log(route.routeConfig)
    console.log(this.webStorage)
    // let urlSplit: any = route.routeConfig?.path?.split('/');
    // if (this.webStorage?.getAllPageName().find((x: any) => x.pageURL.includes(urlSplit[0]))) {
    //   return true
    // }
    // else {
    //   this.router.navigate(['/access-denied']);
    //   return false
    // }

    return true
  }

  
}
