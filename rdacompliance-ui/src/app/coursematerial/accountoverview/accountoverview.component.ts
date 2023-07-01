import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-accountoverview',
  templateUrl: './accountoverview.component.html',
  styleUrls: ['./accountoverview.component.css']
})
export class AccountoverviewComponent implements OnInit {

 
  @Input() mobileMode: boolean;

  readAllQuizData: any;
  readAccessCode = '';
  readExpirationDate = '';
  readDaysBeforeExpiration = 31;

  numberOfQuizzesCompleted: number;
  totalNumberOfQuizzes: number;
  averageQuizScorePercentage: number = 0;
  eachQuizStatus: string[];
  averageExamScorePercentage: number = 0;
  numberOfExamsCompleted: number;
  totalNumberOfExams: number;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {
    this.userService = userService;
    this.authService = authService;
  }

  calculateDaysLeftBeforeExpiration(): number {
    const expirationDate = new Date(this.readExpirationDate);
    const today = new Date();
    const timeDiff = Math.abs(expirationDate.getTime() - today.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  convertDateString(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { timeZone: 'UTC' });
  }

  isExam(quiz_id_key: string): boolean {
    if (quiz_id_key.includes('11') || quiz_id_key.includes('12')) {
      return true;
    }
    return false;
  }

  findNumberOfQuizzesCompleted(): void {
    if (!this.readAllQuizData) {
      return;
    }

    let numberOfQuizzesCompleted = 0;
    let totalNumberOfQuizzes = 0;
    for (const [key, value] of Object.entries(this.readAllQuizData)) {
      if (this.isExam(key)) continue;
      if (typeof value === 'number') {
        if (value > 0) {
          numberOfQuizzesCompleted++;
        }
      }
      totalNumberOfQuizzes++;
    }
    this.numberOfQuizzesCompleted = numberOfQuizzesCompleted;
    this.totalNumberOfQuizzes = totalNumberOfQuizzes;
  }

  findAverageQuizScore(): void {
    if (!this.readAllQuizData) {
      return;
    }
    
    let totalScore = 0;
    let totalNumberOfQuizzes = 0;
    for (const [key, value] of Object.entries(this.readAllQuizData)) {
      if (this.isExam(key)) continue;
      if (typeof value === 'number') {
        if (value > 0) {
          totalScore += value;
          totalNumberOfQuizzes++;
        }
      }
    }
    this.averageQuizScorePercentage = 
      Math.round(totalScore / totalNumberOfQuizzes);

    if (isNaN(this.averageQuizScorePercentage)) {
      this.averageQuizScorePercentage = 0;
    }
  }

  findAverageExamScore(): void {
    if (!this.readAllQuizData) {
      return;
    }

    let totalScore = 0;
    let totalNumberOfExams = 0;
    for (const [key, value] of Object.entries(this.readAllQuizData)) {
      if (this.isExam(key)) {
        if (typeof value === 'number' && value > 0) {
          totalScore += value;
          totalNumberOfExams++;
        }
      }
    }
    this.averageExamScorePercentage = 
      Math.round(totalScore / totalNumberOfExams);

    if (isNaN(this.averageExamScorePercentage)) {
      this.averageExamScorePercentage = 0;
    }
  }

  findNumberOfExamsCompleted(): void {
    if (!this.readAllQuizData) {
      return;
    }

    let numberOfExamsCompleted = 0;
    let totalNumberOfExams = 0;
    for (const [key, value] of Object.entries(this.readAllQuizData)) {
      if (this.isExam(key)) {
        if (typeof value === 'number' && value > 0) {
          numberOfExamsCompleted++;
        }
        totalNumberOfExams++;
      }
    }
    this.numberOfExamsCompleted = numberOfExamsCompleted;
    this.totalNumberOfExams = totalNumberOfExams;
  }

  async getAllData(): Promise<void> {
    this.readAllQuizData = await this.userService.getAllQuizData();
    this.readAccessCode = await this.authService.getAccessCode();
    this.readExpirationDate = await this.userService.getExpirationDate();
    this.readExpirationDate = this.convertDateString(this.readExpirationDate);
    this.readDaysBeforeExpiration = this.calculateDaysLeftBeforeExpiration();
    this.findNumberOfQuizzesCompleted();
    this.findAverageQuizScore();
    this.findAverageExamScore();
    this.findNumberOfExamsCompleted();
  }

  async ngOnInit(): Promise<void> {
    this.getAllData();
  }

  async ngOnChanges(): Promise<void> {
    this.getAllData();
  }

  getProgressBarColor(percentage: number) : string {
    let startColor;
    let endColor: any;
    if (percentage <= 35) {
      startColor = [255, 0, 0];
      endColor = [255, 155, 0];
      percentage *= 2;
    } else if (percentage <= 50) {
      startColor = [255, 155, 0];
      endColor = [255, 255, 0];
      percentage = (percentage - 35) * 2;
    } else {
      startColor = [255, 255, 0];
      endColor = [0, 128, 0];
      percentage = (percentage - 50) * 2;
    }
    const color = startColor.map((channel, index) => Math.round(channel + percentage * (endColor[index] - channel) / 100));
    return `#${color.map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
  }
  
}
