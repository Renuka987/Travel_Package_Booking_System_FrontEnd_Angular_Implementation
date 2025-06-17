import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvailablePackagesService, TravelPackage } from '../available-packages.service';

@Component({
  selector: 'available-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './available-packages.component.html',
  styleUrls: ['./available-packages.component.css']
})
export class AvailablePackagesComponent implements OnInit {
  packages: TravelPackage[] = [];
  selectedPackage: any = null;
  originalPackage: any = null;

  constructor(private packageService: AvailablePackagesService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getAllPackages().subscribe({
      next: (data) => {
        this.packages = Array.isArray(data) ? data : [];
      },
      error: (error) => {
        console.error('Error loading packages:', error);
      }
    });
  }

  openEditModal(selectedPkg: any): void {
    this.selectedPackage = { ...selectedPkg }; // Create a copy
    this.originalPackage = selectedPkg; // Store reference to original
  }

  closeModal(): void {
    this.selectedPackage = null;
    this.originalPackage = null;
  }

  saveChanges(): void {
    if (!this.selectedPackage) return;

    this.packageService.updatePackage(this.selectedPackage).subscribe({
      next: (response) => {
        // Update the original package with new values
        Object.assign(this.originalPackage, this.selectedPackage);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error updating package:', error);
      }
    });
  }
  delete(packageId): void {
    if (!this.selectedPackage) return;

    this.packageService.deletePackage(packageId).subscribe({
      next: (response) => {
        // delete the original package 
        Object.assign(this.originalPackage, this.selectedPackage);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error deleting package:', error);
      }
    });
  }
}









