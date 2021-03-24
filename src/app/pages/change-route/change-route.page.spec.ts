import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeRoutePage } from './change-route.page';

describe('ChangeRoutePage', () => {
  let component: ChangeRoutePage;
  let fixture: ComponentFixture<ChangeRoutePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRoutePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeRoutePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
