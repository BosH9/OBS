import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment} from '../../environments/environment';
/*
  Generated class for the FindDistanceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FindDistanceProvider {
  apiAddress:string=`${environment.apiUrl}`;
  constructor(public http: HttpClient) {
    console.log('Hello FindDistanceProvider Provider');
  }
  getUserAddressByUserId(userId:number){
    return this.http.get(this.apiAddress+'GetUSERADDRESSByUserId/'+userId)
             .map(res=>res);
  }

}
