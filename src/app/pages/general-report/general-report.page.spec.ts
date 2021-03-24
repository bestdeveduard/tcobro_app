import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralReportPage } from './general-report.page';

describe('GeneralReportPage', () => {
  let component: GeneralReportPage;
  let fixture: ComponentFixture<GeneralReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
