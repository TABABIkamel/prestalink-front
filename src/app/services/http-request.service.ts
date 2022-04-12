import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  public pendingHttpRequests$ : BehaviorSubject<number>;
  constructor() {
    this.pendingHttpRequests$ = new BehaviorSubject(0);
  }
  requestStarted() {
    this.pendingHttpRequests$.next(this.pendingHttpRequests$.getValue()+1);
  }
  requestFinished() {
    this.pendingHttpRequests$.next(this.pendingHttpRequests$.getValue()-1);
  }
}
