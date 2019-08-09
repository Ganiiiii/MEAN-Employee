import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicesService } from 'src/app/shared/services.service';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-link',
  templateUrl: './reset-link.component.html',
  styleUrls: ['./reset-link.component.css']
})
export class ResetLinkComponent implements OnInit {
  resetPass:FormGroup;

  constructor(private fb:FormBuilder,private serve:ServicesService,private toastr:ToastrService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit()
  {
    this.resetPass = this.fb.group({
      email:['']
    })
  }

  onSubmit()
  {
    let email=this.resetPass.get('email').value;
    console.log('in submit');
    this.serve.sendEmail(email)
    .subscribe(res=>{this.toastr.success('email has been send..!');this.router.navigate(['../login'],{relativeTo:this.route})},err=>console.log(err));
  }
}
