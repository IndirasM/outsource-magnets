import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphService } from 'src/app/graph.service';
import {CalendarService} from '../../calendar.service';
import {LearningDays} from '../../app.const';

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
  suggestedSubjects: SuggestedSubjects[] = [];
  learningDays: LearningDays[] = [];
  filteredSuggestedSubjects: SuggestedSubjects[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private graphService: GraphService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getSuggestedSubjects();
    this.graphService.fetchAllTrainings().subscribe(learningSubjects => {
      this.learningSubjects = learningSubjects;
    });

    this.newTrainingForm = new FormGroup({
      training: new FormGroup({
        subject: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      })
    });

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
        if (this.data.event && this.data.event.start) {
          this.newTrainingForm.get('training').get('date').setValue(this.data.event.start);
        }
        this.newTrainingForm.get('training').get('subject').setValue(this.learningSubjects.find(sub => sub.id === this.subject.id));
      }, undefined, () => { this.loading = false; });
    }
  }

  onNewTopic() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.dialogRef.close(this.newTrainingForm.value);
  }

  getSuggestedSubjects() {
    this.graphService.fetchSuggestedSubjects().subscribe(
      resp => {
        this.suggestedSubjects = resp;
      }
    ),
      error => {
        console.log(error.error.message);
      };
    this.calendarService.getLearningDays().subscribe(
      res => {
        this.learningDays = res;
        this.filteredSuggestedSubjects = this.suggestedSubjects.filter((elem) => !this.learningDays.find(({ subjectId }) => elem.subjectId === subjectId));
      },
      error => {
        console.log(error.error.message);
      }
    );


  }

}

export interface SuggestedSubjects {
  subjectId: number;
  subjectName: string;
}
