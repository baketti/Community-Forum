/* 
HERE I HAVE EXPERIMENTED TWO DIFFERENT APPROACHES TO RETRIEVE DATA:
 - USERS => taking the observable and working with it;
 - POSTS => working directly with the result returned from the observable;
*/
import { IPost } from '@/app/models/Post';
import { IUser } from '@/app/models/User';
import { UsersService } from '@/app/core/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user$ = new Observable<IUser>();
  userPosts: IPost[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.getUserDetails(userId);
      this.getUserPosts(userId);
    })
  }

  getUserDetails(userId:number): void {
    this.user$ = this.usersService.getUserDetails(userId);
  }

  getUserPosts(userId:number): void {
    this.usersService.getUserPosts(userId).subscribe(posts => {
      this.userPosts = posts;
    });
  }
}
