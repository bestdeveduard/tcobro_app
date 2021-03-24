import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerReportPage } from './customer-report.page';

describe('CustomerReportPage', () => {
  let component: CustomerReportPage;
  let fixture: ComponentFixture<CustomerReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
