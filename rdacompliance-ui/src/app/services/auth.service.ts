import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

import { Observable, BehaviorSubject } from "rxjs";
import { first, catchError, tap } from "rxjs/operators";

import { User } from "../models/User";
import { ErrorHandlerService } from "./error-handler.service";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = environment.apiUrl + "/auth";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userAccessCode: Pick<User, "accessCode">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };


  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) { }

  persistentIsLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem("token");
    if (token) {
      this.isUserLoggedIn$.next(true);
      localStorage.setItem("isUserLoggedIn$", "true");
      return this.isUserLoggedIn$;
    } else {
      this.isUserLoggedIn$.next(false);
      localStorage.setItem("isUserLoggedIn$", "false");
      return this.isUserLoggedIn$;
    }
  }

  getAccessCode(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/getmyaccesscode`).subscribe((res: any) => {
        resolve(res.userAccessCode);
      }, (error) => {
        reject(error);
      });
    });
  }

  login(
    userAccessCode: Pick<User, "accessCode">,
  ): Observable<{
    token: string;
    userAccessCode: Pick<User, "accessCode">;
  }>  {
    return this.http
      .post(`${this.url}/login`, { userAccessCode }, this.httpOptions)
      .pipe(
        first(),
        tap((res: any) => {
          localStorage.setItem("token", res.token);
          this.isUserLoggedIn$.next(true);
          localStorage.setItem("isUserLoggedIn$", "true");
          this.router.navigate(["/coursematerial"]);
        })
      );
  }

  checkIfAuthenticated() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/checkifauthisvalid`).subscribe((res: any) => {
        resolve(res.isValid);
      }, (error) => {
        reject(error);
      });
    });
  }

  purgeAuth(): void {
    localStorage.removeItem("token");
    this.isUserLoggedIn$.next(false);
    localStorage.setItem("isUserLoggedIn$", "false");
    if (this.router.url !== "/login") {
      this.router.navigate(["/login"]);
    }
  }

}


