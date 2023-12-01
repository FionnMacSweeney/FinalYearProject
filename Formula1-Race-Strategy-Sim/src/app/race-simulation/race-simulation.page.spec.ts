import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RaceSimulationPage } from './race-simulation.page';

describe('RaceSimulationPage', () => {
  let component: RaceSimulationPage;
  let fixture: ComponentFixture<RaceSimulationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RaceSimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
