import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanReportPage } from './loan-report.page';

describe('LoanReportPage', () => {
  let component: LoanReportPage;
  let fixture: ComponentFixture<LoanReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
