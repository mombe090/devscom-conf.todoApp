import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoInterface} from "./todo.interface";
import {TodoDto} from "./todo.dto";
import {TodoService} from "./todo.services";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: TodoInterface[] = [];
  filterTodos: TodoInterface[] = [];
  editedTodo: TodoInterface;
  newTodo = new TodoDto();
  visibility = 'all';
  editingIndex;

  constructor(private http: HttpClient, private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos();

    this.todoService.$todos.subscribe(
        (response: TodoInterface[]) => {
          this.todos = response;
          this.filterTodos = this.todos;
        }
      );
  }

  addTodo(event) {
    if (event.key === 'Enter') {
      this.todoService.saveTodo(this.newTodo);
      this.newTodo = new TodoDto();
    }
  }

  editTodo(id: string) {
    this.editingIndex = id;
  }

  removeTodo(todo: TodoInterface) {
    this.todoService.removeTodo(todo);
  }

  doneEdit(todo: TodoInterface, event) {
    if (event.key === 'Enter') {
      this.todoService.updateTodo(todo);
      this.editingIndex = -1;
    }
  }

  statusEdit(todo: TodoDto) {
    this.todoService.updateTodo(todo);
  }

  removeCompleted() {
    this.todoService.removeAllTodo(this.todos);
  }

  changeVisibility(visibility: string) {
    this.visibility = visibility;
    if (this.visibility === 'all') {
      this.filterTodos = this.todos;
    } else if (this.visibility === 'active') {
      this.filterTodos = this.todos.filter(todo => !todo.done);
    } else if (this.visibility === 'complete') {
      this.filterTodos = this.todos.filter(todo => todo.done);
    }
  }
}
