import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaceResultsPage } from './race-results.page';

describe('RaceResultsPage', () => {
  let component: RaceResultsPage;
  let fixture: ComponentFixture<RaceResultsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RaceResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
