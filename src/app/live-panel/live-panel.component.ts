import { Component, OnInit } from '@angular/core';
import { PrintJob } from '../models/print-job';
import { ModalService } from '../service/modal.service';
import { PollService } from '../poll.service';

@Component({
  selector: 'app-live-panel',
  templateUrl: './live-panel.component.html',
  styleUrls: ['./live-panel.component.css'],
  providers: []
})
export class LivePanelComponent implements OnInit {

  private bodyText: string;
  printjobs: PrintJob[];
  currentPrintJob: PrintJob;

  constructor(private modalService: ModalService, private poll:PollService) { 
    this.printjobs = [{"id":1,"username":"sam","docname":"testdoc","color":"black"},{"id":2,"username":"pro","docname":"testdoc2","color":"clr"}]

  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
    let pollSubscription$ =  this.poll.getPrintJobPoll();
    let pollError$ = this.poll.getErrorState();
    pollError$.subscribe(data => console.log('Error state', data));
    pollSubscription$.subscribe(data => {console.log(data/*.content*/); pollError$.next(false);},error => console.log('Error'));
  }

  openModal(id: string, idx: number) {
    this.currentPrintJob = this.printjobs[idx];
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
