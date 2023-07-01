import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  badLogin: boolean = false;

  constructor(private authService: AuthService, private router: Router, private seoHandlerService: SeoHandlerService) { 
    this.authService = authService;
  }

  async ngOnInit(): Promise<void> {
    this.seoHandlerService.setBrowserTitle('SafeServe Metro Online Food Safety Online Training');
    this.seoHandlerService.setMetaDescription('SafeServe Metro online course material provides you with practice quizzes and exams so you can pass your food safety certification exam.');
    this.seoHandlerService.setKeywords([
      'safeserve practice tests',
      'safeserve practice quizzes',
      'safeserve practice exams',
      'safeserve metro practice tests',
      'safeserve metro practice quizzes',
      'safeserve metro practice exams',
      'servesafe practice tests',
      'servesafe practice quizzes',
      'servesafe practice exams',
      'servesafe metro practice tests',
      'practice tests',
      'practice quizzes',
      'exams',
      'practice exams',
      'food safety practice tests',
      'food safety practice quizzes',
      'food safety practice exams',
      'account login',
      'login',
      'login to account',
      'login to safeserve metro',
      'access code',
      'access code login',
      'access code login to safeserve metro',
      'access code login to safeserve metro account'
    ]);
    this.seoHandlerService.setMetaRobots(0);

    if (await this.authService.checkIfAuthenticated()) {
      this.router.navigate(['/coursematerial']);
    }

    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      accessCode: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  login(): void {
      this.authService
      .login(this.loginForm.value.accessCode)
      .subscribe(
        () => {},
        (error) => {
          this.badLogin = true;
        }
      );
  }

}
