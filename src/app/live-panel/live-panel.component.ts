import { Component, OnInit, HostListener } from '@angular/core';
import { PrintJob } from '../models/print-job';
import { ModalService } from '../service/modal.service';
import { PollService } from '../poll.service';
import { MessagingService } from '../messaging.service';
import { take, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-live-panel',
  templateUrl: './live-panel.component.html',
  styleUrls: ['./live-panel.component.css'],
  providers: []
})
export class LivePanelComponent implements OnInit {

  private bodyText: string;
  printjobs: PrintJob[] = [];
  currentPrintJob: PrintJob;
  private totalElements: number;
  private totalPages: number;
  private currentPage: number;

  private notiPermissionSubscription: Subscription;
  private pollServiceSubs: Subscription;
  private onFocusSubs: Subscription;

  constructor(private modalService: ModalService, private poll: PollService, private messagingService: MessagingService ) { 
    //this.printjobs = [{"id":1,"username":"sam","docname":"testdoc","color":"black"},{"id":2,"username":"pro","docname":"testdoc2","color":"clr"}]

  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    let pollSubscription$ =  this.poll.getPrintJobPoll();
    let pollError$ = this.poll.getErrorState();
    pollError$.subscribe(data => console.log('Error state', data));
    this.pollServiceSubs = pollSubscription$.subscribe(data => {this.currentLivePanelDataExtract(data); pollError$.next(false);},error => console.log('Error'));
    let notiPermission$ = this.messagingService.getNotiPermission();
    this.notiPermissionSubscription = notiPermission$.pipe(take(1), delay(2000)).subscribe(data => {
      if(data){
        this.pollServiceSubs.unsubscribe();
        this.messagingService.currentMessage.subscribe((val) => {
          console.log("inside subscribe");
          console.log(val.notification.title);
          console.log(val.notification.body);
          this.getPrintJobsOnNoti();
        });
      }else{
        console.log('Notification disabled!');
      }
    });
  }

  ngOnDestroy() {
    this.notiPermissionSubscription.unsubscribe();
    this.pollServiceSubs.unsubscribe();
    this.onFocusSubs.unsubscribe();
  }

  @HostListener('window:focus', ['$event'])
    onFocus(event: any): void {
        console.log('Focused');
        this.getPrintJobsOnFocus();
    }

  getPrintJobsOnFocus(){
    this.onFocusSubs = this.poll.getPrintJobs().subscribe(data => {
      this.currentLivePanelDataExtract(data);
    },
    error => console.log('Error while polling!')
    )
  } 

  openModal(id: string, idx: number) {
    this.currentPrintJob = this.printjobs[idx];
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

currentLivePanelDataExtract(pageInfo: any){
  let pageArray = pageInfo.content;
  this.totalElements = pageInfo.totalElements;
  this.totalPages = pageInfo.totalPages;
  this.currentPage = pageInfo.number;
  this.printjobs = [];
  for(let idx in pageArray){
    let printj: PrintJob = <PrintJob> pageArray[idx];
    console.log(printj);
    this.printjobs.push(printj);  
  }
}

getPrintJobsOnNoti(){
  this.poll.getPrintJobs().subscribe(data => {
    this.currentLivePanelDataExtract(data);
  },
  error => console.log('Error while polling!')
  )
}
}
