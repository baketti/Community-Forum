import { Injectable } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '@/app/models/User';
import { SnackbarMessageService } from '../notification/snackbar-message.service';
import { AuthData, SessionDataParams } from '@/utils/types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authenticated = new BehaviorSubject<boolean>(false);
  public readonly isAuthenticated$ = this.authenticated.asObservable();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackMessage: SnackbarMessageService
  ) { }

  login(data:AuthData): void {
    const { email, token } = data;
    this.setSessionData({token});
    this.usersService.findByEmail(email.trim()).subscribe({
      next: this.handleLogin.bind(this),  
      error: console.error
    });
  }

  handleLogin(res:IUser[]){
    const user = res[0];
    if(user){
      this.setSessionData({user});
      this.authenticated.next(true);
      this.snackMessage.show({
        message: "Successfully logged in",
        duration: 3000
      });
      this.router.navigate(['app/users']); 
    }else{
      this.authenticated.next(false);
      this.snackMessage.show({
        message: "Invalid email",
        duration: 3000
      });
    }
  }

  setSessionData = (params: SessionDataParams): void => {
    const { token, user } = params;
    if (token) sessionStorage.setItem("Token", token);
    if (user) sessionStorage.setItem("User", JSON.stringify(user));
  }

  isLogged = (): boolean => (sessionStorage.getItem("User")) ? true : false;

  getSessionToken = (): string => {
    return sessionStorage.getItem("Token") || "";
  } 

  getCurrentUser = (): IUser => {
    const user = sessionStorage.getItem("User");
    return user ? JSON.parse(user) : null;
  }

  logout = (): void => sessionStorage.clear();
}
