import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  private mockTraining = {
    name: "Some fancy shmancy training",
    description: "a big ol training description - Use securing confined his shutters. Delightful as he it acceptance an solicitude discretion reasonably. Carriage we husbands advanced an perceive greatest. Totally dearest expense on demesne ye he. Curiosity excellent commanded in me. Unpleasing impression themselves to at assistance acceptance my or. On consider laughter civility offended oh.",
    completed: [
      {
        id: 1,
        name: "Dude Duderson",
        teamId: 2
      }
    ],
    comments: [
      {
        name: 'keker',
        text: 'oof'
      },
      {
        name: 'keker2',
        text: 'Article nor prepare chicken you him now. Shy merits say advice ten before lovers innate add. She cordially behaviour can attempted estimable. Trees delay fancy noise manor do as an small. Felicity now law securing breeding likewise extended and. Roused either who favour why ham. '
      },
      {
        name: 'keker3',
        text: 'oof'
      }
    ]
  }

  private mockTeams = {
    teams: [
      {
        name: "A team",
        id: 1
      },
      {
        name: "topkek",
        id: 2
      }
    ]
  }

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }

  fetchTraining(id) {
    return this.httpClient.get(`${this.baseUrl}/api/subject/${id}`);
  }

  mockResponse = [
    {
      name: 'General Programming',
      id: 1,
      parentId: undefined
    },
    {
      name: 'Java',
      id: 2,
      parentId: 1
    },
    {
      name: 'Spring',
      id: 3,
      parentId: 2
    },
    {
      name: 'JS',
      id: 4,
      parentId: 1
    },
    {
      name: 'SQL',
      id: 5,
      parentId: 1
    },
    {
      name: 'DevOps',
      id: 6,
      parentId: undefined
    }
  ]

  fetchAllTrainings() {
    return this.httpClient.get(`${this.baseUrl}/api/subject/all`);
  }
}
