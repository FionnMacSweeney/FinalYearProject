import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridPlaceSelectionPage } from './grid-place-selection.page';

describe('GridPlaceSelectionPage', () => {
  let component: GridPlaceSelectionPage;
  let fixture: ComponentFixture<GridPlaceSelectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GridPlaceSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
