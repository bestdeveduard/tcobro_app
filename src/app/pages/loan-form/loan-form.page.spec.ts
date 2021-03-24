import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoanFormPage } from './loan-form.page';

describe('LoanFormPage', () => {
  let component: LoanFormPage;
  let fixture: ComponentFixture<LoanFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoanFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
