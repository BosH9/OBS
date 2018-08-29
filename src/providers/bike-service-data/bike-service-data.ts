import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

/*
  Generated class for the BikeServiceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikeServiceDataProvider {
  apiAddress:string=`${environment.apiUrl}`;
  //apiAddress:string='http://127.0.0.1:55555/api/';
  //apiAddress:string='http://obstest-001-site1.itempurl.com/api/';
  constructor(public http: HttpClient) {
    console.log('Hello BikeServiceDataProvider Provider');
  }
  bookService(bike){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript',
      'Access-Control-Allow-Origin':'http://191.168.0.108:8100'
    });
    let bikeob=JSON.stringify(bike);
   return this.http.post(this.apiAddress+'BOOKINGSERVICEs',bikeob,{headers})
       .map(res=>res);
 }

 getBookings(userId){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'text/javascript',
    'Access-Control-Allow-Origin':'http://191.168.0.108:8100'
  });
  return this.http.get(this.apiAddress+'GetBOOKINGSERVICEByUserId/'+userId,{headers})
  .map(res=>res);
 }
 getBookingDetails(id){
  return this.http.get(this.apiAddress+'GetORDERByServiceId/'+id)
  .map(res=>res);
 }
 getBookingServiceById(id){
  return this.http.get(this.apiAddress+'BOOKINGSERVICEs/'+id).map(res=>res);
 }
 saveUserAddress(uSERADDRESS){
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'text/javascript',
    'Access-Control-Allow-Origin':'*'
  });
  return this.http.post(this.apiAddress+'USERADDRESSes',uSERADDRESS,{headers})
       .map(res=>res);
 }

}
