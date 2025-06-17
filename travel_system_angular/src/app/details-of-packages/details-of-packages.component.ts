import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvailablePackagesService, TravelPackage } from '../available-packages.service';


interface Package {
  packageId?: number;
  title: string;
  description: string;
  duration: number;
  price: number;
  includedServices: string;
}
@Component({
  selector: 'details-of-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './details-of-packages.component.html',
  styleUrls: ['./details-of-packages.component.css']
})
export class DetailsOfPackagesComponent implements OnInit {
  packages: any[] = [];
  selectedPackage: TravelPackage= {
    packageId:null ,
    description: '',
    price: 0,
    duration: 0,
    title: '',
    includedServices: '',
  };
  originalPackage: any = null;
  isAdmin: boolean = false;
  error: string = '';
  success: string = '';
  isModalOpen = false;

  // Add the newPackage property
  newPackage: TravelPackage = {
    packageId: 0, // Default value, update as needed
    title: '',
    description: '',
    duration: 1,
    price: 0,
    includedServices: ''
  };

  openModal() {
    this.isModalOpen = true;
  }
  

  closeModal1() {
    this.isModalOpen = false;
  }
  constructor(private packageService: AvailablePackagesService) {
    this.isAdmin = localStorage.getItem('userRole') === 'admin';
  }
  closeModal(): void {
    this.selectedPackage = null;
    this.error = '';
    this.success = '';
  }
  

  openEditModal(pkg: any): void {
    this.selectedPackage = { ...pkg };
  }




  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getAllPackages().subscribe({
      next: (data) => {
        this.packages = Array.isArray(data) ? data.map(pkg => ({...pkg, isEditing: false})) : [];
      },
      error: (err) => {
        this.error = 'Failed to load packages';
        console.error(err);
      }
    });
  }
  // addPackage(): void {
  //   alert("addPackage called");
  //   console.log('Adding package:', this.newPackage);


  //   if (!this.isAdmin) {
  //     this.error = 'Unauthorized action';
  //     return;
  //   }

  //   this.packageService.addPackage(this.newPackage).subscribe({
  //     next: (response) => {
  //       alert("Package added successfully");
  //       console.log('Package added:', response);
  //       this.success = 'Package added successfully';
  //       this.loadPackages();
  //       this.resetNewPackageForm();
  //       // Close modal using Bootstrap
  //       const modalElement = document.getElementById('addPackageModal');
  //       // Ensure Bootstrap's JavaScript module is imported
  //       const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
  //       modal?.hide();
  //     },
  //     error: (err) => {
  //       this.error = 'Failed to add package';
  //       console.error(err);
  //     }
  //   });
  // }
  resetNewPackageForm(): void {
    this.newPackage = {
      packageId: 0, // Default value for packageId
      title: '',
      description: '',
      duration: 1,
      price: 0,
      includedServices: ''
    };
  }
  saveChanges(): void {
   
    alert("saveChanges called")
    alert("selectedPackage: "+this.selectedPackage)
    console.log("selectedPackage: ",this.selectedPackage)

    this.packageService.onUpdate(this.selectedPackage).subscribe({
      next: (response) => {console.log(response)
       
      },
      error: (err) => {
        this.error = 'Failed to update package';
        console.error('Update error:', err);
      }
    });
  }
  // Removed duplicate implementation of addNewPackage















  delete (packageId:number):void{
    alert("Deleted the changes called")
    alert("selectedPackage: "+this.selectedPackage)
    console.log("selectedPackage: ",this.selectedPackage)

    this.packageService.deletePackage(packageId).subscribe({
      next: (response) => {console.log(response)
      },
      error: (err) => {
        this.error = 'Failed to delete package';
        console.error('delete error:', err);
      }
    });
  }
  

  toggleEdit(pkg: any): void {
    pkg.isEditing = true;
    pkg.backup = {...pkg}; // Backup for cancel
  }

  cancelEdit(pkg: any): void {
    Object.assign(pkg, pkg.backup);
    pkg.isEditing = false;
    delete pkg.backup;
  }

  updatePackage(pkg: any): void {
    if (!this.isAdmin) {
      this.error = 'Unauthorized action';
      return;
    }

    this.packageService.updatePackage(pkg).subscribe({
      next: () => {
        pkg.isEditing = false;
        delete pkg.backup;
        this.success = 'Package updated successfully';
        setTimeout(() => this.success = '', 3000);
      },
      error: (err) => {
        this.error = 'Failed to update package';
        console.error(err);
      }
    });
  }
}