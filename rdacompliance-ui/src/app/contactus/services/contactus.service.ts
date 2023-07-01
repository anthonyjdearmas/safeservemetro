import { Injectable } from '@angular/core';
import { catchError, first, Observable } from 'rxjs';
import { ContactTicket } from '../models/ContactTicket';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorHandlerService } from '../../services/error-handler.service';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
  ) { }

  submitContactUsForm(contactticket: ContactTicket): Observable<ContactTicket> {
    return this.http
      .post<ContactTicket>(`${environment.apiUrl}/contactus`, contactticket, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<ContactTicket>("contactus"))
      );
  }
}
