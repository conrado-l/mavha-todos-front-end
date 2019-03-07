import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, catchError, tap, finalize} from 'rxjs/operators';
import {Todo} from '../state/todo/todo.model';
import {SnotifyService} from 'ng-snotify';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  endpoint: string = 'http://localhost:8080/todo/'; // TODO: extract url and port to .env
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private snotifyService: SnotifyService) {
  }

  private extractData(res) {
    return res.data || {};
  }

  /**
   * Fetches and filters the to-dos
   */
  public getTodos(filter) {
    let searchParams: any = {};

    if (filter.value.trim().length) {
      searchParams[filter.type] = filter.value;
    }
    searchParams.status = filter.status;
    // Gets all the to-dos with no pagination
    searchParams.limit = 0;  // TODO: remove when pagination is implemented

    return this.http.get(this.endpoint, {params: searchParams})
      .pipe(map(this.extractData))
      .pipe(map((data) => data.todos));
  }

  /**
   * Creates a to-do with a description and an attachment
   * @param {string} description To-do description
   * @param {file} attachment To-do attachment
   */
  public createTodo(description, attachment): Observable<any> {
    if (!description.trim().length) {
      return;
    }
    const form = new FormData();

    form.append('description', description);
    if (attachment) {
      form.append('file', attachment);
    }

    return this.http.post(this.endpoint, form).pipe(
      map(res => res),
      catchError(err => {
        return throwError(err);
      }),
    );
  }

  /**
   * Toggles a to-do status
   * @param {number} id To-do's id
   */
  public toggleTodo(id) {
    if (!id) {
      return;
    }

    return this.http.put(this.endpoint + id, null).pipe(map(() => {
    }));
  }

  /**
   * Deletes a to-do
   * @param {number} id To-do's id
   */
  public deleteTodo(id) {
    if (!id) {
      return;
    }

    return this.http.delete(this.endpoint + id).pipe(map(() => {
    }));
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  private handleError(operation: string) {
    return (err: any) => {
      let errMsg = `error in ${operation}() retrieving ${this.endpoint}`;
      console.log(`${errMsg}:`, err)
      if (err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
      }
      return throwError(errMsg);
    };
  }

}
