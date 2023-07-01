import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactusComponent } from './contactus.component';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';

describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        ContactusComponent
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('contact us form group is created and seohandler is set properly ngOnInit()', () => {
    const seoHandlerService = TestBed.inject(SeoHandlerService);

    spyOn(seoHandlerService, 'setBrowserTitle');
    spyOn(seoHandlerService, 'setMetaDescription');
    spyOn(seoHandlerService, 'setKeywords');
    spyOn(seoHandlerService, 'setMetaRobots');
    
    component.ngOnInit();

    expect(component.contactUsForm).toBeTruthy();
    expect(component.contactUsForm.controls).toBeTruthy();
    expect(component.contactUsForm.controls).toHaveSize(5);

    expect(seoHandlerService.setBrowserTitle).toHaveBeenCalledWith(
      'SafeServe Metro Contact Us Support'
    );
    expect(seoHandlerService.setMetaDescription).toHaveBeenCalledWith(
      'Contact us for more information about our food safety training courses.'
    );
    expect(seoHandlerService.setKeywords).toHaveBeenCalled();
    expect((seoHandlerService.setKeywords as jasmine.Spy).calls.argsFor(0)[0].length).toBe(21);
    expect(seoHandlerService.setMetaRobots).toHaveBeenCalledWith(0);
  });

  it('checkClientSideValidation() returns true when all fields are valid', () => {
    component.contactUsForm.controls['fullName'].setValue('John Doe');
    component.contactUsForm.controls['emailAddress'].setValue('test@mail.com');
    component.contactUsForm.controls['phoneNumber'].setValue('123-456-7890');
    component.contactUsForm.controls['message'].setValue('This is a test message');
    component.contactUsForm.controls['sendCopy'].setValue(true);
    expect(component.checkClientSideValidation()[0]).toEqual(true);
    expect(component.checkClientSideValidation()[1]).toEqual([]);


    component.contactUsForm.controls['message'].setValue('');
    expect(component.checkClientSideValidation()[0]).toEqual(false);
    expect(component.checkClientSideValidation()[1]).toEqual(['message']);
  });

  it('submitForm() calls contactUsService.submitContactUsForm() when all fields are valid', () => {
    component.submitForm();
    expect(component.showErrors).toEqual(true);
    expect(component.showSucess).toEqual(false);
  });
});
