import { HttpClient } from "@angular/common/http";
import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from "../../../environments/environment";
import { AuthService } from "../../services/auth.service";
import { UserService } from "src/app/services/user.service";
import { SeoHandlerService } from "src/app/services/seo-handler.service";
import * as quizData from '../../../assets/tenant-info/interactive-quizzes.json';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-coursecontent',
  templateUrl: './coursematerial.component.html',
  styleUrls: ['./coursematerial.component.css']
})
export class CoursematerialComponent implements OnInit {

  activeSubPage : number = 0;
  requestedQuiz : number = 1;
  mobileMode: boolean = false;
  private url = environment.apiUrl
  readAllQuizData: string;
  eachQuizStatus: string[];
  jsonQuizData = (quizData as any).default;
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private platformId: any;

  constructor(
    private http: HttpClient,
    private readonly authService: AuthService,
    private userService: UserService,
    private seoHandlerService: SeoHandlerService,
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) platformId: Object
    ) {
    this.authService = authService;
    this.platformId = platformId;
  }

  isWhereExamsStart(i: number): boolean {
    if (i == 10) {
      return true;
    }
    return false;
  }
    
  async ngOnInit() {
    this.seoHandlerService.setBrowserTitle('SafeServe Metro Online Food Safety Online Training');
    this.seoHandlerService.setMetaDescription('SafeServe Metro online course material provides you with practice quizzes and exams so you can pass your food safety certification exam.');
    this.seoHandlerService.setMetaRobots(2);
    if (window.innerWidth < 1150 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    }

    let sessionIsValid = await this.authService.checkIfAuthenticated();
    if (!sessionIsValid) {
      await this.authService.purgeAuth();
    }

    this.readAllQuizData = await this.userService.getAllQuizData();
    this.getEachQuizStatus();
  }

  async ngOnChanges() {
    let sessionIsValid = await this.authService.checkIfAuthenticated();
    if (!sessionIsValid) {
      await this.authService.purgeAuth();
    }
  }

  getEachQuizStatus() {
    const quizStatuses =[];
    for (const [key, value] of Object.entries(this.readAllQuizData)) {
      if (typeof value === 'number') {
        if (value == 0) {
          quizStatuses.push('0');
        } else if (value < 90) {
          quizStatuses.push('1');
        } else {
          quizStatuses.push('2');
        }
      }
    }
    this.eachQuizStatus = quizStatuses;
  }

  async manualLogout() {
    if (isPlatformBrowser(this.platformId))
    {
      window.location.replace('/login');
    }
    await this.authService.purgeAuth();
  }
  
  setActiveSubPage(index: number) {
    this.activeSubPage = index;
    this.requestedQuiz = index - 1;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.mobileMode && window.innerWidth < 1150 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    } else if (this.mobileMode && window.innerWidth > 1150 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    }
  }

  public toggleMobileModeSetting(): void {
    this.mobileMode = !this.mobileMode;
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
