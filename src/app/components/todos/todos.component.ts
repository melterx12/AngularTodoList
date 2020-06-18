import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/Todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.sass']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(todo:Todo) {
    //Add new todo to server and push it to the UI list
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

  deleteTodo(todo:Todo) {
    //Delete todo item from UI list
    this.todos = this.todos.filter(t => t.id != todo.id);
    //Delete todo from server
    this.todoService.deleteTodo(todo).subscribe();
  }
}
