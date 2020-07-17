import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationModel } from './AuthenticationModel';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  jwt: string;
  email: string;
  constructor(private http: HttpClient) { }

  baseurl: string = "http://127.0.0.1:3000/";

  //Créate a new user
  creatUser(data) {
    return this.http.post<any>(this.baseurl + 'register', data);
  }

  //fonction pour se loger
  login(data) {
    return this.http.post<any>(this.baseurl + 'login', data, { observe: 'response' });
  }
  saveJwtToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }
  // CETTE METHODE ME PERTMET DE DECODER LE TOKEN
  parsejwt(token: any) {
    let jwtHelper = new JwtHelperService();
    let objJWT    = jwtHelper.decodeToken(token);
    this.email    = objJWT.email;
    localStorage.setItem('email', this.email);
  }

  //fonction pour avoir un id
  getUserId(id: string) {
    return this.http.get<AuthenticationModel>(this.baseurl + 'authentications' + '/' + id);
  }

  updateUser(authentication: AuthenticationModel) {
    return this.http.put(this.baseurl + 'connected/update', authentication);
  }


}
