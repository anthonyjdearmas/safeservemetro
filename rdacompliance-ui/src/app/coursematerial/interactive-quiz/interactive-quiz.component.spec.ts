import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InteractiveQuizComponent } from './interactive-quiz.component';
import { UserService } from 'src/app/services/user.service';

describe('InteractiveQuizComponent', () => {
  let component: InteractiveQuizComponent;
  let fixture: ComponentFixture<InteractiveQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ InteractiveQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a getSpecifiedQuiz() function', () => {
    expect(component.getSpecifiedQuiz).toBeTruthy();
  });

  it('should initialize form controls and retrieve highest recorded score', async () => {
    component.requestedQuiz = 1;
    component.specifiedQuizObj = {
      questions: [
        { questionid: 'q1' },
        { questionid: 'q2' }
      ]
    };
    const userService = TestBed.inject(UserService);
    spyOn(component, 'getSpecifiedQuiz').and.returnValue(component.specifiedQuizObj);
    spyOn(userService, 'getSpecificQuizData').and.returnValue(Promise.resolve('10'));  
    await component.ngOnChanges();
  
    expect(component.getSpecifiedQuiz).toHaveBeenCalledWith(1);
    expect(component.quizquestions.contains('q1')).toBe(true);
    expect(component.quizquestions.contains('q2')).toBe(true);
    expect(component.highestRecordedQuizScore).toBe(1);
  });




});
