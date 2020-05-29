import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GraphService } from "src/app/graph.service";
import { throwError } from "rxjs";

@Component({
  selector: "app-training-details",
  templateUrl: "./training-details.component.html",
  styleUrls: ["./training-details.component.scss"],
})
export class TrainingDetailsComponent implements OnInit {
  id: string;
  currentTraining: any;

  constructor(
    private route: ActivatedRoute,
    private graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.graphService.fetchTraining(this.id).subscribe(
      (data: any) => {
        this.currentTraining = data;
      },
      (err) => {
        throwError(err);
      }
    );
  }
}
