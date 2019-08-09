import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/shared/services.service';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display',
  template: `
  <body style="background-image: linear-gradient(to right bottom, #dce8f8, #d0d6e8, #c4c4d6, #bab2c4, #afa0b1);">
  <h1 style="text-align:center;color:green;margin-top:.4cm;">Employee Data<span><button style="float:right;width:4cm;margin-top:.3cm" class="btn btn-primary" routerLink="../register">Add</button><button type="button" style="float:left;width:4cm;margin-top:.3cm"class="btn btn-primary" (click)="openModal(template)">Quick Add</button></span></h1>
 <ng-template #template>
   <div class="modal-header">
    <h4 class="modal-title pull-right">Employee Data</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="modalRef.hide()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">


  <form [formGroup]="quickAddForm" (ngSubmit)="onSubmit()">
  <label>First Name:</label>
  <input type="text" class="form-control" formControlName="fname"> 
  <label>Last Name:</label>
  <input type="text" class="form-control" formControlName="lname">
  <label>Email:</label>
  <input type="text" class="form-control" formControlName="email"><br>
  <button [disabled]="!quickAddForm.valid" type="submit" class="btn btn-primary" style="margin-left:3cm;width:200px" (click)="modalRef.hide()">ADD</button>
  </form>


  </div>
</ng-template>


  <table>
    <tr>
      <th>Index</th>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Email</th>
      <th>Birthdate</th>
      <th>Phone No</th>
      <th>Gender</th>
      <th>Qualification</th>
      <th>Address</th>
      <th>State</th>
      <th>City</th>
      <th>ZipCode</th>
      <th>Delete</th>
      <th>Update</th>
    </tr>
  
    <tr *ngFor="let emp of employees;index as i">
      <td>{{i+1}}</td>
      <td>{{emp.fname}}</td>
      <td>{{emp.lname}}</td>
      <td>{{emp.email}}</td>
      <td>{{emp.birthdate}}</td>
      <td>{{emp.phone}}</td>
      <td>{{emp.gender}}</td>
      <td>{{emp.qualification}}</td>
      <td>{{emp.address}}</td>
      <td>{{emp.state}}</td>
      <td>{{emp.city}}</td>
      <td>{{emp.zipCode}}</td>
      <td><span><button type="submit" class="btn btn-danger" (click)="delR(i)" style="margin-bottom:3%">Delete</button></span></td>
      <td><span><button type="submit" class="btn btn-warning" (click)="updR(i)" style="margin-bottom:3%">Edit</button></span></td>
    </tr>
  
  </table>
  </body>

  `,
  styles: ['table{border-collapse: collapse;width: 100%;} th, td {text-align: left;padding: 8px;} tr:nth-child(even){background-color: #f2f2f2} th{background-color: #4CAF50;color: white;}']
})
export class DisplayComponent implements OnInit {
  modalRef: BsModalRef;
  quickAddForm:FormGroup;
  emp;
  public employees = [];
  constructor(private toastr:ToastrService,private fb:FormBuilder,private http1:ServicesService,private router: Router,private route:ActivatedRoute,private modalService: BsModalService) { }
   openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  
  ngOnInit() {
    this.quickAddForm=this.fb.group({
      fname:['',Validators.required],
      lname:['',Validators.required],
      email:['',Validators.required]
    })

    this.http1.disUser()
      .subscribe((res: any) => {
        this.employees = res;
      }, error => console.log('Error...!', error));
  };

  delR(i) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.value) {
        const id = this.employees[i]._id;
      //console.log(id);
      this.http1.delUser(id)
        .subscribe(response => { console.log('success...!', response); this.ngOnInit(); }, error => console.log('Error...!', error))
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
      else
      this.router.navigate(['../display'],{relativeTo:this.route});
    })
  
  }
  updR(i) {
    console.log('edit');
    const id = this.employees[i]._id;
    this.router.navigate(['../updateRecord', id],{relativeTo:this.route});
  }
  onSubmit()
  {
    let formData = new FormData();
    formData.append('fname',this.quickAddForm.get('fname').value);
    formData.append('lname',this.quickAddForm.get('lname').value);
    formData.append('email',this.quickAddForm.get('email').value);
    this.http1.regiUser(formData)
    .subscribe(response => {console.log(response);this.toastr.success('Employee SuccessFully Added...!');if(response){ this.ngOnInit()}} ,erro=>{console.log(erro)});
  }
}
 