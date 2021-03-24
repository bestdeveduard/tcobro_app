import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaymentFormPage } from './payment-form.page';

describe('PaymentFormPage', () => {
  let component: PaymentFormPage;
  let fixture: ComponentFixture<PaymentFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
