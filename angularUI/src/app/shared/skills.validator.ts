import {AbstractControl,} from '@angular/forms'

export function skillsValidator(control:AbstractControl):{[key:string]:any}
{
        var forbidden:boolean=false;
        let ski=control.value;
        if(ski.length < 2)
        {
            if(ski.length === 0)
            {
                forbidden = false;
            }
            else
            forbidden = true;
        }
        return forbidden ? {'forbiddenname':true,message:'required minimum 2'}:null;
    
}