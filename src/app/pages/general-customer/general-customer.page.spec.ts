import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GeneralCustomerPage } from './general-customer.page';

describe('GeneralCustomerPage', () => {
  let component: GeneralCustomerPage;
  let fixture: ComponentFixture<GeneralCustomerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralCustomerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
