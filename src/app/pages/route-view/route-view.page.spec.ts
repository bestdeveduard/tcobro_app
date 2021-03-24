import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteViewPage } from './route-view.page';

describe('RouteViewPage', () => {
  let component: RouteViewPage;
  let fixture: ComponentFixture<RouteViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
