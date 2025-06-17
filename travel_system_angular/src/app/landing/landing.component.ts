import { Component,OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule } from '@angular/common';

@Component({
  selector: 'landing',
  imports: [RouterLink, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  emailAddress: string = 'info@travelease.com';
  constructor() {
    
  }
  services = [
    {
      icon: 'fa-plane',
      title: 'Flight Booking',
      description: 'Best deals on international flights',
      image: 'https://images.pexels.com/photos/379419/pexels-photo-379419.jpeg'
    },
    {
      icon: 'fa-hotel',
      title: 'Hotel Reservations',
      description: 'Luxury stays at best prices',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    },
    {
      icon: 'fa-map-marked-alt',
      title: 'Local Tours',
      description: 'Expert guided experiences',
      image: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg'
    }
];
  ngOnInit() {
   
  }
}






