import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[] | HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/eeducate/all`);
  }

  public addUsers(formData : FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/eeducate/add`, formData);
  }

  public updateUsers(formData : FormData): Observable<User | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/eeducate/update`, formData);
  }

  public resetPassword(email : string): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/eeducate/resetpassword/${email}`);
  }

  public updateProfileImage(formData : FormData): Observable<HttpEvent<User> | HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/eeducate/updateProfileImage`, formData,
    {reportProgress: true,
      observe: 'events'
    });
  }

  public deleteUser(id : number): Observable<CustomHttpResponse | HttpErrorResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/eeducate/delete/${id}`);
  }

  public addUsersToLocalCache(users : User[]): void{
    localStorage.setItem('Users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[]{
    if(localStorage.getItem('Users')){
      return JSON.parse(localStorage.getItem('Users'));
    }
    return null;
  }

  public createUserFormData(loggedInUsername: string, user: User, profileImage: File): FormData{
      const formData = new FormData();
      formData.append('currentUsername', loggedInUsername);
      formData.append('nic', user.nic);
      formData.append('name', user.name);
      formData.append('email', user.email);
      formData.append('phone', JSON.stringify(user.phone));
      formData.append('role', user.role);
      formData.append('profileImage', profileImage);
      formData.append('isActive', JSON.stringify(user.active));
      formData.append('isNonLocked', JSON.stringify(user.notLocked));
      return formData;
  }

}
