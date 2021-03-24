import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerFormPage } from './customer-form.page';

describe('CustomerFormPage', () => {
  let component: CustomerFormPage;
  let fixture: ComponentFixture<CustomerFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
