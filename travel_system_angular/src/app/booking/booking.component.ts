import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class BookingComponent implements OnInit {
  selectedPackageId: number ;
  selectedPackageDetails: any ;
  bookingForm: FormGroup;
  loading = false;
  error = '';
  success: string = '';
  today = new Date().toISOString().split('T')[0];

  private roomCharges = {
    'SINGLE': 2000,
    'DOUBLE': 3500,
    'SUITE': 5000,
    'FAMILY': 6500
  };

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.initializeForm();
  }
  isFormValid(): boolean {
    // Check if form is valid and not null/undefined
    if (!this.bookingForm) return false;
    
    return (
        this.bookingForm.valid &&
        this.bookingForm.get('startDate')?.value &&
        this.bookingForm.get('endDate')?.value &&
        this.bookingForm.get('numberOfPeople')?.value > 0 &&
        this.bookingForm.get('roomType')?.value &&
        this.bookingForm.get('termsAccepted')?.value === true &&
        !this.loading
    );
}
 

  ngOnInit() {
     // Ensure background image loads
     const img = new Image();
     img.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';
     // Get package ID from route parameters
      this.route.queryParams.subscribe(params => {
        if (params['packageId']) {
          this.selectedPackageId = parseInt(params['packageId'], 10);
          this.loadPackageDetails(this.selectedPackageId);
        }
      });
    }
  
    private loadPackageDetails(packageId: number): void {
      // Mock implementation for loading package details
      this.selectedPackageDetails = {
        id: packageId,
        name: 'Sample Package',
        description: 'This is a sample package description.',
        price: 10000
      };
    }    
 

  private initializeForm() {
    this.bookingForm = this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      numberOfPeople: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
      roomType: ['', [Validators.required]],
      specialRequirements: [''],
      termsAccepted: [false, [Validators.requiredTrue]]
    });
  }

  


  onDateChange() {
    const startDate = this.bookingForm.get('startDate')?.value;
    const endDate = this.bookingForm.get('endDate')?.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end <= start) {
        this.bookingForm.get('endDate')?.setErrors({ invalidDate: true });
      }
    }
  }

  calculateDays(): number {
    const startDate = new Date(this.bookingForm.get('startDate')?.value);
    const endDate = new Date(this.bookingForm.get('endDate')?.value);
    
    if (!startDate || !endDate) return 0;
    
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  calculateRoomCharge(): number {
    const roomType = this.bookingForm.get('roomType')?.value;
    const days = this.calculateDays();
    return (this.roomCharges[roomType] || 0) * days;
  }

  calculateTaxes(): number {
    return Math.round(this.calculateRoomCharge() * 0.18);
  }

  calculateTotalAmount(): number {
    const baseAmount = this.calculateRoomCharge() + this.calculateTaxes();
    const packagePrice = this.selectedPackageDetails?.price || 0;
    return baseAmount + (packagePrice * this.bookingForm.get('numberOfPeople')?.value || 0);
    return this.calculateRoomCharge() + this.calculateTaxes();
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';
      console.log('Booking Created Sucessfully!');
      alert('Booking Created Sucessfully!....');
      this.router.navigate(['/payment'])
    // Get userId from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        this.error = 'Please login to make a booking';
        this.loading = false;
        return;
      }
  

      
      
      const bookingData = {
        ...this.bookingForm.value,
        userId: localStorage.getItem('userId') || '1',
        startDate: this.bookingForm.get('startDate').value,
        endDate: this.bookingForm.get('endDate').value,
        numberOfPeople: this.bookingForm.get('numberOfPeople').value,
        roomType: this.bookingForm.get('roomType').value,
        specialRequirements: this.bookingForm.get('specialRequirements').value,
        status: 'Confirmed',
        totalAmount: this.calculateTotalAmount(),
        roomCharge: this.calculateRoomCharge(),
        taxes: this.calculateTaxes(),
        numberOfDays: this.calculateDays(),
        bookingDate: new Date().toISOString()

      };
      console.log('Booking Created Sucessfully!');
      alert('Booking Created Sucessfully!....');
      this.router.navigate(['/payment'])


      console.log('Submitting booking data:', bookingData); // Debug log


      this.bookingService.addBooking(bookingData).subscribe({
        next: (response) => {
          console.log('Booking response:', response); // Debug log

          this.success = 'Booking created successfully!';
          localStorage.setItem('bookingId', response.bookingId);
          this.loading = false;
           // Store booking details
        localStorage.setItem('currentBooking', JSON.stringify({
          bookingId: response.bookingId,
          packageId: this.selectedPackageId,
          amount: this.calculateTotalAmount(),
          userId: userId
        }));

          setTimeout(() => {
            this.router.navigate(['/payment'], {
              queryParams: { 
                amount: this.calculateTotalAmount(),
                bookingId: response.bookingId
              }
            });
          }, 1500);
        },
        error: (error) => {
          this.error = 'Failed to create booking. Please try again.';
          this.loading = false;
          console.error('Booking error:', error);
        }
      });
    } else {
 // Mark all fields as touched to trigger validation messages
 Object.keys(this.bookingForm.controls).forEach(key => {
  const control = this.bookingForm.get(key);
  control.markAsTouched();
});
}    }

// Add this method to your BookingComponent class

private validateBooking(): boolean {
  if (!localStorage.getItem('userId')) {
    this.error = 'Please login to make a booking';
    return false;
  }

  const startDate = new Date(this.bookingForm.get('startDate')?.value);
  const endDate = new Date(this.bookingForm.get('endDate')?.value);
  const today = new Date();

  if (startDate < today) {
    this.error = 'Start date cannot be in the past';
    return false;
  }

  if (endDate <= startDate) {
    this.error = 'End date must be after start date';
    return false;
  }

  if (this.calculateTotalAmount() <= 0) {
    this.error = 'Invalid booking amount';
    return false;
  }

  return true;
}
  }

 
