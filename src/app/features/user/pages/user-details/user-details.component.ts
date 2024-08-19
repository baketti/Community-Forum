import { IPostFe } from '@/app/models/Post';
import { IUserFe } from '@/app/models/User';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, } from 'rxjs';
import { AppState } from '@/app/core/store/app/app.state';
import { Store } from '@ngrx/store';
import { getCurrentUserRequest, resetCurrentUser } from '../../store/users/users.actions';
import { getCurrentUser, getCurrentUserPosts } from '../../store/users/users.selectors';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user$: Observable<IUserFe|null> = this.store.select(getCurrentUser);
  userPosts$: Observable<IPostFe[]> = this.store.select(getCurrentUserPosts);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['id'];
      this.getUserDetails(userId);
    })
  }

  getUserDetails(user_id:number): void {
    this.store.dispatch(getCurrentUserRequest({user_id}));
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetCurrentUser());
  }
}
