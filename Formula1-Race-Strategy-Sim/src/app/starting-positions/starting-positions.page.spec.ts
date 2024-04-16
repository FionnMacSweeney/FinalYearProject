import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartingPositionsPage } from './starting-positions.page';

describe('StartingPositionsPage', () => {
  let component: StartingPositionsPage;
  let fixture: ComponentFixture<StartingPositionsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StartingPositionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
