import { Component, OnInit } from '@angular/core';
import { Shop } from '../shop';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  buttonState : Boolean;
  lat: number;
  lng: number;
  shopName : string;
  constructor() {
   }

  ngOnInit() {
    this.buttonState = false;
  }

  clicked():void {
    console.log("inside clicked");
    if(this.buttonState){
    this.buttonState = false;
    console.log("clicked false");
    }else{
      this.buttonState = true;
      console.log("clicked true");
    }

    if (navigator)   // current user location extraction   
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }

  }

  showSelectedShop(shop:Shop):void{
    console.log("inside form!!");
    console.log(shop.name);
    this.shopName = shop.name;
  }
}
