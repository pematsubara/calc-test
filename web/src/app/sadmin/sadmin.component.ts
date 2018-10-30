import { AuthService } from './../auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sadmin',
  templateUrl: './sadmin.component.html',
  styleUrls: ['./sadmin.component.css']
})
export class SadminComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  public isAdmin: boolean = this.auth.getFamily().admin === this.auth.getUser().id ? true : false;
  public page: number;

  ngOnInit() {
    if (this.isAdmin === false) {
      // this.router.navigate(['/nadmin']);
    }
    this.auth.getTasks();
    this.auth.getLogs();
    this.activate(3, '/sadmin/profile');
  }

  activate(x, urlroute) {
    this.page = x;
    this.router.navigate([urlroute]);
  }
}
