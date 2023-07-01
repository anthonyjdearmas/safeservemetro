import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ContactusService } from "../services/contactus.service";
import { SeoHandlerService } from 'src/app/services/seo-handler.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactUsForm: FormGroup;

  showErrors: boolean = false;
  showSucess: boolean = false;

  constructor(
    private contactUsService: ContactusService,
    private seoHandlerService: SeoHandlerService
  ) { }

  ngOnInit(): void {
    this.seoHandlerService.setBrowserTitle('SafeServe Metro Contact Us Support');
    this.seoHandlerService.setMetaDescription('Contact us for more information about our food safety training courses.');
    this.seoHandlerService.setKeywords([
      'contact us',
      'contact us for more information',
      'contact us for more information about our food safety training courses',
      'contact us for more information about our food safety training courses pa',
      'contact us for more information about our food safety training courses nj',
      'contact us for more information about our food safety training courses ny',
      'contact us for more information about our food safety training courses pennsylvania',
      'contact us for more information about our food safety training courses new jersey',
      'contact us for more information about our food safety training courses new york',
      'help me',
      'help me with my food safety training',
      'help me with my food safety training pa',
      'help me with my food safety training nj',
      'help me with my food safety training ny',
      'help me with my food safety training pennsylvania',
      'help me with my food safety training new jersey',
      'help me with my food safety training new york',
      'course support',
      'question about my course',
      'support with my course',
      'online course support',
    ]);
    this.seoHandlerService.setMetaRobots(0);

    this.contactUsForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      fullName: new FormControl("", [Validators.required, Validators.minLength(2)]),
      emailAddress: new FormControl("", [Validators.required, Validators.email]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern("^(\\d{3}[-]?){1,2}(\\d{4})$")]),
      message: new FormControl("", [Validators.required, Validators.minLength(5)]),
      sendCopy: new FormControl()
    });
  }

  checkClientSideValidation(): [boolean, string[]] {
    let fieldStatuses = {
      fullName: this.contactUsForm.controls['fullName'].status,
      emailAddress: this.contactUsForm.controls['emailAddress'].status,
      phoneNumber: this.contactUsForm.controls['phoneNumber'].status,
      message: this.contactUsForm.controls['message'].status,
    };

    let allFieldsValid = !(Object.values(fieldStatuses).indexOf('INVALID') > -1)
    let invalidFields: string[] = [];
    for (const [fieldName, fieldStatus] of Object.entries(fieldStatuses)) {
      if (fieldStatus == "INVALID") {
        invalidFields.push(fieldName);
      }
    }

    return [allFieldsValid, invalidFields];
  }

  submitForm(): void {
    if (this.checkClientSideValidation()[0]) {
      this.contactUsService.submitContactUsForm(this.contactUsForm.value).subscribe((msg) => console.log(msg));
      this.contactUsForm.reset();
      this.showErrors = false;
      this.showSucess = true;
    } else {
      this.showErrors = true;
      this.showSucess = false;
    }
  }
}
