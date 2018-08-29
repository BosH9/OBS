import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
/*
  Generated class for the BikeDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikeDataProvider {
  data:any;
  apiAddress:string=`${environment.apiUrl}`;
  //apiAddress:string='http://127.0.0.1:55555/api/';
  //apiAddress:string='http://obstest-001-site1.itempurl.com/api/';
  constructor(public http: HttpClient) {
    console.log('Hello BikeDataProvider Provider');
  }
  getBikes(){
     const params = new HttpParams()
    .set('Access-Control-Allow-Origin' , '*')
    .set('content-type','application/json')
    .set('Accept','application/json')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    return this.http.get(this.apiAddress+'Bikes',{params})
        .map(res=>res);
  }
  processData(data: any) {
    this.data = data;
  }
}
