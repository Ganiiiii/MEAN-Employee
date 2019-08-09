import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  validationMessages;
  formErrors = {
    fname: '',
    lname: '',
    email: '',
    phone: '',
  }
  constructor()
  {
    this.validationMessages = {
      'fname': {
        'required': 'First Name Is Required'
      },
      'lname': {
        'required': 'Last Name Is Required'
      },
      'email': {
        'required': 'Email Name Is Required',
        'pattern': 'Pattern Doesnt Matched'
      },
      'phone': {
        'required': 'contact Name Is Required',
        'pattern':"Length must be 10" 
      }
    }
  }

    LogValidationErrors(group: FormGroup): void {
      console.log('in service')
        Object.keys(group.controls).forEach((key: string) => {
        const abstractControl = group.get(key);
        if (abstractControl instanceof FormGroup) {
          this.LogValidationErrors(abstractControl);
        } else {
          this.formErrors[key] = " ";
          if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
            const messages = this.validationMessages[key];
            console.log('message:',messages);
            for (const errorkey in abstractControl.errors) {
              if (errorkey) {
                this.formErrors[key] += messages[errorkey] + ' ';
                console.log(this.formErrors[key])
              }
            }
          }
        }
      });
    }
  
   
    getformErrors(){
      return this.formErrors;
    }
  
}




























