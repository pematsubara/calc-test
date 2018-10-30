import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public clickedItem: number;
  public tasks;
  public logs;
  public userId: number;

  ngOnInit() {
    this.userId = this.auth.getUser().id;
    this.tasks = this.auth.getTasks();
    this.logs = this.auth.getLogs();

  }

  confirm(id) {
    if (this.clickedItem === id) {
      this.clickedItem = 0;
    } else {
      this.clickedItem = id;
    }
  }

  check(log) {
    this.auth.deleteLog(log);

    // corrigir esse delay!
    setTimeout(() => {
    this.logs = this.auth.getLogs();
    this.tasks = this.auth.getTasks();
    }, 300);
  }
}
