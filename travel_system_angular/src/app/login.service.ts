import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn = false;

 

  constructor(private client:HttpClient) { }
  sayHello()
{
  console.log("from commonservice class method")
}

login(authen:AuthRequest){
  console.log("inside common service login",authen)
  return this.client.post("http://localhost:9091/auth/authenticate",authen,{ responseType: 'text' })
}

}
export class AuthRequest{
  username!: string; 
  password!: string;
}




