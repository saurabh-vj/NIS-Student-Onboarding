import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  getUserName() {
    this.userName$.next(localStorage.getItem('loggedInUser'));
  }

  setUserName(userName: string): any {
    localStorage.setItem('loggedInUser', userName);
    this.userName$.next(userName);
  }

  deleteUserName() {
    localStorage.removeItem('loggedInUser');
    this.userName$.next('');
  }
}
