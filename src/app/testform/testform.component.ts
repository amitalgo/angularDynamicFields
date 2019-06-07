import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html',
  styleUrls: ['./testform.component.css']
})
export class TestformComponent implements OnInit {

  formdata : FormGroup;
  items : FormArray;

  constructor(public fb : FormBuilder) { }

  ngOnInit() {

    this.formdata = this.fb.group({
      firstName : ['',Validators.required],
      mobile : ['',[Validators.required]],
      items : this.fb.array([this.createElement()])
    });
    // this.add();
    
  }

  get formArr(){
    return this.formdata.get('items') as FormArray;
  }

  createElement() : FormGroup{
    return this.fb.group({
      address : ['',[Validators.required]]
    })
  }

  doSave(){
    if (this.formdata.valid) {
      // save data
      console.log('ok');
    } else {
        this.validateAllFields(this.formdata); 
    }
  }  

  add(){
    this.items = this.formdata.get('items') as FormArray;
    this.items.push(this.createElement());
  }

  remove(i){
    this.formArr.removeAt(i);
  }


  //Validate on Form Submit
  validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormArray) {
        for (const control1 of control.controls) {
          if (control1 instanceof FormControl) {
            control1.markAsTouched({
              onlySelf: true
            });
          }
          if (control1 instanceof FormGroup) {
            this.validateAllFields(control1);
          }
        }
        // control.markAsTouched();
      }
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
