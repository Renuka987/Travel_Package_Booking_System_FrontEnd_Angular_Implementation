import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthRequest, RegistrationService } from '../registration.service';
@Component({
  selector: 'registration',
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  showPassword: boolean = false;
  name:string;
  authen:AuthRequest
  email:string;
  password:string;
  roles:string;
  registrationForm: FormGroup;
  
  constructor(private fb: FormBuilder,private authService:RegistrationService,private router:Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contactNumber: ['', Validators.required],
      roles:['Customer',Validators.required]
    });
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value.email)
      console.log('Form Submitted!', this.registrationForm.value);
      console.log("BEFORE...."+this.registrationForm.value)
      this.authService.registration(this.registrationForm.value).subscribe(response=>{
        console.log(response)
        alert('Registration successful!');
        this.router.navigate(['/login'])
      }
      )
  }
  }

     
    
  

  onReset() {
    this.registrationForm.reset();
  }

  validate(form: any) {
    
    this.authen.name=form.value.name;
    this.authen.email=form.value.email;
    this.authen.password=form.value.password;
    this.authen.roles=form.value.roles;
    
    this.authService.registration(this.authen).subscribe(response=>{
       
       
        console.log(response)
        alert('Registration successful!');
        this.router.navigate(['/login'])
      }
    );
  }




}

