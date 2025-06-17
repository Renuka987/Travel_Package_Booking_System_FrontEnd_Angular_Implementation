






















































import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface Payment {
  paymentId?: number;
  userId: number;
  amount: number;
  method: string;
  bookingId: number;
  paymentMethod: string;

}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = "http://localhost:4444/paymentprocess";

  constructor(private http: HttpClient) { }

  savePayment(paymentData: Payment): Observable<Payment> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<Payment>(`${this.baseUrl}/save`, paymentData, { headers }).pipe(
      tap(response => console.log('Payment saved:', response)),
      catchError(this.handleError)
    );
  }

  getPaymentByBookingId(bookingId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/getpayment/1/${bookingId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while processing the payment.';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid payment data provided.';
          break;
        case 404:
          errorMessage = 'Payment service not found.';
          break;
        case 500:
          errorMessage = 'Internal server error occurred.';
          break;
      }
    }

    return throwError(() => errorMessage);
  }
}
