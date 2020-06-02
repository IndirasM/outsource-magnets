import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  subject;
  loading: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private graphService: GraphService
  ) { }

  ngOnInit(): void {
    this.newTrainingForm = new FormGroup({
      training: new FormGroup({
        subject: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      })
    })

    this.graphService.fetchAllTrainings().subscribe(learningSubjects => {
      this.learningSubjects = learningSubjects;
      this.prefill();
    });
  }

  prefill() {
    if (this.data) {
      this.loading = true;
      this.graphService.fetchTraining(this.data.learningDay.subjectId).subscribe(res => {
        this.subject = res;
        if(this.data.event && this.data.event.start) {
          this.newTrainingForm.get('training').get('date').setValue(this.data.event.start);
        }
        this.newTrainingForm.get('training').get('subject').setValue(this.learningSubjects.find(sub => sub.id === this.subject.id));
      }, undefined, () => { this.loading = false })  
    }
  }

  onNewTopic() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newTrainingForm.value);
  }
}
