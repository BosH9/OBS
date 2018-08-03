import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BikeDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikeDataProvider {
  data:any;
  constructor(public http: HttpClient) {
    console.log('Hello BikeDataProvider Provider');
  }
  getBikes(){
     const params = new HttpParams()
    .set('Access-Control-Allow-Origin' , '*')
    .set('content-type','application/json')
    .set('Accept','application/json')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    return this.http.get('http://localhost:57203/api/Bikes',{params})
        .map(res=>res);
  }
  processData(data: any) {
    this.data = data;
  }
}
