import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  constructor(private auth: AuthService) { }

  public clickedItem: number;
  public tasks: object;

  ngOnInit() {
    this.tasks = this.auth.getTasks();
  }

  confirm(id) {
    if (this.clickedItem === id) {
      this.clickedItem = 0;
    } else {
      this.clickedItem = id;
    }
  }

  check(task) {
    let form = new Object;
    form = { 'task': task.id, 'score': task.score };
    this.auth.setLog(JSON.stringify(form)).subscribe(
      (resp) => {
        this.clickedItem = 0;
        let user = new Object;
        user = { 'last_user' : this.auth.getUser().name };
        this.auth.updateTask(JSON.stringify(user), JSON.stringify(task.id));
      });
  }
}
