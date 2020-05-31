import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphService } from 'src/app/graph.service';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  newTrainingForm: FormGroup;
  learningSubjects;

  constructor(
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
    this.graphService.fetchAllTrainings().subscribe(learningSubjects => {
      this.learningSubjects = learningSubjects;
    });

    this.newTrainingForm = new FormGroup({
      training: new FormGroup({
        subject: new FormControl(''),
        date: new FormControl('')
      })
    })
  }

  onNewTopic() {
    this.dialogRef.close();
  }

  getOptionText(option) {
    return option.name;
  }

  onSubmit() {
    this.dialogRef.close(this.newTrainingForm.value);
  }
}
