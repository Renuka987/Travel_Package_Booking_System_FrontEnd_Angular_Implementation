
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

export interface BookingResponse {
  bookingId: string;
  status: string;
  message: string;
}

export interface Booking {
  id?: string;
  userId: string;
  packageId?: number;

  startDate: string;
  endDate: string;
  numberOfPeople: number;
  roomType: string;
  specialRequirements?: string;
  status: string;
  totalAmount: number;
  roomCharge: number;
  taxes: number;
  numberOfDays: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:3333/bookingprocess';

  constructor(private http: HttpClient) { }

  addBooking(bookingData: Booking): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');


      

    // Format dates to ISO string
    const formattedData = {
      ...bookingData,
      startDate: new Date(bookingData.startDate).toISOString(),
      endDate: new Date(bookingData.endDate).toISOString()
    };

    console.log('Sending booking data:', formattedData);

    return this.http.post<any>(`${this.baseUrl}/save`, formattedData, { headers })
      .pipe(
        tap(response => console.log('Booking response:', response)),
        retry(1),
        catchError(this.handleError)
      );
  }

  updateBooking(bookingId: string, status: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    
    return this.http.put(`${this.baseUrl}/update/${bookingId}`, { status }, { headers })
      .pipe(catchError(this.handleError));
  }

  getBooking(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/get/${bookingId}`)
      .pipe(catchError(this.handleError));
  }

  getUserBookings(userId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/getUser/${userId}/bookings`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    let errorMessage = 'Failed to create booking. Please try again.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.status === 0 ? 
        'Cannot connect to the server. Please check your connection.' : 
        `Server error: ${error.status}. ${error.error?.message || ''}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}