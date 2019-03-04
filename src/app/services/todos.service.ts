import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
  }

  private extractData(res) {
    return res.data || {};
  }

  /**
   * Fetches and filters the to-dos
   * @param {object} params Filter settings
   * @param {object} params.filter Filter name and value
   * @param {string} params.status Status filter
   */
  public getTodos(params) {
    let searchParams: any = {};

    if (params) {
      if (params.filter.value !== '') {
        searchParams[params.filter.name] = params.filter.value;
      }
      if (params.status) {
        searchParams.status = params.status;
      }
    }

    return this.http.get(this.endpoint, {params: searchParams})
      .pipe(map(this.extractData))
      .pipe(map((data) => data.todos));
  }

  /**
   * Creates a to-do with a description and an attachment
   * @param {string} description To-do description
   * @param {file} attachment To-do attachment
   */
  public createTodo(description, attachment) {
    if (!description.trim().length) {
      return;
    }
    const form = new FormData();

    form.append('description', description);
    if (attachment) {
      form.append('file', attachment);
    }

    this.http.post(this.endpoint, form).subscribe(() => this.getTodos(null).subscribe());
  }

  /**
   * Finishes a to-do
   * @param {number} id To-do's id
   */
  public finishTodo(id) {
    if (!id) {
      return;
    }

    this.http.put(this.endpoint + id, null).subscribe(() => this.getTodos(null).subscribe());
  }

  /**
   * Deletes a to-do
   * @param {number} id To-do's id
   */
  public deleteTodo(id) {
    if (!id) {
      return;
    }

    this.http.delete(this.endpoint + id).subscribe(() => this.getTodos(null).subscribe());
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
