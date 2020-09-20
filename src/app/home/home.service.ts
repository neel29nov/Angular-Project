import { Injectable } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import { apiUrl } from '../shared/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  getModule(data){
    return this.httpClient.post<any>(apiUrl.getModuleUrl, data);
  }
}
