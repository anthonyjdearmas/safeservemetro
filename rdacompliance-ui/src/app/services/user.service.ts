import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());
  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));
  public url = environment.apiUrl;
  userAccessCode: Pick<User, "accessCode">;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.authService = authService;
  }

  async setQuizData(quizNumber: number, quizProgress: number) {
    let accessCode = await this.authService.getAccessCode();
    this.http.post(`${this.url}/user/setquizdata`, { accessCode, quizNumber, quizProgress }).subscribe((res: any) => {
    });
  }

  async getSpecificQuizData(quizNumber: number): Promise<string> {
    let accessCode = await this.authService.getAccessCode();
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/user/getquizdata`, { params: { accessCode, quizNumber } }).subscribe((res: any) => {
        resolve(res.quizProgress);
      }, (error) => {
        reject(error);
      });
    });
  }

  async getExpirationDate(): Promise<string> {
    let accessCode = await this.authService.getAccessCode();
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/user/getexpirationdate`, { params: { accessCode } }).subscribe((res: any) => {
        resolve(res.expirationDate);
      }, (error) => {
        reject(error);
      });
    });
  }

  async getAllQuizData(): Promise<string> {
    let accessCode = await this.authService.getAccessCode();
    return new Promise((resolve, reject) => {
      this.http.get(`${this.url}/user/getallquizdata`, { params: { accessCode } }).subscribe((res: any) => {
        resolve(res.allQuizData);
      }, (error) => {
        reject(error);
      });
    });
  }

}
