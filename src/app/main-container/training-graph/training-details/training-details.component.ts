import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GraphService } from "src/app/graph.service";
import { throwError } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-training-details",
  templateUrl: "./training-details.component.html",
  styleUrls: ["./training-details.component.scss"],
})
export class TrainingDetailsComponent implements OnInit {
  id: string;
  currentTraining: any;
  loading: boolean = true;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private graphService: GraphService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];

    this.graphService.fetchTraining(this.id).subscribe(
      (data: any) => {
        this.currentTraining = data;
        this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.loading = false;
      },
      (err) => {
        throwError(err);
      }
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
