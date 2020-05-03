import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-printshop',
  templateUrl: './printshop.component.html',
  styleUrls: ['./printshop.component.css']
})
export class PrintshopComponent implements OnInit {

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
  }

}
