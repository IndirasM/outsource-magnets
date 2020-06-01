import { Component, OnInit } from "@angular/core";
import { GraphService } from "../../graph.service";
import { UnmappedEntity, GraphLink, GraphEntity } from "../../types";

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
    this.entities = res.map((item) => ({
        id: `${item.id}`,
        label: item.name,
    }));
  }

  mapLinks(res: UnmappedEntity[]) {
    this.links = res.filter(item => !!item.parentId).map((item) => ({
      source: item.parentId,
      target: item.id
    }));
  }
}
