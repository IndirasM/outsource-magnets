import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import {EmployeesLearningDays, LearningDays} from '../../app.const';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import {CalendarService} from '../../calendar.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../add-training/add-training.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { TrainingDayComponent } from './training-day/training-day.component';

interface UniqueEmployee {
  employeeId: number;
  employeeName: string;
  checked: boolean;
}

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-training-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './training-calendar.component.html',
  styleUrls: ['./training-calendar.component.scss'],
})
export class TrainingCalendarComponent implements OnInit {

  learningDays: LearningDays[] = [];
  employeesLearningDays: EmployeesLearningDays[] = [];

  uniqueEmployeesId: number[];
  events: CalendarEvent[] = [];
  uniqueEmployees: UniqueEmployee[] = [];
  checked: boolean;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;

  constructor(private calendarService: CalendarService, private router: Router, public dialog: MatDialog, private spinner: NgxSpinnerService) {}
  ngOnInit(): void {
    this.events = [];
    this.spinner.show();
    this.getUserLearningDays();
    this.getUserEmployeesLearningDays();
}

  getUserLearningDays() {
    this.calendarService.getLearningDays().subscribe(
      resp => {
        this.learningDays = resp;
        for (const v in this.learningDays) {
          if (startOfDay(new Date(this.learningDays[v].date)) > new Date()) {
            this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, this.actions, colors.red, {
              employeeId: null,
              learningDayId: this.learningDays[v].learningDayId,
              notes: this.learningDays[v].notes
            });
          } else {
            this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, null, colors.red, {
              employeeId: null,
              learningDayId: this.learningDays[v].learningDayId,
              notes: this.learningDays[v].notes
            });
          }
        }
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  getUserEmployeesLearningDays() {
    this.calendarService.getEmployeeLearningDays().subscribe(
      res => {
        this.employeesLearningDays = res;
        this.filterOutUniqueEmployees();
        this.spinner.hide();
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

  openNewLearningForm() {
    const dialogRef = this.dialog.open(AddTrainingComponent);

    dialogRef.afterClosed().subscribe(formData => {
      if(formData) {
        this.calendarService.addLearningDay(formData).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  changeValue(value: number) {
    for (let i in this.uniqueEmployees) {
      if (this.uniqueEmployees[i].employeeId === value) {
        this.uniqueEmployees[i].checked = !this.uniqueEmployees[i].checked;
        this.checked = this.uniqueEmployees[i].checked;
      }
    }
    for (const v in this.employeesLearningDays) {
        if (this.employeesLearningDays[v].employeeId === value && this.checked) {
          this.addEvent(new Date(this.employeesLearningDays[v].date), this.employeesLearningDays[v].employeeName + ': ' + this.employeesLearningDays[v].title, null, colors.blue, {
            employeeId: this.employeesLearningDays[v].employeeId,
            learningDayId: this.employeesLearningDays[v].learningDayId,
            subjectId: this.employeesLearningDays[v].subjectId,
            notes: this.employeesLearningDays[v].notes
          });
        }
    }
    if (!this.checked) {
      for (let e = this.events.length - 1; e >= 0; --e) {
        if (this.events[e].meta.employeeId === value) {
          this.removeEvent(this.events[e]);
          // this.events.splice(e, 1);
        }
      }
    }
  }

  filterOutUniqueEmployees(): void {
    this.uniqueEmployeesId = [...new Set(this.employeesLearningDays.map(employee => employee.employeeId))];
    for (const i in this.uniqueEmployeesId) {
      if (!this.uniqueEmployees.some(employee => employee.employeeId === this.uniqueEmployeesId[i])) {
        if (this.employeesLearningDays.some(employee => employee.employeeId === this.uniqueEmployeesId[i])) {
          let tmp = this.employeesLearningDays.find(obj => {
            return obj.employeeId === this.uniqueEmployeesId[i];
          });

          this.uniqueEmployees = [
            ...this.uniqueEmployees,
            {
              employeeId: this.uniqueEmployeesId[i],
              employeeName: tmp.employeeName,
              checked: false
            }
          ];
        }
      }
    }
  }

  actions: CalendarEventAction[] = [
    {
      label: '<i class="material-icons icon-white">edit</i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="material-icons">delete</i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.deleteEvent(event); // delete from list first, then send call to database
      },
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }


  handleEvent(action: string, event: CalendarEvent): void {
    const existingDay = this.learningDays.find(day => day.learningDayId === event.meta.learningDayId);

    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: {
        event,
        learningDay: existingDay,
        edit: true
      }
    });

    dialogRef.afterClosed().subscribe(formData => {
      if(formData) {
        this.ngOnInit();
      }
    });
  }

  openDayView(event: CalendarEvent) {
    const existingDay = this.learningDays.find(day => day.learningDayId === event.meta.learningDayId);
    const dialogRef = this.dialog.open(TrainingDayComponent, {
      width: '500px',
      data: {
        learningDay: existingDay ? existingDay : this.employeesLearningDays.find(day => day.learningDayId === event.meta.learningDayId)
      }
    });
    dialogRef.afterClosed().subscribe(modified => {
      if (modified) {
        this.ngOnInit();
      }
    });
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.removeEvent(eventToDelete);
    this.calendarService.deleteLearningDay(eventToDelete.meta.learningDayId).subscribe();
  }

  addEvent(date: Date, title: string, actions: CalendarEventAction[], color: any, meta: any): void {
    this.events = [
      ...this.events,
      {
        start: startOfDay(date),
        end: endOfDay(date),
        title: title,
        color: color,
        actions: actions,
        allDay: true,
        meta: meta,
      },
    ];
  }

  removeEvent(eventToRemove: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToRemove);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
