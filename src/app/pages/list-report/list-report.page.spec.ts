import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListReportPage } from './list-report.page';

describe('ListReportPage', () => {
  let component: ListReportPage;
  let fixture: ComponentFixture<ListReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListReportPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
