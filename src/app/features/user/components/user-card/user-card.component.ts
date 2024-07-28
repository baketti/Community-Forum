import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '@/app/models/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit {

  @Input() user!:IUser;
  maleImg:string = "https://www.svgrepo.com/show/382106/male-avatar-boy-face-man-user-9.svg";
  femaleImg:string = "https://www.svgrepo.com/show/382099/female-avatar-girl-face-woman-user-2.svg";
  
  constructor() { }

  ngOnInit(): void {}
}
