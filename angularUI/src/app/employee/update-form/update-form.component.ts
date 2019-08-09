import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/shared/services.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  emp;
  gender;
  id;
  imgsrc=<any>"assets/photo_2019-07-08_16-44-43.jpg";data = [];
  updateForm1: FormGroup;
  year;
  date1;
  count = 0;
  hobbiesError = false;
  data1;response;
 imgSel=false;
 oldImgPath;
 chipsCount;
 skillsInvalid=false;

  hobbies: Array<any> = [
    { id: '0', name: 'singing', value: 'false' },
    { id: '1', name: 'dancing', value: 'false' },
    { id: '2', name: 'reading', value: 'false' },
    { id: '3', name: 'cooking', value: 'false' },
    { id: '4', name: 'swimming', value: 'false' },
    { id: '5', name: 'travalling', value: 'false' },
  ];

   constructor(private fb: FormBuilder, private route: ActivatedRoute,private router: Router,private http1:ServicesService,private toastr:ToastrService) { }



  get lastname() {
    return this.updateForm1.get('lname');
  }

  get phone() {
    return this.updateForm1.get('phone');
  }
  get email() {
    return this.updateForm1.get('email');
  }


  onAdd(event)
  {
    this.chipsCount++;
    if(this.chipsCount>1)
    this.skillsInvalid=false;
    else
    this.skillsInvalid=true;
  }
  onRemove(event)
  {
    this.chipsCount--;
    if(this.chipsCount>1)
    this.skillsInvalid=false;
    else
    this.skillsInvalid=true;
  }
  

  hobbiesCount(i) {
    if (this.updateForm1.controls.hobbies.get(i.toString()).value) {
      this.count++;
      console.log('in true:' + this.count);
    }
    else {
      this.count--;
      console.log('in false:' + this.count);
    }
    if (this.count > 1  || this.count === 0) {
      this.hobbiesError = false;
    }
    else
      this.hobbiesError = true;

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



  ngOnInit() {
    let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.updateForm1 = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      birthdate: [''],
      phone: [''],
      gender: [''],
      qualification: [''],
      city: [''],
      state: [''],
      hobbies: new FormArray([]),
      profiePic:[''],
      zipCode:[''],
      address:[''],
      skills:[''],
      salary:['']

    })
       this.hobbies.map((o, i) => {
      const control = new FormControl(false); // if first item set to true, else false
      (this.updateForm1.controls.hobbies as FormArray).push(control);

    });

    this.id = this.route.snapshot.paramMap.get('_id');
    this.http1.find(this.id)
      .subscribe(response => {
                   
        let employee = response;
        
        var resultArray = Object.keys(employee).map(function (employeeNamedIndex) {
          let person = employee[employeeNamedIndex];
          return person;
        });
        this.emp = resultArray;
        
        const arr = this.emp[0];
        console.log('arr:',arr);
        if(arr.profiePic)
        this.imgsrc = "http://localhost:3000/"+arr.profiePic;
        console.log('imgsrc:',this.imgsrc);
        this.oldImgPath=arr.profiePic;
        if(arr.hobbies)
        {
           this.count = arr.hobbies.length ? arr.hobbies.length:0;
        }
    if(this.count)
    {
       for (let i = 0; i < 6; i++) {

          for (let j = 0; j < 6; j++) {
            if (i === parseInt(arr.hobbies[j])) {
              this.updateForm1.controls.hobbies.get(i.toString()).patchValue(true);
              break;
            }
          }
        }
      }
      if(this.emp[0].birthdate)
      this.updateForm1.patchValue({birthdate:arr.birthdate});
      else
      this.updateForm1.patchValue({birthdate:''});

      if(arr.state !== '')
        this.changeState(arr.state);

        this.updateForm1.patchValue({city:arr.city});
          this.updateForm1.patchValue({
          fname: this.emp[0].fname,
          lname: this.emp[0].lname,
          email: this.emp[0].email,
          phone: this.emp[0].phone,
          gender: this.emp[0].gender,
          qualification: this.emp[0].qualification,
          zipCode:this.emp[0].zipCode,
          state: this.emp[0].state,
          address:this.emp[0].address,
          skills:this.emp[0].skills,
          salary:this.emp[0].salary,
          
        })
        this.chipsCount= arr.skills.length;}, error => console.log('Error...!', error))
    
  }



  onSubmit() {

    const selectedPreferences = this.updateForm1.value.hobbies
      .map((checked, index) => checked ? this.hobbies[index].id : null)
      .filter(value => value !== null);

    let date = this.updateForm1.get('birthdate').value;
    console.log('date:'+date);
    if(date !== '')
    {
      console.log('in if');
      if(moment(date).format('DD-MM-YYYY')==='Invalid date')
      this.date1=date;
      else
        this.date1=moment(date).format('DD-MM-YYYY');
        console.log(this.date1);
    }
    else
    {
    this.date1='';
    console.log('in else')
    }
         
  
    let formData = new FormData();
    if(this.updateForm1.get('fname').value !== 'undefined')
    formData.append('fname', this.updateForm1.get('fname').value);

    if(this.updateForm1.get('lname').value !== 'undefined')
      formData.append('lname', this.updateForm1.get('lname').value);
    
    if(this.updateForm1.get('email').value !== 'undefined')
      formData.append('email', this.updateForm1.get('email').value);
    
      if(this.updateForm1.get('phone').value !== 'undefined')
       formData.append('phone', this.updateForm1.get('phone').value);

     formData.append('birthdate', this.date1);

        if(this.updateForm1.get('gender').value !== 'undefined')
    formData.append('gender', this.updateForm1.get('gender').value);

    if(this.updateForm1.get('qualification').value !== 'undefined')
    formData.append('qualification', this.updateForm1.get('qualification').value);

    if(this.updateForm1.get('fname').value !== 'undefined')
     formData.append('state', this.updateForm1.get('state').value);

    if(this.updateForm1.get('city').value !== 'undefined')
    formData.append('city', this.updateForm1.get('city').value);

    if(this.updateForm1.get('zipCode').value !== 'undefined')
    formData.append('zipCode',this.updateForm1.get('zipCode').value);

    if(this.updateForm1.get('address').value !== 'undefined')
    formData.append('address',this.updateForm1.get('address').value);

    if(this.updateForm1.get('salary').value !== 'undefined')
    formData.append('salary',this.updateForm1.get('salary').value);

      
      for (var i = 0; i < selectedPreferences.length; i++)
       {
    formData.append('hobbies[]',selectedPreferences[i]);
   }
  
    formData.append('skills[]',JSON.stringify(this.updateForm1.get('skills').value));
      
   if(this.imgSel)
   {
     formData.append('profiePic', this.updateForm1.get('profiePic').value,(this.updateForm1.get('profiePic').value).name);
     formData.append('oldImgPath', this.oldImgPath);
   }
     
    this.http1.email(this.id);
    this.http1.updUser(formData)
      .subscribe(response => { console.log('success...!', response); this.router.navigate(['../../display'],{relativeTo:this.route});this.toastr.success('Employee Updated Successfully...!')}, error => console.log('Error...!', error))
 
    }

  onFleLoad(event){
    if(event.target.files.length>0)
    {
      this.imgSel=true;
      const img=event.target.files[0];
      this.updateForm1.patchValue({profiePic:img})
      var reader=new FileReader;
      reader.readAsDataURL(img);
      reader.onload=(event)=>
      {
        this.imgsrc=reader.result;
      }
    }
    console.log(this.updateForm1.get('profiePic').value)
  }

}
