import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GraphService } from 'src/app/graph.service';
import { CalendarService } from 'src/app/calendar.service';

@Component({
  selector: 'app-training-day',
  templateUrl: './training-day.component.html',
  styleUrls: ['./training-day.component.scss']
})
export class TrainingDayComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TrainingDayComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private graphService: GraphService,
    private calendarService: CalendarService
  ) { }

  subject;
  loading: boolean;
  addingNote: boolean;
  notes: string = "";
  originalNotes: string = "";
  modified: boolean = false;

  ngOnInit(): void {
    if(this.data.learningDay.notes) {
      this.notes = this.data.learningDay.notes;
      this.originalNotes = this.notes;
    }
    this.loading = true;
    this.graphService.fetchTraining(this.data.learningDay.subjectId).subscribe(res => {
      this.subject = res;
    }, undefined, () => { this.loading = false })
  }

  addNote() {
    this.addingNote = true;
  }

  submitNote() {
    this.calendarService.addLearningDayNote(this.data.learningDay.learningDayId, this.notes).subscribe(() => {
      this.addingNote = false;
      this.originalNotes = this.notes;
      this.modified = true;
    });
  }

  cancelNote() {
    this.notes = this.originalNotes;
    this.addingNote = false;
  }

  close() {
    if (this.modified) {
      this.dialogRef.close(true);
    } else {
      this.dialogRef.close(false)
    }  
  }

}
