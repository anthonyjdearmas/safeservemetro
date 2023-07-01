import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageInformation as siteconfig } from '../../../assets/tenant-info/packageinformation';



import { CoursefinderComponent } from './coursefinder.component';

describe('CoursefinderComponent', () => {
  let component: CoursefinderComponent;
  let fixture: ComponentFixture<CoursefinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursefinderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursefinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('beginQuestionaire() sets showQuestionaire to be true', () => {
    component.beginQuestionaire();
    expect(component.showQuestionaire).toBeTrue();
  });

  it('scrollToTop() scrolls to the top of the page', () => {
    component.scrollToTop();
    expect(document.body.scrollTop).toBeDefined();
  });

  it('forceOneCheckbox() sets the other checkbox to be false', () => {
    let yescheckbox = document.createElement('input');
    yescheckbox.id = 'yescheckbox';
    yescheckbox.checked = true;
    let nocheckbox = document.createElement('input');
    nocheckbox.id = 'nocheckbox';
    nocheckbox.checked = false;
    spyOn(document, 'getElementById').and.returnValues(yescheckbox, nocheckbox);
    component.forceOneCheckbox(yescheckbox);
    expect(nocheckbox.checked).toBeFalse();
  });

  it('resetCurrentQuestion() resets the current question', () => {
    component.yesResponse = true;
    component.noResponse = true;
    component.resetCurrentQuestion();
    expect(component.yesResponse).toBeFalse();
    expect(component.noResponse).toBeFalse();
  });

  it('resetEntireQuestionaire() resets the entire questionaire', () => {
    component.currQuestion = 1;
    component.yesResponse = true;
    component.noResponse = true;
    component.progress = 1;
    component.resetEntireQuestionaire();
    expect(component.currQuestion).toBe(0);
    expect(component.yesResponse).toBeFalse();
    expect(component.noResponse).toBeFalse();
    expect(component.progress).toBe(0);
  });

  it('updateProgressBar() updates the progress bar', () => {
    component.progress = 0;
    component.currQuestion = 0;
    component.userResponses = [false, false, false, false];
    component.updateProgressBar();
    expect(component.progress).toBe(0);
  });

  it('getCurrentCheckboxes() returns the current checkboxes', () => {
    let yescheckbox = document.createElement('input');
    yescheckbox.id = 'yescheckbox';
    yescheckbox.checked = true;
    let nocheckbox = document.createElement('input');
    nocheckbox.id = 'nocheckbox';
    nocheckbox.checked = false;
    spyOn(document, 'getElementById').and.returnValues(yescheckbox, nocheckbox);
    let checkboxes = component.getCurrentCheckboxes();
    expect(checkboxes[1]).toEqual(yescheckbox);
    expect(checkboxes[0]).toEqual(nocheckbox);
  });

  it('gotoQuestion() goes to the specified question', () => {
    component.currQuestion = 0;
    component.gotoQuestion(1);
    expect(component.currQuestion).toBe(1);
  });

  it('nextQuestion() goes to the next question', () => {
    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(2);

    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = false;
    component.noResponse = true;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = false;
    component.noResponse = true;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);
  });

  it('previousQuestion() goes to the previous question', () => {
    component.currQuestion = 0;
    component.previousQuestion();
    expect(component.currQuestion).toBe(0);

    component.currQuestion = 1;
    component.previousQuestion();
    expect(component.currQuestion).toBe(0);

    component.currQuestion = 2;
    component.previousQuestion();
    expect(component.currQuestion).toBe(1);
  });

  it('displayResults() displays the proper results', () => {
    component.userResponses = [false, true, true, true];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageBethlehem);

    component.userResponses = [true, true, true, true];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageBethlehem);

    component.userResponses = [true, true, true, false];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageBethlehem);

    component.userResponses = [false, true, false, true];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageYourLocation);

    component.userResponses = [false, true, false, false];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageYourLocation);

    component.userResponses = [false, false, false, false];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageExamOnly);

    component.userResponses = [true, false, false, false];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageExamOnly);

    component.userResponses = [false, false, false, true];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageExamOnly);

    component.userResponses = [false, false, true, false];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageExamOnly);

    component.userResponses = [false, false, true, true];
    component.displayResults();
    expect(component.selectedPackage).toEqual(siteconfig.packageExamOnly);
  });

  it('nextQuestion() goes to the next question', () => {
    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(2);

    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = false;
    component.noResponse = true;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = false;
    component.noResponse = true;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);

    component.yesResponse = true;
    component.noResponse = false;
    component.nextQuestion();
    expect(component.currQuestion).toBe(3);
  });

});
