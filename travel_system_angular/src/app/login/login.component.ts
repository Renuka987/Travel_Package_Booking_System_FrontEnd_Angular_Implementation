import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'login',
  imports: [FormsModule,RouterOutlet,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  onSubmit() {
    console.log('Login attempt:', this.username, this.password);
    // You can add authentication logic here
  }

  validate(form: any) {
    if (form.valid) {
      alert('Login successful!');
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
