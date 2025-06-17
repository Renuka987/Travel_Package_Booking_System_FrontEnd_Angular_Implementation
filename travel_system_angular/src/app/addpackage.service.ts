import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface TravelPackage {
  packageId: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  includedServices: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddpackageService {
  private baseUrl = 'http://localhost:2222/travelpackagemanagement';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  getAllPackages(): Observable<TravelPackage[]> {
    return this.http.get<TravelPackage[]>(`${this.baseUrl}/all`)
      .pipe(catchError(this.handleError));
  }

  addPackage(packageData: TravelPackage): Observable<any> {
    if (!this.isAdminOrAgent()) {
      return throwError(() => new Error('Access Denied'));
    }
    return this.http.post(`${this.baseUrl}/save`, packageData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updatePackage(packageData: TravelPackage): Observable<any> {
    if (!this.isAdminOrAgent()) {
      return throwError(() => new Error('Access Denied'));
    }
    return this.http.put(`${this.baseUrl}/update/${packageData.packageId}`, packageData, 
      { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  deletePackage(packageId: number): Observable<any> {
    if (!this.isAdminOrAgent()) {
      return throwError(() => new Error('Access Denied'));
    }
    return this.http.delete(`${this.baseUrl}/delete/${packageId}`, 
      { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserRole(): string {
    return localStorage.getItem('userRole') || '';
  }

  isAdminOrAgent(): boolean {
    const role = this.getUserRole();
    return role === 'admin' || role === 'travel agent';
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}