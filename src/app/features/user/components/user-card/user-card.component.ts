import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@/app/models/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit {

  @Input() user!:IUser;
  maleImg: string = 'assets/images/male.svg';
  femaleImg: string = 'assets/images/female.svg';

  constructor() { }

  ngOnInit(): void {}
}
