import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { TopicService } from 'src/app/topic.service';
import { GraphService } from 'src/app/graph.service';

interface parentTopic {
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

  subjects;

  topic: any[] = [ {
    subjectId: '1',
    name: 'topic1',
    description: 'geras description',
  }, 
  {
    subjectId: '2',
    name: 'topic2',
    description: 'geras description2',
  },
  {
    subjectId: '3',
    name: 'topic3',
    description: 'geras description3',
  },
  {
    subjectId: '4',
    name: 'topic4',
    description: 'geras description4',
  },
  ];

  userForm: any;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  name = 'Angular 5';
  user: any;
  model: any;

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private topicService: TopicService, private graphService: GraphService) {
    this.topicForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      parentId: '',
    });
  }

  ngOnInit() {
    this.graphService.fetchAllTrainings().subscribe(data => {
      this.subjects = data;
    })
  }

  onSubmit() {
    this.user = this.topicForm.value;

    this.topicService.createSubject(this.user).subscribe(() => {
      this._snackBar.open("Success!", "Close", {
        duration: 2000,
        panelClass: ["snackbar-background"]
      });
    });

  }
}
