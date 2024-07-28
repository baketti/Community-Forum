import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '@/app/models/User';
import { IPost } from '@/app/models/Post';
import { ApisHelperService } from '../apis-helper/apis-helper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'https://gorest.co.in/public/v2/users';

  constructor(
    private http: HttpClient,
    private apisHelperSrv: ApisHelperService
  ) { }

  postUser(user:IUser): Observable<IUser> {
    return this.http.post<IUser>(
      this.baseUrl, 
      user, 
      this.apisHelperSrv.addXSpinnerIdHeader("post-user")
    );
  }

  getUsers(page: number, per_page: number): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${this.baseUrl}?page=${page}&per_page=${per_page}`, 
      this.apisHelperSrv.addXSpinnerIdHeader("users")
    );
  }

  findByEmail(email: string): Observable<IUser[]> {
    return this.http.get<IUser[]>(
      `${this.baseUrl}?email=${email}`, 
      this.apisHelperSrv.addXSpinnerIdHeader("login")
    );
  }

  getUsersByFilters(filters: Record<string,string>,page: number, per_page: number): Observable<IUser[]> {
    console.log("getUsersByFilters srv page=> ",page);
    
    const filterString = Object.entries(filters).map(([key, value]) => `${key}=${value}`).join('&');
    return this.http.get<IUser[]>(
      `${this.baseUrl}?page=${page}&per_page=${per_page}&${filterString}`,
      this.apisHelperSrv.addXSpinnerIdHeader("users")
    );
  }

  getUserDetails(userId: number): Observable<IUser> {
    return this.http.get<IUser>(
      `${this.baseUrl}/${userId}`, 
      this.apisHelperSrv.addXSpinnerIdHeader("user")
    );
  }

  getUserPosts(userId: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${this.baseUrl}/${userId}/posts`);
  }

  deleteUsersByUserId(userId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/${userId}`, 
      this.apisHelperSrv.addXSpinnerIdHeader("delete-user")
    );
  }
}
