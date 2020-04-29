import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId)
    this.messagingService.receiveMessage()
    this.messagingService.currentMessage.subscribe((val) => {
      console.log(val.notification.title);
      console.log(val.notification.body);
    });
  }

}
