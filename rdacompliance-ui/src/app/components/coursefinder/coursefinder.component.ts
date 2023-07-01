import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PackageInformation as siteconfig } from '../../../assets/tenant-info/packageinformation';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-coursefinder',
  templateUrl: './coursefinder.component.html',
  styleUrls: ['./coursefinder.component.css'],
  animations: []
})
export class CoursefinderComponent implements OnInit {

  phoneMode = false;
  showQuestionaire = false; // Hides get started page when true
  showResults = false; // Shows results page HTML
  progress = 0; // Progress bar width
  currQuestion = 0; // Current question user is on
  yesResponse = false; // True when user selects 'Yes' to a question.
  noResponse = false; // True when user selects 'No' to a question.

  // Note: This needs to be type any because different package objs have different properties
  selectedPackage: any = siteconfig.packageBethlehem;

  questionIndex: string[] = [
    "Is this your first time taking the ServSafe® course?",
    "Do you feel that you would benefit by reviewing the ServSafe® course again, and by taking the practice quizzes and exams?",
    "Do you want to travel to Bethlehem, PA,  for the course review and exam?",
    "Is more than one person going to enroll in the course and exam?"
  ];

  userResponses: boolean[] = [
    false,
    false,
    false,
    false
  ]

  platformId: any;

  constructor(
    private seoHandlerService: SeoHandlerService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
  }

  ngOnInit(): void {
    this.seoHandlerService.setBrowserTitle('ServSafe Course Finder');
    this.seoHandlerService.setMetaDescription('Find the ServSafe course package that is right for you by answering a few simple questions.');
    this.seoHandlerService.setKeywords([
      'ServSafe course finder',
      'ServSafe course finder Bethlehem',
      'ServSafe course finder Bethlehem PA',
      'ServSafe course finder Bethlehem NJ',
      'ServSafe course finder Bethlehem NY',
      'ServSafe course finder online',
      'ServSafe course finder online Bethlehem',
      'Safeserve course finder',
      'Safeserve course finder Bethlehem',
      'Safeserve course finder PA',
      'Safeserve course finder NJ',
      'Safeserve course finder NY',
      'Safeserv course finder',
      'Course finder',
      'find a course',
      'how to find a course',
      'find a course online',
      'which course is right for me',
      'which food safety course do I pick',
      'which food safety course is right for me',
      'course recommendation',
      'course recommendation tool',
      'course recommendation quiz',
      'course recommendation test',
      'help me find a course',
      'help me find a course online',
      'help me find a course near me',
      'help me find a course in Bethlehem',
      'help me find a course in Bethlehem PA'
    ]);
    this.seoHandlerService.setMetaRobots(0);
    if (isPlatformBrowser(this.platformId)) {
      this.phoneMode = window.innerWidth <= 600;
    }
  }

  scrollToTop(): void {
    document.body.scrollTop = 25;
    document.documentElement.scrollTop = 25;
  }

  beginQuestionaire(): void {
    this.showQuestionaire = true;
  }

  forceOneCheckbox(currCheckBox: HTMLInputElement): void {
    if (currCheckBox.id === 'yescheckbox') {
      let nocheckbox = document.getElementById("nocheckbox") as HTMLInputElement;
      nocheckbox.checked = false;
    } else if (currCheckBox.id === 'nocheckbox') {
      let yescheckbox = document.getElementById("yescheckbox") as HTMLInputElement;
      yescheckbox.checked = false;
    }
  }

  resetCurrentQuestion(): void {
    this.updateProgressBar();
    this.yesResponse = false;
    this.noResponse = false;

    let yesCheckBox = this.getCurrentCheckboxes()[0]
    let noCheckBox = this.getCurrentCheckboxes()[1];
    noCheckBox.checked = false;
    yesCheckBox.checked = false;

    this.removeDisplayErrorMsg();
  }

  resetEntireQuestionaire(): void {
    this.currQuestion = 0;
    this.yesResponse = false;
    this.noResponse = false;
    this.progress = 0;

    let nocheckbox = document.getElementById("nocheckbox") as HTMLInputElement;
    let yescheckbox = document.getElementById("yescheckbox") as HTMLInputElement;
    nocheckbox.checked = false;
    yescheckbox.checked = false;

    this.userResponses.forEach(response => {
      response = false;
    });

    this.showResults = false;
    this.showQuestionaire = true;

    this.scrollToTop();
  }

  displayResults(): void {
    this.showResults = true;
    this.showQuestionaire = false;

    let stringResponses = this.userResponses.toString();

    switch (stringResponses) {
      case ("false,true,true,true"):
      case ("true,true,true,true"):
        this.selectedPackage = siteconfig.packageBethlehem;
        this.selectedPackage.multiplePpl = true
        break;
      case ("true,true,true,false"):
        this.selectedPackage = siteconfig.packageBethlehem;
        break;
      case ("false,true,false,true"):
        this.selectedPackage = siteconfig.packageYourLocation;
        this.selectedPackage.multiplePpl = true
        break;
      case ("false,true,false,false"):
        this.selectedPackage = siteconfig.packageYourLocation;
        break;
      case ("false,false,false,false"):
      case ("true,false,false,false"):
      case ("false,false,false,true"):
      case ("false,false,true,false"):
      case ("false,false,true,true"):
        this.selectedPackage = siteconfig.packageExamOnly;
        break;

      default:
        console.log("UNCONSIDERED CASE:");
        console.log(stringResponses);
        break;
    }
  }

  displayErrorMsg(): void {
    let errorElement = document.getElementById("blank_question_error") as HTMLStyleElement;
    errorElement.style.display = "block";
    this.scrollToTop();
  }

  removeDisplayErrorMsg(): void {
    let errorElement = document.getElementById("blank_question_error") as HTMLStyleElement;
    errorElement.style.display = "none";
  }

  updateProgressBar(): void {
    this.progress = ((this.currQuestion) / (this.userResponses.length - 1)) * 95
  }

  getCurrentCheckboxes(): HTMLInputElement[] {
    let nocheckbox = document.getElementById("nocheckbox") as HTMLInputElement;
    let yescheckbox = document.getElementById("yescheckbox") as HTMLInputElement;
    return [yescheckbox, nocheckbox];
  }

  gotoQuestion(questionIndex: number): void {
    // Note: first question starts at 0
    this.currQuestion = (questionIndex);
  }

  nextQuestion(): void {
    if (this.yesResponse) {
      this.userResponses[this.currQuestion] = true;
    } else if (!this.noResponse && !this.yesResponse) {
      this.displayErrorMsg();
      return;
    }

    if (this.currQuestion >= (this.questionIndex.length - 1)) {
      this.displayResults();
      return;
    }

    if (this.currQuestion == 0 && this.yesResponse) {
      this.userResponses[1] = true;
      this.gotoQuestion(2);
    } else if (this.currQuestion == 1 && this.noResponse && !this.userResponses[0]) {
      this.userResponses[2] = true;
      this.gotoQuestion(3);
    }
    else {
      this.gotoQuestion(this.currQuestion + 1);
    }

    this.resetCurrentQuestion();
  }

  previousQuestion(): void {
    if (this.currQuestion <= 0) return;

    let current_yesCheckBox = this.getCurrentCheckboxes()[0]
    let current_noCheckBox = this.getCurrentCheckboxes()[1];
    current_noCheckBox.checked = false;
    current_yesCheckBox.checked = false;

    if (this.currQuestion == 2 && this.userResponses[0]) {
      this.resetEntireQuestionaire();
    } else {
      this.userResponses[this.currQuestion - 1] = false;
      this.currQuestion = (this.currQuestion - 1);
    }

    this.updateProgressBar();
  }
}