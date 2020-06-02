import { Component, OnInit } from '@angular/core';
import { Team } from '../../app.const';
import {TeamsService} from "../../teams.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.teamsService.getAllTeams().subscribe(
      resp => {
        this.teams = resp;
      }
    ),
      error => {
        console.log(error.error.message);
      };
  }

}
