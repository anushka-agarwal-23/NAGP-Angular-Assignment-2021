import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../data-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    this.loggedIn$.next(localStorage.getItem('userName') !== undefined ? true : false);
  }

  validateUser(employee: User): Observable<User> {
    return this.http.get<User[]>('/assets/db/users.json')
      .pipe(
        map(products => products.find((user: User) => employee.userName === user.userName && employee.password === user.password))
      );
  }

  logout() {
    localStorage.removeItem('userName');
    this.loggedIn$.next(false);
    this.router.navigate(['/home/product']);
  }

  isUserLoggedIn() {
    const userName = localStorage.getItem('userName');
    return !(userName === null);
  }

  getEmployeeById(employeeID: string): Observable<User> {
    return this.http.get<User[]>('/assets/db/users.json')
      .pipe(
        map(products => products.find((user: User) => employeeID === user.userName))
      );
  }
}
