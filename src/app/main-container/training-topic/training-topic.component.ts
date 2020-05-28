import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-topic',
  templateUrl: './training-topic.component.html',
  styleUrls: ['./training-topic.component.scss']
})
export class TrainingTopicComponent implements OnInit {

  ////REIK KAZKA TAIP DARYT/////////////
  topic: any[] = [ {
    subjectId: '1',
    name: 'topic1',
    description: 'geras description',
    date: '2020-01-27'
  }, 
  {
    subjectId: '2',
    name: 'topic2',
    description: 'geras description2',
    date: '2020-02-28'
  },
  {
    subjectId: '3',
    name: 'topic3',
    description: 'geras description3',
    date: '2020-03-26'
  },
  {
    subjectId: '4',
    name: 'topic4',
    description: 'geras description4',
    date: '2020-04-03'
  },
  ];
  /////////////////////////////////////////

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
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  OnSubmit() {


    this.user = this.subscriptionForm.value;
    console.log(this.user);
  }
}
