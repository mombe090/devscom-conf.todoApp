import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TodoInterface} from "./todo.interface";
import {TodoDto} from "./todo.dto";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: TodoInterface[] = [];
  $todos = new Subject<TodoInterface[]>();

  constructor(private http: HttpClient) {}

  getAllTodos() {
   this.http.get('http://localhost:3000/todos').subscribe(
      (response: TodoInterface[]) => {
        this.todos = response;
        this.refresh()
      },
      (e) => {
        console.log(e);
      }
    );
  }

  getTodo(id: string) {
    return this.http.get(`http://localhost:3000/todos/${id}`);
  }

  saveTodo(todo: TodoDto) {
    todo.done = false;
    this.http.post('http://localhost:3000/todos', todo).subscribe(
      (response: TodoInterface) => {
        this.getAllTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateTodo(todo: TodoDto) {
    this.http.put(`http://localhost:3000/todos/${todo._id}`, todo).subscribe(
      (response: TodoInterface) => {
        this.getAllTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeTodo(todo: TodoInterface) {
    this.http.delete(`http://localhost:3000/todos/${todo._id}`).subscribe(
      (response: any) => {
        this.getAllTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeAllTodo(todos: TodoInterface[]) {
    this.http.put('http://localhost:3000/todos/delete/all', todos).subscribe(
      (response: string) => {
        this.getAllTodos();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  private refresh() {
    this.$todos.next(this.todos);
  }
}
