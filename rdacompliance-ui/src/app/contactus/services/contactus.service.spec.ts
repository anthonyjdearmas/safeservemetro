import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContactusService } from './contactus.service';
import { ContactTicket } from '../models/ContactTicket';
import { environment } from 'src/environments/environment';

describe('ContactusService', () => {
  let httpTestingController: HttpTestingController;
  let service: ContactusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactusService]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a post request to the contact us endpoint', () => {
    const mockContactUsForm: ContactTicket = {
      fullName: 'test',
      phoneNumber: 'test',
      emailAddress: 'test',
      message: 'test',
      sendCopy: false
    };
    service.submitContactUsForm(mockContactUsForm).subscribe();
    const req = httpTestingController.expectOne(`${environment.apiUrl}/contactus`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockContactUsForm);

  });

});
