import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripDetailsModalPage } from '../../../public/trip-details-modal/trip-details-modal.page';


@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  users = {
    user: [
      {
        userid: 0,
        username: 'Chester Benington',
        profilepic: 'assets/lg1.jpg',
        recordtime: '2019/08/05 17:00 pm',
      },
      {
        userid: 1,
        username: 'Mike Shinoda',
        profilepic: 'assets/lg2.jpg',
        recordtime: '2019/09/10 12:00 pm',
      },
      {
        userid: 2,
        username: 'Rob Bourdon',
        profilepic: 'assets/lg3.jpg',
        recordtime: '2019/11/18 19:00 pm',
      }
    ]
  };

  tripdetails = {
    trip: [
      {
        tripid: 0,
        trip_from: 'Kandy',
        trip_to: 'Colombo',
        date_from: '2019/08/06',
        date_to: '2019/08/09',
        pickup_time: '14:00',
        pickup_loc: '18:00',
        passengerscount: 5,
        description: 'This is simple description one',
        waypoints: [
          {
            id: 0,
            point: 'Peradeniya'
          },
          {
            id: 1,
            point: 'Kegalle'
          },
          {
            id: 2,
            point: 'Gampaha'
          },
          {
            id: 3,
            point: 'Kelaniya'
          },
          {
            id: 4,
            point: 'Kaduwela'
          }
        ]
      },
      {
        tripid: 1,
        trip_from: 'Kandy',
        trip_to: 'Gampola',
        date_from: '2019/09/10',
        date_to: '2019/09/15',
        pickup_time: '16:00',
        pickup_loc: '19:00',
        passengerscount: 5,
        description: 'This is simple description two',
        waypoints: [
          {
            id: 0,
            point: 'Peradeniya'
          },
          {
            id: 1,
            point: 'Gelioya'
          },
          {
            id: 2,
            point: 'Veligalla'
          }
        ]
      },
      {
        tripid: 2,
        trip_from: 'Kandy',
        trip_to: 'Matara',
        date_from: '2019/10/08',
        date_to: '2019/10/12',
        pickup_time: '18:00',
        pickup_loc: '20:00',
        passengerscount: 5,
        description: 'This is simple description three',
        waypoints: [
          {
            id: 0,
            point: 'Kegalle'
          },
          {
            id: 1,
            point: 'Gampaha'
          },
          {
            id: 2,
            point: 'Colombo'
          },
          {
            id: 3,
            point: 'Panadura'
          },
          {
            id: 4,
            point: 'Kalutara'
          },
          {
            id: 5,
            point: 'Galle'
          },
          {
            id: 6,
            point: 'Matara'
          }
        ]
      }
    ]
  };

  dataRet: any;

  constructor(private modalController: ModalController) {}

  async presentModal(id) {

    const modal = await this.modalController.create({
      component: TripDetailsModalPage,
      componentProps: {
        userArray : this.users.user[id],
        tripArray : this.tripdetails.trip[id]
      }
    });

    modal.onDidDismiss().then((dataRet) => {
      if (dataRet !== null) {
        this.dataRet = dataRet.data;
      }
    })
    return await modal.present();
  }


}
