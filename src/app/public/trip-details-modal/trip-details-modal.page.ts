import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';


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
    private navParams: NavParams,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    
    this.tripFrom           = this.navParams.data.tripArray[0][`startLocation`];
    this.tripTo             = this.navParams.data.tripArray[0][`travelLocation`];
    this.dateFrom           = this.navParams.data.tripArray[0][`departureDate`];
    this.dateTo             = this.navParams.data.tripArray[0][`arrivalDate`];
    this.pickupLoc          = this.navParams.data.tripArray[0][`startLocation`];
    this.numberofpassengers = this.navParams.data.tripArray[0][`numberOfPassenger`];
    this.waypoints          = this.navParams.data.tripArray[0][`wayPoint`];
    this.description        = this.navParams.data.tripArray[0][`tripDescription`];

    console.log(this.navParams.data.tripArray)
  }

  async closeModal() {
    this.onClosedData = this.budget;
    await this.modalController.dismiss(this.onClosedData);
  }

  navBack() {
    this.navCtrl.navigateBack('/home/tab1');
  }

}
