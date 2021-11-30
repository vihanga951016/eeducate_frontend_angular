import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public host = environment.apiUrl;
  private token: string;
  private loggedInUsername: any;
  private jwthelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user : User): Observable<HttpResponse<any> | HttpErrorResponse> {
    return this.http.post<HttpResponse<any> | HttpErrorResponse>
    (`${this.host}/eeducate/login`, user , {observe: 'response'});
  }

  public register(user : User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>
    (`${this.host}/eeducate/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user'); // Particular user
    localStorage.removeItem('token'); // Token of the user
    localStorage.removeItem('users'); // All the users
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token); //(token, 'asdiasdi8ahsodhoahsdoihas')
  }

  public addUserToLocalStorage(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //Get users one by one as a string and transform all users into json and get as a list.
  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  //load the token form the local storage.
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  // Get the loaded token from the local storage.
  public getToken(): string {
    return this.token;
  }

  //Check if the user is logged in or not
  public isUserLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token != ''){
      if(this.jwthelper.decodeToken(this.token).sub != null || '') /**  In this case, the subject(sub) is username.*/ {
        if(!this.jwthelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwthelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return;
  }

}
