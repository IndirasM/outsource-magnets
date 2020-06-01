import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { InterceptorService } from '../interceptor.service';


@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  @Output() logout = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private interceptorService: InterceptorService) {}

  ngOnInit() {
    this.interceptorService.logout$.pipe(take(1)).subscribe(() => {
      //this.logOut();
    });

    this.router.navigateByUrl('calendar');
  }

  logOut() {
    this.logout.emit();
  }
}


export interface NewLearningDay {
  date: string;
  subjectId: number;
}

export interface LearningDayNotes {
  learningDayId: number;
  notes: string;
}