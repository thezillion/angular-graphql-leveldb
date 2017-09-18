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

    var data = { query: '{ bears(key: "steve") { key, type, region { name } } }' };

    return this.http.post('/api/graphql', JSON.stringify(data), { headers })
      .map(res => res.json());
  }

}
