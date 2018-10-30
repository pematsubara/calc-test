import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  check(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

  checkTasks(): boolean {
    return localStorage.getItem('tasks') ? true : false;
  }

  createUser(credentials: { name: string, email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/create`, credentials)
      .do(data => {
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        // localStorage.setItem('user', JSON.stringify(data.user));
      });
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/login`, credentials)
      .do(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', btoa(JSON.stringify(data.user)));
        localStorage.setItem('family', btoa(JSON.stringify(data.family)));
        // localStorage.setItem('user', JSON.stringify(data.user));
        // localStorage.setItem('family', JSON.stringify(data.family));
      });
  }

  createFamily(familycredentials: { name: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/family`, familycredentials)
      .do(data => {
        localStorage.setItem('family', btoa(JSON.stringify(data.family)));
        // localStorage.setItem('family', JSON.stringify(data.family));
      });
  }

  loginFamily(familycredentials: { name: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/enterfamily`, familycredentials)
      .do(data => {
        localStorage.setItem('family', btoa(JSON.stringify(data.family)));
        // localStorage.setItem('family', JSON.stringify(data.family));
      });
  }

  logout(): void {
    this.http.get(`${environment.api_url}/logout`).subscribe(resp => {
      this.router.navigate(['login']);
    });
  }

  getUser() {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
    // return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  }

  getFamily() {
    return localStorage.getItem('family') ? JSON.parse(atob(localStorage.getItem('family'))) : null;
    // return localStorage.getItem('family') ? JSON.parse(localStorage.getItem('family')) : null;
  }

  getTasks() {
    return localStorage.getItem('tasks') ? JSON.parse(atob(localStorage.getItem('tasks'))) : null;
    // return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : null;
  }

  updateTasks(): Promise<boolean> {
    const familyID = this.getFamily().id;
    return this.http.get<any>(`${environment.api_url}/task/${familyID}`).toPromise()
      .then(data => {
        if (data.tasks) {
          localStorage.setItem('tasks', btoa(JSON.stringify(data.tasks)));
          // localStorage.setItem('tasks', JSON.stringify(data.tasks));
          return true;
        }
        return false;
      });
  }

  getLogs() {
    return localStorage.getItem('logs') ? JSON.parse(atob(localStorage.getItem('logs'))) : null;
    // return localStorage.getItem('logs') ? JSON.parse(localStorage.getItem('logs')) : null;
  }

  updateLogs(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/log`).toPromise()
      .then(data => {
        if (data.logs) {
          localStorage.setItem('logs', btoa(JSON.stringify(data.logs)));
          // localStorage.setItem('logs', JSON.stringify(data.logs));
          return true;
        }
        return false;
      });
  }

  updateFamily(user: string): Promise<boolean> {
    user = JSON.parse(user);
    const userId = this.getUser().id;
    return this.http.put<any>(`${environment.api_url}/user/${userId}`, user).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          // localStorage.setItem('user', JSON.stringify(data.user));
          return true;
        }
        return false;
      });

  }

  setUser(): Promise<boolean> {
    return this.http.get<any>(`${environment.api_url}/me`).toPromise()
      .then(data => {
        if (data.user) {
          localStorage.setItem('user', btoa(JSON.stringify(data.user)));
          // localStorage.setItem('user', JSON.stringify(data.user));
          return true;
        }
        return false;
      });
  }

  setTask(newTask: string): Observable<boolean> {
    newTask = JSON.parse(newTask);
    return this.http.post<any>(`${environment.api_url}/task`, newTask)
      .do(data => {
        localStorage.setItem('tasks', btoa(JSON.stringify(data.tasks)));
        // localStorage.setItem('tasks', JSON.stringify(data.tasks));
      });
  }

  updateTask(task: string, id: string): Promise<boolean> {
    task = JSON.parse(task);
    return this.http.put<any>(`${environment.api_url}/task/${id}`, task).toPromise()
      .then(data => {
        localStorage.setItem('tasks', btoa(JSON.stringify(data.tasks)));
        // localStorage.setItem('tasks', JSON.stringify(data.tasks));
        return true;
      });
  }

  setLog(newLog: string): Observable<boolean> {
    newLog = JSON.parse(newLog);
    return this.http.post<any>(`${environment.api_url}/log`, newLog)
      .do(data => {
        localStorage.setItem('logs', btoa(JSON.stringify(data.logs)));
        // localStorage.setItem('logs', JSON.stringify(data.logs));
      });
  }

  deleteLog(log: string): void {
    log = JSON.parse(log);
    this.http.delete<any>(`${environment.api_url}/log/${log}`).subscribe(data => {
      localStorage.setItem('logs', btoa(JSON.stringify(data.logs)));
        // localStorage.setItem('logs', JSON.stringify(data.logs));
    });
  }

}
