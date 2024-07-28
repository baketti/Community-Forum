import { IPost } from '@/app/models/Post';
import { IUser } from '@/app/models/User';
import { UsersService } from '@/app/services/users/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  user!: IUser;
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
    });
  }

  getUserDetails(userId:number): void {
    this.usersService.getUserDetails(userId).subscribe(user => {
       this.user = user;
    });
  }

  getUserPosts(userId:number): void {
    this.usersService.getUserPosts(userId).subscribe(posts => {
      this.userPosts = posts;
    });
  }
}
