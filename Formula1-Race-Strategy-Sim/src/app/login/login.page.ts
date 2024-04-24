import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'

import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = ''; // Initialize with empty string
  password: string = ''; // Initialize with empty string

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  async login() {
    try {
      const result = await this.authService.login(this.email, this.password);
      console.log(result);
      // Navigate to the menu page after successful login
      this.router.navigateByUrl('/menu');
    } catch (error) {
      console.error(error);
      // Show error message for invalid login details
      this.showToast('Invalid login credentials.');
    }
  }
  

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
} 

