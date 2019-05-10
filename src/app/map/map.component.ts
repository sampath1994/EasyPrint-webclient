import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { Shop } from '../shop';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() mapActive :Boolean;
  @Input() lat: number;
  @Input() lng: number;
  @Output() selectedShop : EventEmitter<any> = new EventEmitter<any>();
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  //lat: number = 51.673858;
  //lng: number = 7.815982;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
    let selectedMarker = this.markers[index];
    let shop = new Shop(index,selectedMarker.address);
    this.selectedShop.emit(shop);
  }
  
  mapClicked($event: MouseEvent) {
   /* this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });*/
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  ngOnChanges(){
  console.log("Map area Visible!!");
  this.markers.push({
    lat: this.lat,
    lng: this.lng,
    label:"You",
    draggable: true,
    address: "Your Location"
  });
  }

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
      draggable: false,
      address:"Peter Print shop"
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
      draggable: false,
      address:"Tony PrintZZ"
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
      draggable: false,
      address:"Thor Printers"
    }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
  draggable: boolean;
  address: string;
}