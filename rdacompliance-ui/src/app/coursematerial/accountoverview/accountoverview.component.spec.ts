import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountoverviewComponent } from './accountoverview.component';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

describe('AccountoverviewComponent', () => {
  let component: AccountoverviewComponent;
  let fixture: ComponentFixture<AccountoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ AccountoverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculateDaysLeftBeforeExpiration() should return 1 if expiration date is today', () => {
    const today = new Date();
    const todayString = today.toLocaleDateString();
    component.readExpirationDate = todayString;
    expect(component.calculateDaysLeftBeforeExpiration()).toEqual(1);
  });

  it('convertDateString() should return a string in the format of mm/dd/yyyy', () => {
    const date = '2021-01-01';
    expect(component.convertDateString(date)).toEqual('1/1/2021');
  });

  it('isExam() should return true if quiz_id_key includes 11', () => {
    expect(component.isExam('11')).toEqual(true);
  });

  it('findNumberOfQuizzesCompleted() should set numberOfQuizzesCompleted to 1 and totalNumberOfQuizzes to 2', () => {
    component.readAllQuizData = {
      '1': 0,
      '2': 1
    };
    component.findNumberOfQuizzesCompleted();
    expect(component.numberOfQuizzesCompleted).toEqual(1);
    expect(component.totalNumberOfQuizzes).toEqual(2);
  });

  it('findAverageQuizScore() should set averageQuizScorePercentage to 50', () => {
    component.readAllQuizData = {
      '11': 0,
      '2': 100
    };
    component.findAverageQuizScore();
    expect(component.averageQuizScorePercentage).toEqual(100);
  });

  it('findAverageExamScore() should set averageExamScorePercentage to 50', () => {
    component.readAllQuizData = {
      '1': 0,
      '2': 100,
      '11': 100,
      '12': 100
    };
    component.findAverageExamScore();
    expect(component.averageExamScorePercentage).toEqual(100);
  });

  it('findNumberOfExamsCompleted() should set numberOfExamsCompleted to 1 and totalNumberOfExams to 2', () => {
    component.readAllQuizData = {
      '11': 0,
      '12': 1
    };
    component.findNumberOfExamsCompleted();
    expect(component.numberOfExamsCompleted).toEqual(1);
    expect(component.totalNumberOfExams).toEqual(2);
  });

  it('getAllData() should call userService.getAllQuizData(), authService.getAccessCode(), userService.getExpirationDate(), and other methods', async () => {
    const userService = TestBed.inject(UserService);
    const authService = TestBed.inject(AuthService);
    const spyGetAllQuizData = spyOn(userService, 'getAllQuizData').and.returnValue(Promise.resolve(''));
    const spyGetAccessCode = spyOn(authService, 'getAccessCode').and.returnValue(Promise.resolve(''));
    const spyGetExpirationDate = spyOn(userService, 'getExpirationDate').and.returnValue(Promise.resolve(''));
    const spyConvertDateString = spyOn(component, 'convertDateString').and.callThrough();
    const spyCalculateDaysLeftBeforeExpiration = spyOn(component, 'calculateDaysLeftBeforeExpiration').and.callThrough();
    const spyFindNumberOfQuizzesCompleted = spyOn(component, 'findNumberOfQuizzesCompleted').and.callThrough();
    const spyFindAverageQuizScore = spyOn(component, 'findAverageQuizScore').and.callThrough();
    const spyFindAverageExamScore = spyOn(component, 'findAverageExamScore').and.callThrough();
    const spyFindNumberOfExamsCompleted = spyOn(component, 'findNumberOfExamsCompleted').and.callThrough();
  
    await component.getAllData();
  
    expect(spyGetAllQuizData).toHaveBeenCalled();
    expect(spyGetAccessCode).toHaveBeenCalled();
    expect(spyGetExpirationDate).toHaveBeenCalled();
    expect(spyConvertDateString).toHaveBeenCalled();
    expect(spyCalculateDaysLeftBeforeExpiration).toHaveBeenCalled();
    expect(spyFindNumberOfQuizzesCompleted).toHaveBeenCalled();
    expect(spyFindAverageQuizScore).toHaveBeenCalled();
    expect(spyFindAverageExamScore).toHaveBeenCalled();
    expect(spyFindNumberOfExamsCompleted).toHaveBeenCalled();
  });

  it('ngOnInit() should call getAllData()', async () => {
    const spyGetAllData = spyOn(component, 'getAllData');
  
    await component.ngOnInit();
  
    expect(spyGetAllData).toHaveBeenCalled();
  });

  it('ngOnChanges() should call getAllData()', async () => {
    const spyGetAllData = spyOn(component, 'getAllData');
  
    await component.ngOnChanges();
  
    expect(spyGetAllData).toHaveBeenCalled();
  });

  it('getProgressBarColor() should return the correct color for different values of percentage', () => {
    expect(component.getProgressBarColor(0)).toEqual('#ff0000');
    expect(component.getProgressBarColor(17.5)).toEqual('#ff3600');
    expect(component.getProgressBarColor(35)).toEqual('#ff6d00');
    expect(component.getProgressBarColor(50)).toEqual('#ffb900');
    expect(component.getProgressBarColor(75)).toEqual('#80c000');
    expect(component.getProgressBarColor(100)).toEqual('#008000');
  });

});
