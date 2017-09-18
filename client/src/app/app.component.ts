import { Component, OnInit } from '@angular/core';

import { GraphQLService } from './services/graph-ql.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Ng GraphQL Example';
  graphql_returned: object;
  graphql_returned_str: string;

  constructor(
    private graphQLService: GraphQLService
  ) {}

  ngOnInit(): void {
    this.graphQLService.loadGraphQLEP()
      .subscribe(res => {
        this.graphql_returned = res;
        this.graphql_returned_str = JSON.stringify(this.graphql_returned);
      });
  }
}
