import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {LearnedSubjectsByTeam, SubjectsToLearnByTeam, Team} from "./app.const";
import {templateJitUrl} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private baseUrl: string = 'http://localhost:8080/api/';
  private teamsUrl: string = 'allTeams/';
  private learnedByTeam: string = 'learnedByTeam/';
  private toLearnByTeam: string = 'toLearnByTeam/';

  private httpOptions = new HttpHeaders({
    Authorization: 'Bearer ' + sessionStorage.getItem('user')
  });

  constructor(private httpClient: HttpClient) {
  }

  getAllTeams(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(this.baseUrl + this.teamsUrl, {
      headers: this.httpOptions
    });
  }

  getTeamLearnedSubjects(teamId: number): Observable<LearnedSubjectsByTeam> {
    return this.httpClient.get<LearnedSubjectsByTeam>(this.baseUrl + this.learnedByTeam + teamId, {
      headers: this.httpOptions
    });
  }

  getTeamSubjectsToLearn(teamId: number): Observable<SubjectsToLearnByTeam> {
    return this.httpClient.get<SubjectsToLearnByTeam>(this.baseUrl + this.toLearnByTeam + teamId, {
      headers: this.httpOptions
    });
  }
}
