import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralLoanviewPage } from './general-loanview.page';

describe('GeneralLoanviewPage', () => {
  let component: GeneralLoanviewPage;
  let fixture: ComponentFixture<GeneralLoanviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralLoanviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralLoanviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
