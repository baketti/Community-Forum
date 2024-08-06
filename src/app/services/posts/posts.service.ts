import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { IPost } from '@/app/models/Post';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApisHelperService } from '../apis-helper/apis-helper.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private baseUrl = 'https://gorest.co.in/public/v2/';

  constructor(
    private http: HttpClient,
    private authSrv: AuthenticationService,
    private apisHelperSrv: ApisHelperService,
    private usersService: UsersService
  ) { }

  postPost(post: IPost): Observable<IPost> {
    const { id } = this.authSrv.getCurrentUser(); 
    return this.http.post<IPost>(`
      ${this.baseUrl}users/${id}/posts`, 
      post, 
      this.apisHelperSrv.addXSpinnerIdHeader("post-post")
    );
  }

  getPosts(page: number, per_page: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(
      `${this.baseUrl}posts?page=${page}&per_page=${per_page}`,
      this.apisHelperSrv.addXSpinnerIdHeader("get-posts")
    );
  }

  getPostsByTitle(searchStr:string,page: number, per_page: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(
      `${this.baseUrl}posts?page=${page}&per_page=${per_page}&title=${searchStr}`,
      this.apisHelperSrv.addXSpinnerIdHeader("get-posts")
    );
  }
}
