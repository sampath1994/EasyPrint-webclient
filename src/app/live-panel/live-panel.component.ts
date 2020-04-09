import { Component, OnInit } from '@angular/core';
import { PrintJob } from '../models/print-job';
import { ModalService } from '../service/modal.service';

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

  constructor(private modalService: ModalService) { 
    this.printjobs = [{"id":1,"username":"sam","docname":"testdoc","color":"black"},{"id":2,"username":"pro","docname":"testdoc2","color":"clr"}]

  }

  ngOnInit() {
    this.bodyText = 'This text can be updated in modal 1';
  }

  openModal(id: string, idx: number) {
    this.currentPrintJob = this.printjobs[idx];
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
