import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TrainingCalendarComponent } from "./main-container/training-calendar/training-calendar.component";
import { TrainingGraphComponent } from "./main-container/training-graph/training-graph.component";
import { TrainingTopicComponent } from "./main-container/training-topic/training-topic.component";
import { SettingsComponent } from "./main-container/settings/settings.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { AddTrainingComponent } from './main-container/add-training/add-training.component';
import { TrainingDetailsComponent } from './main-container/training-graph/training-details/training-details.component';
import { AuthGuard } from './auth.guard';
import { TeamsComponent } from './main-container/teams/teams.component';
import {TeamDetailsComponent} from "./main-container/teams/team-details/team-details.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', canActivate: [AuthGuard], children: [
    { path: "teams", component: TeamsComponent },
    { path: "calendar", component: TrainingCalendarComponent },
    { path: "graph", component: TrainingGraphComponent },
    { path: "settings", component: SettingsComponent },
    { path: "add-training", component: AddTrainingComponent },
    { path: "details/:id", component: TrainingDetailsComponent },
    { path: "team-details/:name/:teamId", component: TeamDetailsComponent },
    { path: "topic", component: TrainingTopicComponent },    
  ]},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
