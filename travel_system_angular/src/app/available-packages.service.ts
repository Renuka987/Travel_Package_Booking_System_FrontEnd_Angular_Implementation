import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailablePackagesService {
    updatePackage: any={};
    path = "http://localhost:2222/travelpackagemanagement/updatetravelpackagemanagement/users"
 
  
    constructor(private client: HttpClient) {
      // updatePackage: TravelPackage;
    }
    public getAllPackages() {
      console.log("ins service get Packages");//headers
      return this.client.get<TravelPackage>("http://localhost:2222/travelpackagemanagement/getAllPackages");
    }
   
      public addPackage(addPackage: TravelPackage): Observable<string> {
          console.log("Inside service add");
          console.log(addPackage);
          return this.client.post("http://localhost:2222/travelpackagemanagement/save", addPackage, { responseType: 'text' });
        }
      
  
    public update(updatePackage: TravelPackage) {
      this.updatePackage = updatePackage;
    }
    public updateMethod() {
      return this.updatePackage;
    }
    public onUpdate(updatePackage: TravelPackage) {
      console.log("ins service update");
      return this.client.put<TravelPackage>("http://localhost:2222/travelpackagemanagement/updatetravelpackagemanagement", updatePackage);
    }
    deletePackage(packageId:number) {
      console.log("ins service delete");
      return this.client.delete("http://localhost:2222/travelpackagemanagement/removetravelpackagemanagement/" + packageId,{ responseType: 'text' });
    }

    getPackage(id:number) {
      console.log("ins service method get package by id");
      return this.client.get<TravelPackage>("http://localhost:2222/travelpackagemanagement/gettravelpackagemanagement/1" + id );
  }

}

  export class TravelPackage {
    packageId: number;
    title: string;
    description: string;
    duration: number;
    price: number;
    includedServices: string;
    constructor(packageId: number,title: string,description: string,duration: number,price: number,includedServices: string)
    {
      this.packageId=packageId
      this.title=title
      this.description=description
      this.duration=duration
      this.price=price
      this.includedServices=includedServices
    }
    
  }

  









