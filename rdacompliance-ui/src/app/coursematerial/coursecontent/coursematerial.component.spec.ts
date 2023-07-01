import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CoursematerialComponent } from './coursematerial.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from 'src/app/services/auth.service';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';
import { UserService } from 'src/app/services/user.service';


describe('CoursematerialComponent', () => {
  let component: CoursematerialComponent;
  let fixture: ComponentFixture<CoursematerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule
      ],
      declarations: [ CoursematerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursematerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isWhereExamsStart() should return true if i is 10', () => {
    expect(component.isWhereExamsStart(10)).toBeTrue();
    expect(component.isWhereExamsStart(9)).toBeFalse();
  });

  it('ngOnInit() should set browser title, meta description, and meta robots', async () => {
    const authService = TestBed.inject(AuthService);
    const seoHandlerService = TestBed.inject(SeoHandlerService);
    const userService = TestBed.inject(UserService);
    const spyGetAllQuizData = spyOn(userService, 'getAllQuizData').and.returnValue(Promise.resolve('0, 0, 0, 0, 0, 0, 0, 0, 0, 0'));
    const spySetBrowserTitle = spyOn(seoHandlerService, 'setBrowserTitle');
    const spySetMetaDescription = spyOn(seoHandlerService, 'setMetaDescription');
    const spySetMetaRobots = spyOn(seoHandlerService, 'setMetaRobots');
    const spyCheckIfAuthenticated = spyOn(authService, 'checkIfAuthenticated').and.returnValue(Promise.resolve(true));
    const spyPurgeAuth = spyOn(authService, 'purgeAuth');
  
    await component.ngOnInit();
  
    expect(spySetBrowserTitle).toHaveBeenCalledWith('SafeServe Metro Online Food Safety Online Training');
    expect(spySetMetaDescription).toHaveBeenCalledWith('SafeServe Metro online course material provides you with practice quizzes and exams so you can pass your food safety certification exam.');
    expect(spySetMetaRobots).toHaveBeenCalledWith(2);
    expect(spyCheckIfAuthenticated).toHaveBeenCalled();
    expect(spyPurgeAuth).not.toHaveBeenCalled();
    expect(spyGetAllQuizData).toHaveBeenCalled();
  });

  it('ngOnChanges() should call checkIfAuthenticated() and purgeAuth() if checkIfAuthenticated() returns false', async () => {
    const authService = TestBed.inject(AuthService);
    const spyCheckIfAuthenticated = spyOn(authService, 'checkIfAuthenticated').and.returnValue(Promise.resolve(false));
    const spyPurgeAuth = spyOn(authService, 'purgeAuth');
  
    await component.ngOnChanges();
  
    expect(spyCheckIfAuthenticated).toHaveBeenCalled();
    expect(spyPurgeAuth).toHaveBeenCalled();
  });

  it('getEachQuizStatus() should set eachQuizStatus to an array of strings', () => {
    component.readAllQuizData = '';
    component.getEachQuizStatus();
    expect(component.eachQuizStatus).toEqual([]);
  });

  it('setActiveSubPage() should set activeSubPage to index and requestedQuiz to index - 1', () => {
    component.setActiveSubPage(1);
    expect(component.activeSubPage).toEqual(1);
    expect(component.requestedQuiz).toEqual(0);
  });

  it('toggleMobileModeSetting() should set mobileMode to true if mobileMode is false', () => {
    component.mobileMode = false;
    component.toggleMobileModeSetting();
    expect(component.mobileMode).toBeTrue();
  });

  it('getSafeUrl() should return a safe url', () => {
    expect(component.getSafeUrl('https://www.youtube.com/embed/1')).toBeTruthy();
  });
});
