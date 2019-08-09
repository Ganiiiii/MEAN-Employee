import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  login;
  constructor(private router:Router,private route:ActivatedRoute,private toaster:ToastrService) { }

  ngOnInit()
  {
    if(localStorage.getItem('token'))
    {
      console.log('true');
      this.login=true;
    }
    else
    {
      console.log('false');
      this.login=false;
    }
    
  }
  logout()
  {
    localStorage.clear();
    this.login= false;
    this.toaster.success('you are successfully logout..!')
    this.router.navigate(['/dashbord']);
  }
}
