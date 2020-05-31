import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.scss']
})
export class AddTrainingComponent implements OnInit {

  newTrainingForm: FormGroup;
  options = [
    'kek',
    'kekistan'
  ]

  constructor(
    public dialogRef: MatDialogRef<AddTrainingComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
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

  onSubmit() {
    this.dialogRef.close(this.newTrainingForm);
  }
}
