import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  /*currentMessage = new BehaviorSubject<any>(null);
  data = this.currentMessage.asObservable();*/
  currentMessage = new Subject<any>();
  private notiPermission = new Subject<boolean>();

  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    this.http.post<any>(`${environment.apiUrl}/users/update_fcm_token?token=${token}`, {}).subscribe(
      data => {console.log('FCM token update',data)},
      error =>{console.log('FCM token update Failed')}
    );
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        console.log('Here');
        this.updateToken(userId, token);
        this.notiPermission.next(true);
      },
      (err) => {
        this.notiPermission.next(false);
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }

  getNotiPermission(): Subject<boolean>{
    return this.notiPermission;
  }
}
