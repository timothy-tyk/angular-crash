import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Task';
import { TASKS } from 'src/app/mock-tasks';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  deleteTask(task: Task) {
    console.log(task.id);
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
  }
  toggleReminder(task: Task) {
    this.taskService
      .updateTaskReminder(task)
      .subscribe(() => this.taskService.getTasks);
  }
  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(() => this.tasks.push(task));
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
}
