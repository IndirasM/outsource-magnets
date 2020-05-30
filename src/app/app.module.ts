import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TrainingGraphComponent } from './main-container/training-graph/training-graph.component';
import { TrainingCalendarComponent } from './main-container/training-calendar/training-calendar.component';
import { SettingsComponent } from './main-container/settings/settings.component';
import { AddTrainingComponent } from './main-container/add-training/add-training.component';
import { TrainingDetailsComponent } from './main-container/training-graph/training-details/training-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { MatDividerModule } from '@angular/material/divider';
import { TeamsComponent } from './main-container/teams/teams.component'; 
import { AuthInterceptor } from './auth.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainContainerComponent,
    TrainingGraphComponent,
    TrainingCalendarComponent,
    SettingsComponent,
    AddTrainingComponent,
    TrainingDetailsComponent,
    NotFoundComponent,
    TeamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGraphModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSnackBarModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
