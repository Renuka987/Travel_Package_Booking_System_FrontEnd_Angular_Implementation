import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'travel_system_angular';
  isLoggedIn=false;
  
  logout()
  {
    this.isLoggedIn=true;
    localStorage.removeItem("JWT")
    localStorage.removeItem("userId")
    alert("Logged Out Successfully")

}

}




