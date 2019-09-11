import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripDetailsModalPage } from '../../../public/trip-details-modal/trip-details-modal.page';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})

export class Tab2Page {
  
  URL = environment.url;
  
  tripdetail: any = [];
  tripdetails: any = [];
  dataRet: any;
  result_array: any = [];
 
  budgetDetails: any;
  tripId: number;
  ownerId: number;
  notificationId: number;

  constructor(private modalController: ModalController,
              private httpService: HttpClient,
              private storage: StorageService) {
                
                this.storage.getStorageData('ownerId').then((res) => {
                  this.loadInitialData(res);
               });

  }

  async presentModal(id) {
    this.tripId = this.tripdetail[`tripId`];
    this.ownerId = this.tripdetail[`owner_id`];
    this.notificationId = this.tripdetail[`notification_id`];

    console.log(this.ownerId,this.notificationId,this.tripId);

    const modal = await this.modalController.create({
      component: TripDetailsModalPage,
      componentProps: {
        tripArray : this.tripdetails
      }
    });

    modal.onDidDismiss().then((dataRet) => {
      if (dataRet !== null) {

        this.dataRet = dataRet.data;

        console.log(this.ownerId,this.notificationId,this.tripId)

        const budgetDetail = {
            trip_id: this.tripId,
            owner_id: this.ownerId,
            budget: this.dataRet,
            notification_id: this.notificationId
        }

        console.log(budgetDetail);
        this.budgetDetails = JSON.stringify(budgetDetail);
        console.log(this.budgetDetails);


        this.httpService.post(this.URL + 'owner/send_budget_details.php',this.budgetDetails).subscribe((res) => {
          console.log(res);
        })
      }
    })

    return await modal.present();
  }


  loadInitialData(id) {
    console.log(id)
    const param: any = {owner_id: 7};
    this.httpService.get(this.URL + 'owner/available_trips.php', { params: param})
        .subscribe((res) => {
          console.log(res)
          this.result_array = JSON.stringify(res);
          console.log(this.result_array);

          Array.from(this.result_array).forEach((element, index) => {
            this.tripdetail[`tripId`] = element[`tripId`],
            this.tripdetail[`arrivalDate`] = element[`arrivalDate`],
            this.tripdetail[`departureDate`] = element[`departureDate`],
            this.tripdetail[`numberOfPassenger`] = element[`numberOfPassenger`],
            this.tripdetail[`startLocation`] = element[`startLocation`],
            this.tripdetail[`travelLocation`] = element[`travelLocation`],
            this.tripdetail[`tripDescription`] = element[`tripDescription`],
            this.tripdetail[`wayPoint`] = element[`wayPoint`],
            this.tripdetail[`owner_id`] = element[`ownerId`]
            this.tripdetail[`notification_id`] = element[`notificationId`]

          });

          this.tripdetails.push(Object.assign([], this.tripdetail));
        });
  }

  getOwnerId() {
     
  }

}

