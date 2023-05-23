import { Component, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { User, UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  subscription: Subscription = new Subscription();
  users: User[] = [];
  error: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService.fetchUsers();
  }

  subscribeToUsers(): void {
    this.subscription.add(
      this.usersService.users$
        .pipe(filter((users) => !!users)) // filter out undefined values
        .subscribe((users) => {
          this.users = users;
        })
    );
  }

  subscribeToErrors(): void {
    this.subscription.add(
      this.usersService.errors$.subscribe((error) => {
        this.error = error;
      })
    );
  }
}
