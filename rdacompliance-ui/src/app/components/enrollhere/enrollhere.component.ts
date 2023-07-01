import { Component, OnInit } from '@angular/core';
import { PackageInformation as currentPricingInfo } from '../../../assets/tenant-info/packageinformation';
import { SeoHandlerService } from 'src/app/services/seo-handler.service';


@Component({
  selector: 'app-enrollhere',
  templateUrl: './enrollhere.component.html',
  styleUrls: ['./enrollhere.component.css']
})
export class EnrollhereComponent implements OnInit {

  packages = [currentPricingInfo.packageBethlehem, currentPricingInfo.packageYourLocation, currentPricingInfo.packageExamOnly];

  selectedPackage = currentPricingInfo.packageBethlehem;


  setSelectedPackage(clickedPackage: any) {
    this.selectedPackage = clickedPackage;
  }


  constructor(private seoHandlerService: SeoHandlerService) { }

  ngOnInit(): void {
    this.seoHandlerService.setBrowserTitle('ServSafe Course Enrollment Packages');
    this.seoHandlerService.setMetaDescription('Choose from one of our three course enrollment packages to become ServSafe Food Safety Certified.');
    this.seoHandlerService.setKeywords([
      'enroll in a course',
      'enroll in a course online',
      'enroll in a course online pa',
      'enroll in a course online nj',
      'enroll in a course online ny',
      'food safety course enrollment',
      'Safe serve food safety certification course',
      'single course enrollment',
      'multiple course enrollment',
      'Travel to your location',
      'Travel to your location for course enrollment',
      'In-person course review',
      'Food Safety Manager Exam',
      'Proctoring and administration',
      'Online course',
      'enroll now',
      'become certified',
      'become certified in food safety',
      'become certified in food safety pa',
      'become certified in food safety nj',
      'become certified in food safety ny',
      'enroll my employees',
      'enroll my employees in a course',
      'enroll my employees in a course online',
      'certificate of completion',
      'certificate of enrollment',
      'certificate',
      'food safety certificate'
    ]);
    this.seoHandlerService.setMetaRobots(0);
  }

}
