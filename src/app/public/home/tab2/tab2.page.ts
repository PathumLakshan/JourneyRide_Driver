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

  URL    = environment.url + '/pass/list_passenger';
  HEADER = environment.header;

  result: any = [];
  var2: any;

  constructor(private nativeHttp: HTTP,
              private http: HttpClient, private location: Location, private loadingCtrl: LoadingController) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  loadShit() {
    return this.http.get(this.URL).pipe().subscribe(
      (res) => {alert(res[0].data); console.log(res[0][`passengerName`])},
      (err) => { alert(err);}
    )
  }


  async getDataNativeHttp() {
    const loading = await this.loadingCtrl.create();
    await loading.present();
 
    // Returns a promise, need to convert with of() to Observable (if want)!
    // tslint:disable-next-line:object-literal-key-quotes
    from(this.nativeHttp.get(this.URL, {'Authorization': this.HEADER}, {'Content-Type': 'application/json'})).pipe(
      finalize(() => loading.dismiss())
    ).subscribe((data) => {
      this.var2 = data[0][`passengerName`];
      alert(data[0][`passengerName`]);
      // const parsed = JSON.parse(data.data);
      // this.result = parsed.results;
      // alert('result1' + this.result[0]);
    }, err => {
      console.log('Native Call error: ', err);
    });
  }

}
