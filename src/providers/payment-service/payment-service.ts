import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PaymentServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://192.168.10.53:8080/api/credit-payment/';

@Injectable()
export class PaymentServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PaymentServiceProvider Provider');
  }

  postData(data, type) {
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, data, {headers: {'Content-Type': 'application/json'}}).subscribe(
        msg => {
          resolve(msg);
        },
        error => {
          let errorMsg = error.error;
          console.log(errorMsg);
          reject(errorMsg);
        }
      );
    });
  }

}
