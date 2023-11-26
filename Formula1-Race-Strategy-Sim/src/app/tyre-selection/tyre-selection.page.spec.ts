import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TyreSelectionPage } from './tyre-selection.page';

describe('TyreSelectionPage', () => {
  let component: TyreSelectionPage;
  let fixture: ComponentFixture<TyreSelectionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TyreSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
