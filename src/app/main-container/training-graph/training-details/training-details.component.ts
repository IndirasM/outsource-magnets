import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GraphService } from "src/app/graph.service";
import { throwError } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {SetEmployeeSuggestedSubject} from "../../../app.const";
import {NgxSpinnerService} from "ngx-spinner";
import {SettingsService} from "../../../settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../../add-training/add-training.component';
import { CalendarService } from 'src/app/calendar.service';

@Component({
  selector: "app-training-details",
  templateUrl: "./training-details.component.html",
  styleUrls: ["./training-details.component.scss"],
})
export class TrainingDetailsComponent implements OnInit {
  employees: Employee[] = [];

  id: string;
  currentTraining: any;
  loading: boolean = true;
  addSubjectToEmployees: number[] = [];
  userId: number;

  displayedColumns: string[] = ['name', 'date'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private graphService: GraphService,
    private spinner: NgxSpinnerService,
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private calendarService: CalendarService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.id = this.route.snapshot.params['id'];
    this.spinner.show();
    this.fetchEmployees();
    this.fetchMyId();
    this.graphService.fetchTraining(this.id).subscribe(
      (data: any) => {
        this.currentTraining = data;
        this.dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        throwError(err);
      },
      () => {
        this.loading = false;
        this.spinner.hide();
      }
    );

  }

  fetchEmployees(): void {
    this.settingsService.getEmployeesLimits().subscribe(
      resp => {
        for (const i in resp) {
          this.employees = [
            ...this.employees,
            {id: resp[i].employeeId, name: resp[i].employeeName, checked: false}];
        }
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  fetchMyId(): void {
    this.settingsService.getUserLimits().subscribe(
      resp => {
        this.employees = [
          ...this.employees,
          {id: resp.employeeId, name: 'Add objective for yourself', checked: false}];
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  createLearningDay() {
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: {
        learningDay: {
          subjectId: this.id
        }
      }
    });

    dialogRef.afterClosed().subscribe(formData => {
      if(formData) {
        this.calendarService.addLearningDay(formData).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  onChangeSelectAll(event) {
    if (event.checked) {
      this.employees.forEach(obj => {
        obj.checked = true;
      });
    }
    else {
      this.employees.forEach(obj => {
        obj.checked = false;
      });
    }
  }

  changeValue(event, id: number): void {
    for (let i in this.employees) {
      if (this.employees[i].id === id) {
        this.employees[i].checked = !this.employees[i].checked;
      }
    }
  }

  saveSuggestedSubjects() {
    for (let i in this.employees) {
      if (this.employees[i].checked === true) {
        this.addSubjectToEmployees.push(this.employees[i].id);
      }
    }
    console.log(this.addSubjectToEmployees);
    this.graphService.addSuggestedSubjects(this.id, this.addSubjectToEmployees).subscribe(
      (data: any) => {
        console.log('On success message needs to be added');
      },
      (err) => {
        throwError(err);
      },
    );
    this.employees.forEach(obj => {
      obj.checked = false;
    });
    this.addSubjectToEmployees = [];
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  date: number;
  symbol: string;
}

export interface Employee {
  id: number;
  name: string;
  checked: boolean;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', date: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', date: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', date: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', date: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', date: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', date: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', date: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', date: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', date: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', date: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', date: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', date: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', date: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', date: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', date: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', date: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', date: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', date: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', date: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', date: 40.078, symbol: 'Ca'},
];
