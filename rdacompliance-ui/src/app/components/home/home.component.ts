import { Component, HostListener, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public mobileMode: boolean = false;
  private platformId: any;

  constructor(
    private seoHandlerService: SeoHandlerService,
    @Inject(PLATFORM_ID) platformId: Object
    ) { 
    this.seoHandlerService = seoHandlerService;
    this.platformId = platformId;
  }

  ngOnInit(): void {
    this.seoHandlerService.setBrowserTitle('SafeServe Food Safety Certification');
    this.seoHandlerService.setMetaDescription('SafeServe Metro provides ServSafe Food Safety Certification to Pennsylvania, New Jersey and New York restaurants. We will help prepare you with a customized study portal that includes ServSafe practice tests and quizzes.');
    this.seoHandlerService.setKeywords([
      'safeserve food safety certification',
      'safeserve food safety class',
      'safeserve food safety',
      'safeserve food safety certification course',
      'servsafe food safety certification',
      'servsafe food safety training',
      'servsafe food safety course',
      'servsafe food safety class',
      'servsafe food safety',
      'servsafe food safety certification course',
      'servsafe food safety certification class',
      'servsafe pa',
      'servsafe practice test',
      'how to get servsafe certified in pa',
      'safeserve',
      'safeserve class',
      'safeserve certification',
      'food safety practice exams',
      'food safety practice test',
      'enroll in food safety course',
      'enroll in food safety class',
      'enroll in food safety certification',
      'practice tests included',
      'practice quizzes included',
      'practice exams included',
      'practice tests',
      'practice quizzes',
      'account login',
      'access code',
      'access code login',
      'access code login to safeserve metro',
    ]);
    this.seoHandlerService.setMetaRobots(0);

    if (isPlatformBrowser(this.platformId) && window.innerWidth <= 1180) {
      this.toggleMobileModeSetting();
    }
  }

  public toggleMobileModeSetting(): void {
    if (this.mobileMode) {
      this.mobileMode = false;
    } else {
      this.mobileMode = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (!this.mobileMode && window.innerWidth <= 1180 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    } else if (this.mobileMode && window.innerWidth > 1180 && isPlatformBrowser(this.platformId)) {
      this.toggleMobileModeSetting();
    }
  }
  
}
