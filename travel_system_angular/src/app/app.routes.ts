import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AvailablePackagesComponent } from './available-packages/available-packages.component';
import { BookingComponent } from './booking/booking.component';
import { DetailsOfPackagesComponent } from './details-of-packages/details-of-packages.component';
import { HomeComponent } from './home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { LandingComponent } from './landing/landing.component';
// import { AddpackageComponent } from './addpackage/addpackage.component';

export const routes: Routes = [
    {path:"login",component:LoginComponent},
    {path:"registration",component:RegistrationComponent},
    {path:"available-packages",component:AvailablePackagesComponent},
    {path:"booking",component:BookingComponent},
    {path:"details-of-packages",component:DetailsOfPackagesComponent},
    {path:"home",component:HomeComponent},
    {path:"payment",component:PaymentComponent},
    {path:"reviews",component:ReviewsComponent},
    {path:"landing",component:LandingComponent},
    {path:"",component:LandingComponent},
    // {path:"addpackage",component:AddpackageComponent},
    {path:"details-of-packages",component:DetailsOfPackagesComponent}
];
