import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class GraphQLService {

  constructor(
    private http: Http
  ) { }

  loadGraphQLEP() {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var data = { query: "{ hello }" };

    return this.http.post('http://localhost:4000/api/graphql', JSON.stringify(data), { headers })
      .map(res => res.json());
  }

}
