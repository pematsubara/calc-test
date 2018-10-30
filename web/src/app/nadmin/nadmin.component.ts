import { Router } from '@angular/router';
import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nadmin',
  templateUrl: './nadmin.component.html',
  styleUrls: ['./nadmin.component.css']
})
export class NadminComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  isAdmin: boolean = this.auth.getFamily().admin === this.auth.getUser().id ? true : false;
  public page: number;

  ngOnInit() {
    if (this.isAdmin === true) {
      this.router.navigate(['/sadmin']);
    }
    this.auth.updateTasks();
    this.auth.getLogs();
    this.activate(3, '/nadmin/profile');
  }

  activate(x, urlrouter) {
    this.page = x;
    this.router.navigate([urlrouter]);
  }

}
