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

  learnedSubjectsByTeam: LearnedSubjectsByTeam[] = [
    {subjectId: 1, subjectName: 'OO', employees: ['One', 'Two', 'Three', 'Four']},
    {subjectId: 2, subjectName: 'Java for Beginners', employees: ['One', 'Two', 'Three', 'Four', 'Five', 'Six']},
    {subjectId: 3, subjectName: 'C#', employees: ['One', 'Three', 'Four', 'Five', 'Six']},
    {subjectId: 4, subjectName: 'Mentoring', employees: ['One', 'Three']},
    {subjectId: 5, subjectName: 'Leadership', employees: ['Three', 'Four']},
    {subjectId: 6, subjectName: 'Data Security', employees: ['One', 'Three', 'Four']},
    {subjectId: 7, subjectName: 'Communication', employees: ['One', 'Two', 'Three', 'Four', 'Five', 'Six']},
    {subjectId: 8, subjectName: 'Advanced Java', employees: ['One', 'Three', 'Four', 'Five']},
];

  subjectsToLearnByTeam: SubjectsToLearnByTeam[] = [
    {subjectId: 1, subjectName: 'OO', employees: ['Five', 'Six']},
    {subjectId: 3, subjectName: 'C#', employees: ['Two']},
    {subjectId: 4, subjectName: 'Mentoring', employees: ['Two', 'Four']},
    {subjectId: 5, subjectName: 'Leadership', employees: ['One']},
    {subjectId: 6, subjectName: 'Data Security', employees: ['Two', 'Five', 'Six']},
  ];

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
