import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LearnedSubjectsByTeam, SubjectsToLearnByTeam} from '../../../app.const';
import {MatTableDataSource} from "@angular/material/table";
import {throwError} from "rxjs";
import {TeamsService} from "../../../teams.service";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  learnedSubjectsByTeam: LearnedSubjectsByTeam[];

  subjectsToLearnByTeam: SubjectsToLearnByTeam[];

  teamId: number;
  teamName: string;
  loading: boolean = true;

  constructor(private route: ActivatedRoute,
              private teamsService: TeamsService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loading = true;
    this.teamName = this.route.snapshot.params['name'];
    this.teamId = this.route.snapshot.params['teamId'];
    this.spinner.show();
    this.getTeamSubjectsToLearn();
    this.getTeamLearnedSubjects();
  }

  getTeamSubjectsToLearn() {
    this.teamsService.getTeamSubjectsToLearn(this.teamId).subscribe(
      (data: any) => {
        this.subjectsToLearnByTeam = data;
      },
      (err) => {
        throwError(err);
      },
      () => {
        this.loading = false;
      }
    );
  }

  getTeamLearnedSubjects() {
    this.teamsService.getTeamLearnedSubjects(this.teamId).subscribe(
      (data: any) => {
        this.learnedSubjectsByTeam = data;
        this.spinner.hide();
      },
      (err) => {
        throwError(err);
      },
    );
  }
}
