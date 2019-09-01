// angular
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// ionic native
import { environment } from '../../../../environments/environment';
import { HTTP } from '@ionic-native/http/ngx';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';


// rxjs
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  passengerNotes = {
    passengernote: [
      {
        psgName: 'Mike Shinoda',
        prof_pic: 'assets/lg3.jpg',
        from: 'Kandy',
        destination: 'Colombo',
        noofpsg: 20,
      },
      {
        psgName: 'Rob',
        prof_pic: 'assets/lg3.jpg',
        from: 'NY',
        destination: 'CLF',
        noofpsg: 10,
      },
      {
        psgName: 'David',
        prof_pic: 'assets/lg2.jpg',
        from: 'Sweden',
        destination: 'Ireland',
        noofpsg: 2,
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
              private loadingController: LoadingController) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
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
