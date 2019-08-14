import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';


import { Location } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  URL    = environment.url + '/pass/list_passenger';
  HEADER = environment.header;

  result: any = [];
  constructor(private http: HttpClient, private location: Location) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  loadData() {
    alert('LOADDATA');
    this.getData().subscribe(
      data => { this.result = data; },
      error => {alert('SHIT' + error); },
      () => { alert(this.result[0][`email`]);}
    );
  }

  getData() {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.HEADER
      })
    };

    return this.http.get(this.URL).pipe(
      catchError(e => {
        const status = e.status;
        if(status === 401) {
         // this.notification.showAlert('You are not Authorized for this !');
         console.log(status)
          // alert(status)
        }
        throw new Error(e.message);
      })
    )
  }
}
