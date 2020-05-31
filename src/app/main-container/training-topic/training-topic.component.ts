import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Food {
  value: string;
  viewValue: string;
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-training-topic',
  templateUrl: './training-topic.component.html',
  styleUrls: ['./training-topic.component.scss']
})
export class TrainingTopicComponent implements OnInit {

  selectedValue: string;

  topicForm: FormGroup = this._formBuilder.group({

  });

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Assembly x84'},
    {value: 'pizza-1', viewValue: 'Darbo Sauga'},
    {value: 'tacos-2', viewValue: 'Panetkiu kultura'}
  ];


  ////REIK KAZKA TAIP DARYT/////////////
  topic: any[] = [ {
    subjectId: '1',
    name: 'topic1',
    description: 'geras description',
    //date: '2020-01-27'
  }, 
  {
    subjectId: '2',
    name: 'topic2',
    description: 'geras description2',
    //date: '2020-02-28'
  },
  {
    subjectId: '3',
    name: 'topic3',
    description: 'geras description3',
    //date: '2020-03-26'
  },
  {
    subjectId: '4',
    name: 'topic4',
    description: 'geras description4',
    //date: '2020-04-03'
  },
  ];
  /////////////////////////////////////////

  userForm: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  name = 'Angular 5';
  user: any;
  model: any;

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.topicForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      parentName: '',
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.user = this.topicForm.value;
    console.log(this.user);

    this._snackBar.open("PASHOL", "Close", {
      duration: 2000,
      panelClass: ["snackbar-background"]
    });
  }
}
