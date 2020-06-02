import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { GraphService } from "src/app/graph.service";
import { throwError } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';
import {NgxSpinnerService} from "ngx-spinner";
import {SettingsService} from "../../../settings.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../../add-training/add-training.component';
import { CalendarService } from 'src/app/calendar.service';
import { TopicService } from 'src/app/topic.service';
import { TeamsService } from 'src/app/teams.service';

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
  comments;

  displayedColumns: string[] = ['employeeName', 'date'];
  displayedTeamColumns: string[] = ['name', 'learnees'];
  dataSource: MatTableDataSource<any>;
  teamsDataSource: MatTableDataSource<any>;

  constructor(
    private route: ActivatedRoute,
    private graphService: GraphService,
    private spinner: NgxSpinnerService,
    private settingsService: SettingsService,
    private dialog: MatDialog,
    private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private subjectService: TopicService,
    private teamsService: TeamsService
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
        this.subjectService.getLearningDaysBySubject(this.id).subscribe((days: any) => {
          this.teamsService.getAllTeams().subscribe(teams => {
            const mappedTeams = this.mapTeams(teams, days);
            this.teamsDataSource = new MatTableDataSource<any>(mappedTeams.filter(team => team.learnees !== 0));
          });
          this.dataSource = new MatTableDataSource<any>(days);
          this.comments = [];
          days.forEach(day => {
            this.comments.push({
              name: day.employeeName,
              text: day.notes
            })
          });
        });
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

  mapTeams(teams, days) {
    const mappedTeams = teams.map(team => {
      return {
        ...team,
        learnees: this.calcLearned(team.teamId, days)
      }
    });
    return mappedTeams;
  }

  calcLearned(teamId, days) {
    let count = 0;
    days.forEach(day => {
      if(day.teamId === teamId) count++;
    })
    return count;
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
    this.graphService.addSuggestedSubjects(this.id, this.addSubjectToEmployees).subscribe(
      (data: any) => {
        this.snackBar.open('Subject suggested!', 'Close', {
          duration: 2000,
          panelClass: ['snackbar-background']
        });
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
