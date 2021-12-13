import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTuitionComponent } from './student-tuition.component';

describe('StudentTuitionComponent', () => {
  let component: StudentTuitionComponent;
  let fixture: ComponentFixture<StudentTuitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTuitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTuitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
