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
  createModule(data){
    return this.httpClient.post<any>(apiUrl.createModuleUrl, data);
  }
  updateModule(data){
    return this.httpClient.post<any>(apiUrl.updateModuleUrl, data);
  }
  deleteModule(data){
    return this.httpClient.post<any>(apiUrl.deleteModuleUrl, data);
  }
  getCategory(data){
    return this.httpClient.post<any>(apiUrl.getCategoryUrl, data);
  }
  getSubCategory(data){
    return this.httpClient.post<any>(apiUrl.getSubCategoryUrl, data);
  }
  createCategory(data){
    return this.httpClient.post<any>(apiUrl.createCategoryUrl, data);
  }
  createSubCategory(data){
    return this.httpClient.post<any>(apiUrl.createSubCategoryUrl, data);
  }
  editCategory(data){
    return this.httpClient.post<any>(apiUrl.editCategoryUrl, data);
  }
  editSubCategory(data){
    return this.httpClient.post<any>(apiUrl.editSubCategoryUrl, data);
  }
  deleteCategory(data){
    return this.httpClient.post<any>(apiUrl.deleteCategoryUrl, data);
  }
  deleteSubCategory(data){
    return this.httpClient.post<any>(apiUrl.deleteSubCategoryUrl, data);
  }
  createTest(data){
    return this.httpClient.post<any>(apiUrl.createTestUrl, data);
  }
  getTest(data){
    return this.httpClient.post<any>(apiUrl.testListUrl, data);
  }
  getQuestion(data){
    return this.httpClient.post<any>(apiUrl.questionListUrl, data);
  }
  addQuestion(data){
    return this.httpClient.post<any>(apiUrl.addQuestionUrl, data);
  }
}
