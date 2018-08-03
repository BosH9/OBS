import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BikeServiceDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BikeServiceDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BikeServiceDataProvider Provider');
  }
  bookService(bike){
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
    });
    let bikeob=JSON.stringify(bike);
   return this.http.post('http://localhost:57203/api/BOOKINGSERVICEs',bikeob,{headers})
       .map(res=>res);
 }

 getBookings(userId){
  return this.http.get('http://localhost:57203/api/GetBOOKINGSERVICEByUserId',userId)
  .map(res=>res);
 }
}
