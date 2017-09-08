import { TestBed, inject } from '@angular/core/testing';

import { GraphQLService } from './graph-ql.service';

describe('GraphQLService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GraphQLService]
    });
  });

  it('should be created', inject([GraphQLService], (service: GraphQLService) => {
    expect(service).toBeTruthy();
  }));
});
