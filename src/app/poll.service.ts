import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from  'rxjs/operators';
import { timer, Observable, Subject, concat, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { retryWhen, delay, take, concatMap, catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  private errorState = new Subject<boolean>();
  private pageNo: number;
  constructor(private http: HttpClient){ 
    this.pageNo = 0;
  }

  getPrintJobPoll(): Observable<any>{
    return timer(0, 5000).pipe(
      switchMap(() => this.http.get(`${environment.apiUrl}/doc/poll/${this.pageNo}`)),
      retryWhen(errors => errors.pipe(delay(1000), map(() => {
        console.log('Error!');
        this.errorState.next(true);
    })))
      );
  }

  getPrintJobs(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/doc/poll/${this.pageNo}`);
  }

  getErrorState(): Subject<boolean>{
    return this.errorState;
  }

  setPageNo(page_num: number){
    this.pageNo = page_num;
  }
}
