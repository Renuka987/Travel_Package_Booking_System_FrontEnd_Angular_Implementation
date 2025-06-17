import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  updateReview: any={};
  constructor(private client: HttpClient) { }
  public getAllReviews() {
        console.log("ins service get Reviews");//headers
        return this.client.get<Review>("http://localhost:5555/reviewsandratings/getAllUsers");
      }
     
        public addReview(addReview: Review): Observable<string> {
            console.log("Inside service add");
            console.log(addReview);
            return this.client.post("http://localhost:5555/reviewsandratings/save", addReview, { responseType: 'text' });
          }
        
    
      public update(updateReview: Review) {
        this.updateReview = updateReview;
      }
      public updateMethod() {
        return this.updateReview;
      }
      public onUpdate(updateReview: Review) {
        console.log("ins service update");
        return this.client.put("http://localhost:5555/reviewsandratings/update", updateReview);
      }
      deleteReview(id: number) {
        console.log("ins service delete");
        return this.client.delete("http://localhost:5555/reviewsandratings/remove/1" + id,{ responseType: 'text' });
      }
  
      getReview(id:number) {
        console.log("ins service method get package by id");
        return this.client.get<Review>("http://localhost:5555/reviewsandratings/getUser/1" + id );
    }

}






export class Review{
  reviewId:number
  userId:number
  packageId:number
  rating:number
  comment:string
  constructor(reviewId:number,userId:number,packageId:number,rating:number,comment:string) {
    this.reviewId=reviewId
    this.userId=userId
    this.packageId=packageId
    this.rating=rating
    this.comment=comment
  }

}


























// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class ReviewService {
//   private baseUrl = 'http://localhost:5555/reviews';

//   constructor(private http: HttpClient) { }

//   getReview(id: number): Observable<any> {
//     return this.http.get(`${this.baseUrl}/${id}`);
//   }

//   getAllReviews(): Observable<any[]> {
//     return this.http.get<any[]>(this.baseUrl);
//   }

//   submitReview(review: any): Observable<any> {
//     return this.http.post(this.baseUrl, review);
//   }
// }