import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-graph',
  templateUrl: './training-graph.component.html',
  styleUrls: ['./training-graph.component.scss']
})
export class TrainingGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  printId(id) {
    console.log(id);
  }

}
