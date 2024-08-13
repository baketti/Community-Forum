import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@/app/models/User';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {

  @Input() user$!:Observable<IUser>;
  maleImg: string = 'assets/images/male.svg';
  femaleImg: string = 'assets/images/female.svg';

  constructor() { }

  ngOnInit(): void {}
}
