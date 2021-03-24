import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenuViewPage } from './menu-view.page';

describe('MenuViewPage', () => {
  let component: MenuViewPage;
  let fixture: ComponentFixture<MenuViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
