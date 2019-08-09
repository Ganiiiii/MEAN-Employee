import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
addUser:FormGroup;
  constructor(private fb:FormBuilder,private serve:ServicesService,private router:Router,private route:ActivatedRoute,private toaster:ToastrService) { }

  ngOnInit()
  {
    this.addUser = this.fb.group({
      fname:['',Validators.required],
      lname:[''],
      email:['',Validators.required],
      password:['',Validators.required],
      conPass:['',Validators.required]
    })
  }

  onSubmit()
  {
    if(this.addUser.get('password').value===this.addUser.get('conPass').value)
    {
      let obj = {
        fname:this.addUser.get('fname').value,
        lname:this.addUser.get('lname').value,
        email:this.addUser.get('email').value,
        password:this.addUser.get('password').value
      }
      let data = JSON.stringify(obj);
    this.serve.addUSer(data)
    .subscribe(res=>{this.toaster.success('user added successfully');console.log('User Successfully inserted',res);this.router.navigate(['../login'],{relativeTo:this.route})},err=>{
      if(err.error === 'already exists..!')
      this.toaster.error('Alreasy exists...!')
      else
      console.log('Failed To Add',err);})
    }
    else
   this.toaster.error('passwords didn\'t match');
  }
}
