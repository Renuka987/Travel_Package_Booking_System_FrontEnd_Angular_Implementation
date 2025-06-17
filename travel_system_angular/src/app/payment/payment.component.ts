import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PaymentService } from '../payment.service'; // Ensure this exists
import { BookingService } from '../booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
declare var Razorpay: any; // ✅ Declare Razorpay globally
 
@Component({
  selector: 'payment',
  imports: [FormsModule,RouterLink,CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentSuccess: boolean = false; // ✅ Initialize
  loading: boolean = false;
  error: string | null = null;

  userId: number = parseInt(localStorage.getItem("userId") || '0');
  bookingId: number = parseInt(localStorage.getItem("bookingId") || '0');
  amount: number = 23240;
  paymentMethod: string ;
 
 
  constructor(private router: Router, private paymentService: PaymentService, private bookingService: BookingService) {}
 
  ngOnInit(): void {
    this.loadRazorpayScript();
    this.fetchPackagePrice();
  }
 
  loadRazorpayScript() {
    if (typeof Razorpay === "undefined") {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
      };
      document.body.appendChild(script);
    }
  }
 
  fetchPackagePrice() {
    const storedPrice = localStorage.getItem("packagePrice");
    const storedBookingId = localStorage.getItem("bookingId");
   
  if (storedPrice) {
    this.amount = parseFloat(storedPrice);
  } else {
   // console.error("Error: Package price not found in localStorage.");
  }
 
 if (storedBookingId && !isNaN(Number(storedBookingId))) {
    this.bookingId = parseInt(storedBookingId, 10);
  }  else {
   // console.error("Error: Booking ID not found in localStorage.");
  }
}
 
  initiatePayment() {
 
    console.log("Initiating payment...");
 
    if (this.amount <= 0) {
      alert("Invalid payment amount! Please select a valid package.");
      return;
    }
    console.log("Initiating payment...");
    console.log(" Checking Razorpay API Key:", 'rzp_test_mMYCMsqoLV36CI');
    console.log(" Checking Amount:", this.amount);
    const options = {
      key: 'rzp_test_mMYCMsqoLV36CI',
      amount: this.amount * 100,
      currency: 'INR',
      name: 'EasyPayments',
      description: 'Payment Processing...',
      //image: 'pic2.jpg',
      handler: (response: any) => {
        console.log('Payment successful', response);
        this.processPayment(response.razorpay_payment_id);
      },
      prefill: {
        name: 'UserName',
        email: 'user@gmail.com',
        contact: '9010742544'
      },
      theme: {
        color: '#f0ad4e'
      }
    };
    try {
      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      this.error = "Failed to initialize payment gateway";
      console.error('Razorpay initialization error:', error);
    }
  }
 
   
 
 
  processPayment(transactionId: string) {
  const paymentData = {
    id: 0, // Provide a default or generated ID
    method: this.paymentMethod || "defaultMethod", // Ensure a valid method is set
    userId: this.userId,
    bookingId: this.bookingId,
    amount: this.amount,
    status: "PAID",
    paymentMethod: this.paymentMethod,
  };
 
    console.log("Processing payment with data:", paymentData);
 
    // Save payment details first
    this.paymentService.savePayment(paymentData).subscribe({
      next: (response) => {
        console.log("Payment recorded:", response);
       
       
        alert("Payment Successful! Booking Confirmed.");
        //this.router.navigate(['/booking-confirmation']);
        this.router.navigate(['/reviews']);
      },
      error: (err) => {
        console.error("Error saving payment:", err);
        alert("Payment was successful, Redirecting you to the reviews......");
        this.router.navigate(['/reviews']);

        
      }
    });
  }
}
