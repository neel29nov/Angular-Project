import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { apiUrl } from '../shared/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  Login(data){
    return this.httpClient.post<any>(apiUrl.userLogin, data);
  }
  Signup(data){
    return this.httpClient.post<any>(apiUrl.signupUrl, data);
  }
}
