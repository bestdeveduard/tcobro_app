import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrinterListPage } from './printer-list.page';

describe('PrinterListPage', () => {
  let component: PrinterListPage;
  let fixture: ComponentFixture<PrinterListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrinterListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrinterListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
