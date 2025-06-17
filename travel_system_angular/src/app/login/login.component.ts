import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginService } from '../login.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'login',
  imports: [FormsModule,RouterOutlet,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
constructor(private authService:LoginService,private router:Router,userService:UserService)
{

}
 

validate(form: any) {
  console.log('Login attempt:', this.username, this.password);
  console.log('Login attempt:', this.username, this.password);
  
  this.authService.login(form.value).subscribe({
    next: (response) => {
      console.log("Response from backend:", response);
      localStorage.setItem("JWT", response);
      alert('Login successful!');
      this.router.navigate(['/home'])
    },
    error: (err) => {
     console.error("Login error:", err);
      alert('Invalid details');
    }
  });
}

}






