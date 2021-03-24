import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddCommentPage } from './add-comment.page';

describe('AddCommentPage', () => {
  let component: AddCommentPage;
  let fixture: ComponentFixture<AddCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
