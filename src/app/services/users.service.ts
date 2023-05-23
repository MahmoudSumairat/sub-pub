import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _errors: Subject<string> = new Subject<string>();

  get users$(): Observable<User[]> {
    return this._users.asObservable();
  }

  get errors$(): Observable<string> {
    return this._errors.asObservable();
  }

  private publishUsersList(users: User[]): void {
    this._users.next(users);
  }

  private publishErrors(error: string): void {
    this._errors.next(error);
  }

  fetchUsers(): void {
    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        if (res.status !== 200) {
          this.publishErrors(res.statusText);
          return;
        }

        this.publishUsersList(res.body);
      });
  }
}
