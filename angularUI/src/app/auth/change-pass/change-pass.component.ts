import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  changePass:FormGroup;

  constructor(private fb:FormBuilder,private serve:ServicesService,private route:ActivatedRoute,private router:Router,private toastr:ToastrService) { }

  ngOnInit()
  {
    this.changePass = this.fb.group({
      newPass:['',Validators.required],
      conPass:['',Validators.required]
    })
  }

  onSubmit()
  {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(this.changePass.get('newPass').value === this.changePass.get('conPass').value)
    {
      let obj= {
        id:id,
        newPass:this.changePass.get('newPass').value,
      }
      let data = JSON.stringify(obj);
      console.log('in ts');
      this.serve.changePass(data)
      .subscribe(response=>{this.toastr.success('Password has been updated..!');console.log(response);this.router.navigate(['../../login'],{relativeTo:this.route})},err=>this.toastr.error('Link Expired....!  '))
    }
    else
    {
      this.toastr.error('password didn\'t match');
    }
    
  }

}
