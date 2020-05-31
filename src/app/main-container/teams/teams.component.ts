import { Component, OnInit } from '@angular/core';
import { Team } from '../../app.const';
import {TeamsService} from "../../teams.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [ {
    teamId: 1,
    name: 'Beer',
    managerId: 1,
    managerName: 'Drinking Champ'
    },
    {teamId: 2,
      name: 'Wine',
      managerId: 3,
      managerName: 'Bottle Hugger'
    },
    {teamId: 3,
      name: 'Vodka',
      managerId: 2,
      managerName: 'Shots Spiller'
    },
    {teamId: 4,
      name: 'Whiskey',
      managerId: 6,
      managerName: 'Cola Lover'
    },
    {teamId: 5,
      name: 'Tequila',
      managerId: 7,
      managerName: 'Crazy MF'
    }
  ];

  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
/*    this.teamsService.getAllTeams().subscribe(
      resp => {
        this.teams = resp;
      }
    ),
      error => {
        console.log(error.error.message);
      };*/
  }

}
