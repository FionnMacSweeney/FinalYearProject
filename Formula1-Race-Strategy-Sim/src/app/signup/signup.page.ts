import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {
  }

  async signup() {
    try {
      const result = await this.authService.signUp(this.email, this.password);
      console.log(result);
      // Handle the result
      this.router.navigateByUrl('/login');
    } catch (error) {
      console.error(error);
      // Handle error
      this.showToast('Invalid details or error occurred.');
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


