import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Review, ReviewService } from '../review.service';


@Component({
  selector: 'reviews',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews: Review[];
  review: Review;
  reviewId: number;
  userId: number;
  packageId: number;
  rating: number;
  comment: string;

  error: any;
  
  submitReview(form: any) {
    if (form.valid) {
      console.log("Review Details:", this.review);
      this.myservice.addReview(form.value).subscribe(response => console.log(response));
      alert("Review submitted successfully!");
      localStorage.removeItem('JWT');
      this.router.navigate(['/landing']);
    } else {
      alert("Please fill out all required fields.");
    }
  }
  constructor(private myservice: ReviewService,private router:Router) {
    this.myservice.getAllReviews().subscribe(
      response => this.handleSuccessfulResponse(response)
      ,
      error => { this.error = error.message }
    );
  }
  handleSuccessfulResponse(response) {
    console.log(response)
    this.review = response;
  }

}






























