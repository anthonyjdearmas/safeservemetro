import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollhereComponent } from './enrollhere.component';

describe('EnrollhereComponent', () => {
  let component: EnrollhereComponent;
  let fixture: ComponentFixture<EnrollhereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollhereComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setSelectedPackage() sets the selected package', () => {
    let mockPackage = {
      pkgName: 'testpkg',
      abtInfo: 'testpkg',
      includedFeatures: ['something'],
      singlePrice: '$1',
      multiplePrice: '$2',
      multiplePpl: false,
      packageCheckoutSingleURL: 'url',
      packageCheckoutMultipleURL: 'url',
      packageEnrollHereIcon: "some pic from assets folder"
    };

    component.setSelectedPackage(mockPackage);
    expect(component.selectedPackage).toBe(mockPackage);
  });
});
