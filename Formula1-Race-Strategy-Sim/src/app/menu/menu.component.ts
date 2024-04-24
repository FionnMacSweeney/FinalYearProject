import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private router: Router) {}

  signOut() {
    // Clear user authentication details
    localStorage.removeItem('userToken');
    // Navigate to login or any appropriate route
    this.router.navigateByUrl('/login');
  }
}
