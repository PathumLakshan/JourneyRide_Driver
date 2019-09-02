// angular
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
// ionic native
import { environment } from '../../../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TripDetailsModalPage } from '../../../public/trip-details-modal/trip-details-modal.page';


// rxjs
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  dataRet: any;

  passengerNotes = {
    passengernote: [
      {
        passengerId: 0,
        psgName: 'Mike Shinoda',
        prof_pic: 'assets/lg3.jpg',
        from: 'Kandy',
        destination: 'Colombo',
        noofpsg: 20,
      },
      {
        passengerId: 1,
        psgName: 'Rob',
        prof_pic: 'assets/lg3.jpg',
        from: 'NY',
        destination: 'CLF',
        noofpsg: 10,
      },
      {
        passengerId: 2,
        psgName: 'David',
        prof_pic: 'assets/lg2.jpg',
        from: 'Sweden',
        destination: 'Ireland',
        noofpsg: 2,
      }
    ]
  };

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
        passengerId: 0,
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
        passengerId: 1,
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
        passengerId: 2,
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


  URL    =  environment.url + '/pass/list_passenger';
  HEADER = environment.header;

  result: any = [];
  var2: any;

  constructor(private nativeHttp: HTTP,
              private http: HttpClient,
              private location: Location,
              private loadingController: LoadingController,
              private modalController: ModalController) { }

  ngOnInit() {
  }

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

  async loadShit() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    await loading.present();

    return this.http.get(this.URL).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(
      (res) => {
        this.var2 = res[1].email;
      },
      (err) => { alert(err.message);}
    );
  }

  async getDataNativeHttp() {
    const loading = await this.loadingController.create();
    await loading.present();
    from(this.nativeHttp.get(this.URL, {}, {})).pipe(
      finalize(() => loading.dismiss())
    ).subscribe(
      data => { this.var2 = data[0].email,
                alert(data[0].email);
              },
     err => { console.log('Native Call error: ', err); }
     );
  }

}
