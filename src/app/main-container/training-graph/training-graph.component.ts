import { Component, OnInit } from "@angular/core";
import { GraphService } from "src/app/graph.service";
import { UnmappedEntity, GraphLink, GraphEntity } from "src/app/types";

@Component({
  selector: "app-training-graph",
  templateUrl: "./training-graph.component.html",
  styleUrls: ["./training-graph.component.scss"],
})
export class TrainingGraphComponent implements OnInit {
  constructor(private graphService: GraphService) {}

  links: GraphLink[] = [];
  entities: GraphEntity[] = [];

  ngOnInit(): void {
    this.graphService.fetchAllTrainings().subscribe((res: UnmappedEntity[]) => {
      this.mapEntities(res);
      this.mapLinks(res);
    });
  }

  mapEntities(res: UnmappedEntity[]) {
    res.forEach((item) => {
      this.entities.push({
        id: `${item.id}`,
        label: item.name,
      });
    });
  }

  mapLinks(res: UnmappedEntity[]) {
    res.forEach((item) => {
      if (item.parentId) {
        this.links.push({
          source: item.parentId,
          target: item.id,
        });
      }
    });
  }
}
