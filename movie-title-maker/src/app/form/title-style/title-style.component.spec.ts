import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleStyleComponent } from './title-style.component';

describe('TitleStyleComponent', () => {
  let component: TitleStyleComponent;
  let fixture: ComponentFixture<TitleStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TitleStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
