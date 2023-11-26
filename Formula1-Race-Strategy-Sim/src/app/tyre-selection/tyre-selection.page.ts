import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tyre-selection',
  templateUrl: './tyre-selection.page.html',
  styleUrls: ['./tyre-selection.page.scss'],
})
export class TyreSelectionPage implements OnInit {
  tyreCompounds = ['Soft', 'Medium', 'Hard', 'Intermediate', 'Wet'];

  constructor(private router: Router) {}

  ngOnInit() {}

  
  onTyreSelect(tyre: string) {
    console.log('Selected Tyre:', tyre);
    localStorage.setItem('selectedTyreCompound', tyre);
    this.router.navigate(['/grid-place-selection']);
  }

}

