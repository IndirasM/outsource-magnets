import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

export class Topic {
  userForm: any;

  name = 'Angular 5';
  subscriptionForm: FormGroup;
  user: any;
    model: any;

  constructor(private fb: FormBuilder) {
    this.subscriptionForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  createForm() {
    //form control name should match with User class property name
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      street: '',
    });
  }

  OnSubmit(values) {


    this.user = this.subscriptionForm.value;
    console.log(this.user);
  }

}
