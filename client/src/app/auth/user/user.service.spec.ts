import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend} from "@angular/http/testing";
import { Router } from '@angular/router';
import { ElectionService } from '../../election/election.service';
describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http, 
          useFactory: (backend, options) => new Http(backend, options), 
          deps: [MockBackend, BaseRequestOptions] 
        },
        { provide: Router, useClass: RouterStub },
        { provide: ElectionService, useClass: ElectionServiceStub},
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
class RouterStub {
  navigateByUrl(url: string) { return url; }
}
class ElectionServiceStub{
  
}