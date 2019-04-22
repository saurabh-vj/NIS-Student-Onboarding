import { Component, OnInit } from '@angular/core';
import { UserService } from '../common/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  userName: string;

  constructor(private userService: UserService, private router: Router) {
    userService.userName$.subscribe(data => this.userName = data);
  }

  ngOnInit() {
    this.userService.getUserName();
    if (this.userName) {
      this.router.navigate(['/student']);
    }
  }

  logout() {
    this.userService.deleteUserName();
    this.userService.getUserName();
  }
}
