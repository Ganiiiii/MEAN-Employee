import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'
import { ServicesService } from 'src/app/shared/services.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { skillsValidator } from 'src/app/shared/skills.validator';
import { ValidationService } from 'src/app/shared/validation.service';

@Component({
  selector: 'app-add',
  template: `
  <div class="container-fluid" style="margin-top: 1cm; margin-left: 25%;width:50%;background-image: linear-gradient(to right bottom, #dce8f8, #d0d6e8, #c4c4d6, #bab2c4, #afa0b1);">
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
    <div class="form-group">
    <label style="margin-top: .4cm;margin-left: .4cm;">First Name:</label>
    <input type="text" class="form-control" formControlName="fname" style="width: 90%; margin-left: .4cm;" [class.is-invalid]="registerForm.get('fname').invalid && registerForm.get('fname').touched">
    <small style="margin-left:.4cm" class="text-danger" [class.d-none]="registerForm.get('fname').valid || registerForm.get('fname').untouched">First name is required</small>
  </div>
  

  <div class="form-group">
    <label style="margin-left: .4cm;" >Last Name:</label>
    <input type="text" class="form-control" formControlName="lname" style="width: 90%; margin-left: .4cm;" [class.is-invalid]="registerForm.get('lname').invalid && registerForm.get('lname').touched">
    <small style="margin-left:.4cm" class="text-danger" [class.d-none]="lastname.valid || lastname.untouched">last name is required</small>
  </div>


    <div class="form-group">
      <label style="margin-left: .4cm;">Email:</label>
      <input type="text" class="form-control" formControlName="email" style="width: 90%; margin-left: .4cm" [class.is-invalid]="registerForm.get('email').invalid && registerForm.get('email').touched">
     <small style="margin-left:.4cm" class="text-danger" [class.d-none]="email.valid || email.untouched || !email.errors">enter correct email</small> 
      </div>

    <div class="form-group">
    <label style="margin-left: .4cm;">Mobile No:</label>
    <input type="text" pattern="[1-9]{1}[0-9]{9}" maxlength="10" class="form-control" formControlName="phone" style="width: 90%; margin-left: .4cm" [class.is-invalid]="registerForm.get('phone').invalid && registerForm.get('phone').touched" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
     <small style="margin-left:.4cm"  class="text-danger" [class.d-none]="phone.valid || phone.untouched">enter correct phone no</small> 
      </div>
      

    <div class="form-group">
    <label style="margin-left: .4cm;">BirthDate:</label>
    <input type="text" class="form-control" formControlName="birthdate" style="width: 90%; margin-left: .4cm;" bsDatepicker #datepickerDMY="bsDatepicker" [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY' }">
    </div>

    <div class="form-group">
    <label style="margin-left:.4cm">Address:</label>
    <textarea class="form-control" style="width:90%;margin-left:.4cm" placeholder="Enter Your Address" formControlName="address"></textarea>
   </div>
    
    <div class="form-group" style="margin-left: .4cm;">
    <input type="radio" name="gender" value="male" formControlName="gender" checked> Male<br>
    <input type="radio" name="gender" value="female" formControlName="gender"> Female<br>
    <input type="radio" name="gender" value="other" formControlName="gender"> Other
    </div>

    <div class="form-group">
    <label style="margin-left: .4cm;">Qualification:</label>
    <select class="custom-select" formControlName="qualification" style="width: 90%; margin-left: .4cm;">
    <option value="" selected disabled hidden>---Select---</option>  
    <option>SSC</option>
    <option>HSC</option>
    <option>Diploma</option>
    <option>BE</option>
    <option>BSC</option>
    </select>
    </div>

    <div class="Form-group"  style="width: 90%; margin-left: .4cm;">
    <label>State:</label>
          <select formControlName="state" class="form-control" placeholder="Select State" (change)="changeState($event.target.value)">
          <option value="" selected disabled hidden>---Select---</option>  
          <option *ngFor ="let count of stateList">{{count.name}} </option>
        </select>
    </div>
    <br>

    <div class="Form-group" style="width: 90%; margin-left: .4cm;">
        <label>City</label>
        <select placeholder="Select city" formControlName="city" class="form-control">
        <option value="" selected disabled hidden>---Select---</option>  
         <option *ngFor ="let city of cities">{{city}} </option>
      </select>
    </div>

    <div style="margin-left: .4cm;margin-top:.2cm">
        <label>File:</label><br>
        <ngx-avatar  src="{{imgsrc}}" [round]="true" size="100"></ngx-avatar>
        <br>
        <input type="file" id="my-input" fromControlName="profiePic" (click)="onFleLoad($event)" (change)="onFleLoad($event)" name="" accept="image/*" [class.is-invalid]="profiePic.invalid && profiePic.touched">
        <br><small class="text-danger" *ngIf="imgvalid"> please select the image</small>
    </div>
            <br>
           <div class="form-group">
           <label style="margin-left: .4cm;">ZipCode:</label>
           <input type="text" class="form-control" formControlName="zipCode" style="width: 20%; margin-left: .4cm;" mask="000-000">
           </div>
          
    <div class="Form-group" style="margin-left: .4cm;margin-top:.2cm">
    <label formArrayName="hobbies" *ngFor="let name of registerForm.controls.hobbies.controls; let i = index">
    <input type="checkbox" (change)="hobbiesCount(i)" [formControlName]="i">{{hobbies[i].name}}
    </label><br>
    <small style="margin-left:.4cm" class="text-danger" *ngIf="hobbiesError">enter none either more than 2 hobbies</small>
    </div>

    <div class="form-group">
    <label style="margin-left: .4cm;">Skills:</label>
    <tag-input style="width: 90%; margin-left: .4cm;" formControlName="skills"></tag-input>
    <small style="margin-left:.4cm" class="text-danger" *ngIf="registerForm.get('skills').errors?.forbiddenname">{{registerForm.get('skills').errors?.message}}</small>
    </div>

    <div class="form-group">
    <label style="margin-left: .4cm;">Salary:</label>
    <input currencyMask class="form-control" type="text" style="width: 30%; margin-left: .4cm;" formControlName="salary" [options]="{ prefix: 'Rs ', thousands: '.', decimal: ',',allowNegative:'false'}">
    </div>

    <button [disabled]="!registerForm.valid" type="submit" class="btn btn-primary" style="margin-left:6cm;width:200px">ADD</button>
  </form>
  </div>
      `,
  styles: ['label{color:black}'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      useExisting:forwardRef(()=>AddComponent),
      multi:true,
    }
  ]
})
export class AddComponent implements OnInit,ControlValueAccessor{
date1;
  value:string="hi";
  writeValue(value: String): void {
    console.log(value);
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  fileToUpload: File = null;;
  count = 0;
  hobbiesError = false;
  year;
  registerForm: FormGroup;
  imgsrc=<any>"assets/photo_2019-07-08_16-44-43.jpg";
  disimg=false;
  imgvalid=false;
  myDateValue:Date;
  chipsCount=0;
  skillsInvalid=false;

  formErrors = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
  }

  hobbies: Array<any> = [
    { id: '0', name: 'singing', value: false },
    { id: '1', name: 'dancing', value: false },
    { id: '2', name: 'reading', value: false },
    { id: '3', name: 'cooking', value: false },
    { id: '4', name: 'swimming', value: false },
    { id: '5', name: 'travalling', value: false },
  ];

  formControls = this.hobbies.map(control => new FormControl(false));

  get lastname() {
    return this.registerForm.get('lname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
    get profiePic() {
    return this.registerForm.get('profiePic');
  }

 

  hobbiesCount(i) {
    this.hobbiesError = true;
    if (this.registerForm.controls.hobbies.get(i.toString()).value) {
      this.count++;
    }
    else {
      this.count--;
    }
    if (this.count > 1 || this.count === 0) {
      this.hobbiesError = false;
    }
  }

   constructor(private validations:ValidationService,private fb: FormBuilder,private router: Router,private http1:ServicesService,private route:ActivatedRoute,private toastr:ToastrService) { }


  ngOnInit() {
    
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.registerForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      phone: ['', Validators.maxLength(10)],
      birthdate: [''],
      zipCode:[''],
      address:[''],
      gender: [''],
      qualification: [''],
      city: [''],
      state: [''],
      hobbies: new FormArray(this.formControls),
      profiePic:[''],
      skills:['',skillsValidator],
      salary:['']

    })
    // this.registerForm.valueChanges.subscribe((data) => {
    //   this.validations.LogValidationErrors(this.registerForm);
    //   this.formErrors=this.validations.getformErrors();
    // })
  }

  stateList: Array<any> = [
    { name: 'Andra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Kurnool', 'Chittoor'] },
    { name: 'Arunachal Pradesh', cities: ['Khemiyong', 'Chopelling', 'Deban', '	Dharampur', 'Kherem Bisa'] },
    { name: 'Bihar', cities: ['	Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'] },
    { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', '	Rajkot', '	Bhavnagar'] },
    { name: 'Madya Pradesh', cities: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain'] },
    { name: 'Maharashtra', cities: ['Pune', 'Mumbai', 'Latur', 'Satara', 'Baramati'] },
    { name: 'Punjab', cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'] },
    { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer'] }
  ];
  cities: Array<any>;
  changeState(count) {
    this.cities = this.stateList.find(con => con.name == count).cities;
  }


  onSubmit() {

    const selectedPreferences = this.registerForm.value.hobbies
      .map((checked, index) => checked ? this.hobbies[index].id : null)
      .filter(value => value !== null);
    // Do something <th>Hobbies</th>with the result
    let date = this.registerForm.get('birthdate').value;
    if(date)
    {
        this.date1=moment(date).format('DD-MM-YYYY');
    }
    else
    this.date1='';

    let formData=new FormData();
    formData.append( 'fname', this.registerForm.get('fname').value);
    formData.append( 'lname', this.registerForm.get('lname').value);
    formData.append( 'email', this.registerForm.get('email').value);
    formData.append( 'phone', this.registerForm.get('phone').value);
    formData.append( 'birthdate', this.date1);
    formData.append('zipCode',this.registerForm.get('zipCode').value);
    formData.append('address',this.registerForm.get('address').value);
    formData.append( 'gender', this.registerForm.get('gender').value);
    formData.append( 'qualification', this.registerForm.get('qualification').value);
    formData.append( 'state', this.registerForm.get('state').value);
    formData.append( 'city', this.registerForm.get('city').value);
    formData.append( 'salary', this.registerForm.get('salary').value);
    for (var i = 0; i < selectedPreferences.length; i++) {
    formData.append('hobbies[]',selectedPreferences[i]);
  }
  let skil=this.registerForm.get('skills').value;

  for (var i = 0; i < skil.length; i++) {
    formData.append('skills[]',skil[i].value);
    console.log(skil[i].value);
      }
if(this.registerForm.get('profiePic').value)
    formData.append( 'profiePic', this.registerForm.get('profiePic').value,(this.registerForm.get('profiePic').value).name);
  
    this.http1.regiUser(formData)
    .subscribe(response => {console.log(response);this.router.navigate(['../display'],{relativeTo:this.route});this.toastr.success('Employee SuccessFully Added...!');if(response){ this.ngOnInit()}} ,err=>{
      if(err.error === 'already exists..!')
      this.toastr.error('Alreasy exists...!')
      else
      console.log(err)});
 }
 
 onFleLoad(event){
               if(event.target.files.length>0)
    {
   
      const img=event.target.files[0];
      this.registerForm.patchValue({profiePic:img})
      
      this.disimg=true;
      var reader=new FileReader;
      reader.readAsDataURL(img);
      reader.onload=(event)=>
      {
        this.imgsrc=reader.result;
        this.imgvalid=false;
      }

    }
    else
    {
        this.imgvalid=true;
        this.imgsrc=<any>"assets/photo_2019-07-08_16-44-43.jpg";
    }
     
  }

}
