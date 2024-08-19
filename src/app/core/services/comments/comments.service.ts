import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '@/app/models/Comment';
import { ApisHelperService } from '../apis-helper/apis-helper.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private url = (postId: number) => `https://gorest.co.in/public/v2/posts/${postId}/comments`;

  constructor(
    private http: HttpClient,
    private apisHelperSrv: ApisHelperService
  ) { }
  
  postComment(comment: Omit<IComment, 'id'>):Observable<IComment> {
    return this.http.post<IComment>(
      this.url(comment.post_id), 
      comment,
      this.apisHelperSrv.addXSpinnerIdHeader("post-comment")
    );
  }

  getComments(postId: number):Observable<IComment[]> {
    return this.http.get<IComment[]>(
      this.url(postId),
      this.apisHelperSrv.addXSpinnerIdHeader("get-comments")
    );
  }  
}
