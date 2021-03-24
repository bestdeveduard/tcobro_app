import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrintSettingPage } from './print-setting.page';

describe('PrintSettingPage', () => {
  let component: PrintSettingPage;
  let fixture: ComponentFixture<PrintSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrintSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
