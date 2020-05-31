import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import {EmployeesLearningDays, LearningDays} from '../../app.const';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import {CalendarService} from '../../calendar.service';
import { Router } from '@angular/router';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AddTrainingComponent } from '../add-training/add-training.component';

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

   learningDays: LearningDays[] = [ {
      learningDayId: 1,
      subjectId: 1,
      title: 'Event 1',
      date: '2020-05-27'
    },
    {
      learningDayId: 2,
      title: 'Event 2',
      subjectId: 4,
      date: '2020-05-28'
    },
    {
      learningDayId: 3,
      title: 'Event 3',
      subjectId: 2,
      date: '2020-05-26'
    },
    {
      learningDayId: 4,
      title: 'Event 4',
      subjectId: 5,
      date: '2020-06-03'
    },
    {
      learningDayId: 5,
      title: 'Event 5',
      subjectId: 3,
      date: '2020-05-29'
    },
  ];

   employeesLearningDays: EmployeesLearningDays[] = [ {
       employeeId: 1,
       employeeName: 'Name 1',
       date: '2020-06-01',
       title: 'Event 9',
       subjectId: 1,
     },
     {
       employeeId: 1,
       employeeName: 'Name 1',
       date: '2020-05-29',
       title: 'Event 8',
       subjectId: 1
     },
     {
       employeeId: 4,
       employeeName: 'Name 2',
       date: '2020-05-26',
       title: 'Event 3',
       subjectId: 1
     },
     {
       employeeId: 3,
       employeeName: 'Name 3',
       date: '2020-05-28',
       title: 'Event 2',
       subjectId: 1
     },
     {
       employeeId: 3,
       employeeName: 'Name 3',
       date: '2020-05-27',
       title: 'Event 1',
       subjectId: 1
     },
     {
       employeeId: 2,
       employeeName: 'Name 4',
       date: '2020-05-27',
       title: 'Event 1',
       subjectId: 1
     },
     {
       employeeId: 2,
       employeeName: 'Name 4',
       date: '2020-06-01',
       title: 'Event 7',
       subjectId: 1
     },
     {
       employeeId: 2,
       employeeName: 'Name 4',
       date: '2020-05-30',
       title: 'Event 6',
       subjectId: 1
     },
   ];

   uniqueEmployeesId: number[];
   events: CalendarEvent[] = [];
   uniqueEmployees: UniqueEmployee[] = [];
   checked: boolean;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = true;

  constructor(private calendarService: CalendarService, private router: Router, public dialog: MatDialog) {}
  ngOnInit(): void {
    // TO-DO: get learning days
/*    this.calendarService.getLearningDays().subscribe(
      resp => {
        this.learningDays = resp;
        for (const v in this.learningDays) {
          if (startOfDay(new Date(this.learningDays[v].date)) > new Date()) {
            this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, this.actions, colors.red, {
              employeeId: null,
              learningDayId: this.learningDays[v].learningDayId
            });
          } else {
            this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, null, colors.red, {
              employeeId: null,
              learningDayId: this.learningDays[v].learningDayId
            });
          }
        }
      }
    ),
    error => {
      console.log(error.error.message);
    };*/

    // to delete after connecting back-end
    for (const v in this.learningDays) {
      if (startOfDay(new Date(this.learningDays[v].date)) > new Date()) {
        this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, this.actions, colors.red, {
          employeeId: null,
          learningDayId: this.learningDays[v].learningDayId,
          subjectId: this.learningDays[v].subjectId
        });
      } else {
        this.addEvent(new Date(this.learningDays[v].date), this.learningDays[v].title, null, colors.red, {
          employeeId: null,
          learningDayId: this.learningDays[v].learningDayId,
          subjectId: this.learningDays[v].subjectId
        });
      }
    }
    // TO-DO: get employees learning days
/*    this.calendarService.getEmployeeLearningDays().subscribe(
      res => {
        this.employeesLearningDays = res;
        this.filterOutUniqueEmployees();
      }
    ),
      error => {
      console.log(error.error.message);
      };*/
    this.filterOutUniqueEmployees(); // to delete after connecting back-end
}

  subjects = [
    {
      subjectId: 1,
      name: 'kek'
    },
    {
      subjectId: 2,
      name: 'kekistan'
    }
  ]

  openNewLearningForm() {
    const dialogRef = this.dialog.open(AddTrainingComponent, {
      data: this.subjects
    })

    dialogRef.afterClosed().subscribe(formData => {
      console.log(formData);
      this.calendarService.addLearningDay(formData).subscribe(() => {});
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
            learningDayId: null,
            subjectId: this.employeesLearningDays[v].subjectId
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

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.router.navigateByUrl(`details/${event.meta.subjectId}`);
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

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
