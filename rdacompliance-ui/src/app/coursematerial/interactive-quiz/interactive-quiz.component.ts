import { Component, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as quizData from '../../../assets/tenant-info/interactive-quizzes.json';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-interactive-quiz',
  templateUrl: './interactive-quiz.component.html',
  styleUrls: ['./interactive-quiz.component.css']
})
export class InteractiveQuizComponent {

  @Input() requestedQuiz: number;

  quizData: any = (quizData as any).default;
  specifiedQuizObj: any;
  quizquestions: FormGroup;
  fb: FormBuilder;
  quizState: string = '';
  quizScore: number;
  highestRecordedQuizScore: number;
  platformId: any;

  getSpecifiedQuiz(chapterNumber: number): any {
    return this.quizData[chapterNumber];
  }

  constructor(
      fb: FormBuilder,
      private userService: UserService,
      @Inject(PLATFORM_ID) platformId: Object
    ) {
      this.fb = fb;
      this.userService = userService;
      this.platformId = platformId;
  }

  async ngOnChanges() {
    this.specifiedQuizObj = this.getSpecifiedQuiz(this.requestedQuiz);
    this.quizquestions = this.fb.group({});
    for (let i = 0; i < this.specifiedQuizObj.questions.length; i++) {
      this.quizquestions.addControl(
        this.specifiedQuizObj.questions[i].questionid,
        this.fb.control('', Validators.required));
    }

    this.quizState = '';
    this.quizScore = 0;

    let currQuizScoreObj = await this.userService.getSpecificQuizData(this.requestedQuiz);
    if (!currQuizScoreObj) {
      this.highestRecordedQuizScore = 0;
    } else {
      this.highestRecordedQuizScore = parseInt(Object.values(currQuizScoreObj)[0]);
    }
  }

  async restartQuiz(): Promise<void> {
    this.specifiedQuizObj = this.getSpecifiedQuiz(this.requestedQuiz);
    this.quizquestions = this.fb.group({});
    for (let i = 0; i < this.specifiedQuizObj.questions.length; i++) {
      this.quizquestions.addControl(
        this.specifiedQuizObj.questions[i].questionid,
        this.fb.control('', Validators.required));
    }

    this.quizState = '';
    this.quizScore = 0;

    let currQuizScoreObj = await this.userService.getSpecificQuizData(this.requestedQuiz);
    this.highestRecordedQuizScore = parseInt(Object.values(currQuizScoreObj)[0]);

    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    for (let i = 0; i < this.specifiedQuizObj.questions.length; i++) {
      for (let j = 0; j < this.specifiedQuizObj.questions[i].choices.length; j++) {
        document.getElementById(this.specifiedQuizObj.questions[i].questionid + '_' + j + '_span')?.classList.remove('chosen-answer');
        document.getElementById(this.specifiedQuizObj.questions[i].questionid + '_' + j + '_span')?.classList.remove('correct-answer');
      }
    }
  }

  
  highlightCorrectAnswer(question: any): void {
    let chosenAnswer = this.quizquestions.controls[question.questionid]?.value;
    let correctAnswer = question.choices[question.correct];

    for (let i = 0; i < question.choices.length; i++) {
      if (question.choices[i] == chosenAnswer) {
        const element = document.getElementById(question.questionid + '_' + i);
        document.getElementById(question.questionid + '_' + i + '_span')?.classList.add('chosen-answer');
      }
      if (question.choices[i] == correctAnswer) {
        document.getElementById(question.questionid + '_' + i + '_span')?.classList.add('correct-answer');
      }
    }
  }

  async saveHighestQuizScore(): Promise<void> {
    if (this.highestRecordedQuizScore < this.quizScore) {
      await this.userService.setQuizData(this.requestedQuiz, this.quizScore);
      this.updateQuizStatusIcon(this.quizScore);
    }
  }

  submitForm(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    
    if (!this.quizquestions.valid) {
      this.quizState = 'incomplete';
      return;
    }

    let totalCorrect = 0;
    for (let i = 0; i < this.specifiedQuizObj.questions.length; i++) {
      let chosenAnswer = this.quizquestions.controls[this.specifiedQuizObj.questions[i].questionid].value;
      if (this.specifiedQuizObj.questions[i].choices.indexOf(chosenAnswer) == this.specifiedQuizObj.questions[i].correct) {
        totalCorrect++;
      }
      this.highlightCorrectAnswer(this.specifiedQuizObj.questions[i]);
    }

    this.quizScore = (totalCorrect / this.specifiedQuizObj.questions.length) * 100
    this.quizScore = Math.round(this.quizScore);
    if (isNaN(this.quizScore)) {
      this.quizScore = 0;
    }

    this.saveHighestQuizScore();

    this.quizState = 'complete';
  }

  updateQuizStatusIcon(quizScore: number): void {
    let newElement = document.createElement('span');
    newElement.id = 'chapter' + (this.requestedQuiz) + 'quizStatus';

    if (quizScore > 90 ) {
      newElement.style.color = 'green';
      newElement.classList.add('bi-check-circle-fill');
    } else if (quizScore > 0 && quizScore < 90) {
      newElement.style.color = 'red';
      newElement.classList.add('bi-x-circle-fill');
    } else {
      newElement.style.color = 'orange';
      newElement.classList.add('bi-exclamation-circle-fill');
    }


    let oldElement = document.getElementById('chapter' + (this.requestedQuiz) + 'quizStatus');
    if (oldElement) {
      if (oldElement && oldElement.parentNode instanceof HTMLElement) {
        oldElement.replaceWith(newElement);
      }
    }
  }
  
}
