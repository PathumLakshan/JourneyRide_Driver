import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Url } from 'url';

@Component({
  selector: 'app-trip-details-modal',
  templateUrl: './trip-details-modal.page.html',
  styleUrls: ['./trip-details-modal.page.scss'],
})

export class TripDetailsModalPage implements OnInit {

  // user details

  username: string;
  profilepic: any;
  recordtime: any;

  // trip details
  /* */
  tripFrom: string;
  tripTo: string;
  dateFrom: any;
  dateTo: any;
  pickupTime: any;
  pickupLoc: any;
  numberofpassengers: number;
  waypoints: any = [];
  description: string;

  budget: any;
  onClosedData: string;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {

    this.username   = this.navParams.data.userArray[`username`];
    this.profilepic = this.navParams.data.userArray[`profilepic`];
    this.recordtime = this.navParams.data.userArray[`recordtime`];

    this.tripFrom           = this.navParams.data.tripArray[`trip_from`];
    this.tripTo             = this.navParams.data.tripArray[`trip_to`];
    this.dateFrom           = this.navParams.data.tripArray[`date_from`];
    this.dateTo             = this.navParams.data.tripArray[`date_to`];
    this.pickupTime         = this.navParams.data.tripArray[`pickup_time`];
    this.pickupLoc          = this.navParams.data.tripArray[`pickup_loc`];
    this.numberofpassengers = this.navParams.data.tripArray[`passengerscount`];
    this.waypoints          = this.navParams.data.tripArray.waypoints;
    this.description        = this.navParams.data.tripArray[`description`];
  }

  async closeModal() {
    this.sendbudget();
    this.onClosedData = 'Wrapped Up !';
    await this.modalController.dismiss(this.onClosedData);
  }

  sendbudget() {
    // send the estimated budget to Passenger
    console.log(this.budget);
  }

}
