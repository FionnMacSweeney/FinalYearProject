import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructors: any[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.dataService.getConstructors().subscribe(data => {
      this.constructors = data;
    });
  }

  onTeamSelect(teamId: string) {
    this.router.navigate(['/drivers'], { queryParams: { teamId: teamId } });
  }

  // ... other methods
}
