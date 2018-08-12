import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BikeServiceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikeServiceDataProvider {
  //apiAddress:string='http://127.0.0.1:55555/api/';
  apiAddress:string='http://obstest-001-site1.itempurl.com/api/';
  constructor(public http: HttpClient) {
    console.log('Hello BikeServiceDataProvider Provider');
  }
  bookService(bike){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
    });
    let bikeob=JSON.stringify(bike);
   return this.http.post(this.apiAddress+'BOOKINGSERVICEs',bikeob,{headers})
       .map(res=>res);
 }

 getBookings(userId){
  return this.http.get(this.apiAddress+'GetBOOKINGSERVICEByUserId/'+userId)
  .map(res=>res);
 }
 getBookingDetails(id){
  return this.http.get(this.apiAddress+'GetORDERByServiceId/'+id)
  .map(res=>res);
 }
 getBookingServiceById(id){
  return this.http.get(this.apiAddress+'BOOKINGSERVICEs/'+id).map(res=>res);
 }

}
