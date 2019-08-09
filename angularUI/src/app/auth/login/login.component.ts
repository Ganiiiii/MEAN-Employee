import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin:FormGroup;

  constructor(private fb:FormBuilder,private serve:ServicesService,private router:Router,private route:ActivatedRoute,private toaster:ToastrService) { }

  ngOnInit()
  {
    this.userLogin = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  onSubmit()
  {
    let obj={
      email:this.userLogin.get('email').value,
      password:this.userLogin.get('password').value
    }
    let data=JSON.stringify(obj);
    console.log(data);
    this.serve.getUser(data)
    .subscribe(result=>{console.log(result);localStorage.setItem('token',result.token);this.router.navigate(['employee/display'])},err=>console.log(err));
  }
  
  forgotPass()
  {
    this.router.navigate(['../reset'],{relativeTo:this.route});
  }
}
