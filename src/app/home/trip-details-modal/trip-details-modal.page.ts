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
  trip_from: string;
  trip_to: string;
  date_from: any;
  date_to: any;
  pickup_time: any;
  pickup_loc: any;
  waypoints: any = [];
  description: string;

  budget: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    console.log(this.navParams.data.userArray);
    console.log(this.navParams.data.tripArray['date_from']);
    console.log(this.navParams.data.tripArray.date_from);
    console.log(this.navParams.data.tripArray.waypoints);

    this.username = this.navParams.data.userArray['username'];
    this.profilepic = this.navParams.data.userArray['profilepic'];
    this.recordtime = this.navParams.data.userArray['recordtime'];
    
    this.trip_from = this.navParams.data.tripArray['trip_from'];
    this.trip_to = this.navParams.data.tripArray['trip_to'];
    this.date_from = this.navParams.data.tripArray['date_from'];
    this.date_to = this.navParams.data.tripArray['date_to'];
    this.pickup_time = this.navParams.data.tripArray['pickup_time'];
    this.pickup_loc = this.navParams.data.tripArray['pickup_loc'];
    this.waypoints = this.navParams.data.tripArray.waypoints;
    this.description = this.navParams.data.tripArray['description'];
  }

  async closeModal() {
    this.sendbudget();
    const onClosedData: string = "Wrapped Up !";
    await this.modalController.dismiss(onClosedData);
  }

  sendbudget() {
    // send the estimated budget to Passenger
    console.log(this.budget);
  }

}
