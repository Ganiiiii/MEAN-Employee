import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ServicesService } from './shared/services.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private serve:ServicesService,private router:Router){}
  canActivate(): boolean
  {  
    if(this.serve.loggedIn())
    {
      return true;
    }
    else
    {
      this.router.navigate(['auth/login']);
      return false;
    }
  }
}
