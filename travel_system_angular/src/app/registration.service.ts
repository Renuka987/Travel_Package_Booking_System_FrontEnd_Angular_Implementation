import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

constructor(private client:HttpClient) { }
sayHello()
{
console.log("from commonservice class method")
}

registration(authen:AuthRequest){
console.log("Register")
console.log("inside common service registration",authen)
let authen1:any=null

this.client.post("http://localhost:9091/auth/new",authen).subscribe(response=>{authen1=response
  localStorage.removeItem("userId")
  console.log("Response from backend",authen1)
 console.log("Response from backend",authen1.id)
  localStorage.setItem("userId",authen1.id)
  console.log(localStorage.getItem("userId"))
  console.log("Local storage:"+localStorage.getItem("userId"))
authen.userId=parseInt(localStorage.getItem("userId"))
console.log("after setting userId",authen.userId)

})
authen.userId=parseInt(localStorage.getItem("userId"))
return this.client.post("http://localhost:1111/userandrolesmanagement/saveuserandrolemanagement",authen,{ responseType: 'text' })


}}

  
export class AuthRequest{
userId:number;
name: string; 
email:string;
password: string;
roles:string;
contactNumber:number;
constructor(userId:number,name:string,email:string,password:string,roles:string,contactNumber:number)
{
  this.userId=userId;
  this.name=name;
  this.email=email;
  this.password=password;
  this.roles=roles;
  this.contactNumber=contactNumber;
}
}