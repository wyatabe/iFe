import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://179.190.29.69:3000/usuario/';

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(body, type, token?) {
    console.log(body);
    console.log(token);

    let headerJson:any = {'Content-Type': 'application/json'};
    if (token) {
      headerJson.Authorization = token;
      console.log(headerJson);
    }

    return new Promise((resolve, reject) => {
      this.http.post(apiUrl + type, body, {headers: headerJson}).subscribe(
        data => {
          resolve(data);
        },
        error => {
          let errorMsg = error.error;
          let msg = "";

          if (errorMsg instanceof Array) {
            msg = "<ol>";
            errorMsg.forEach(element => {
              msg += "<li>" + element.msg + "</li>";
            });
            msg += "</ol>";

          } else {
            msg = JSON.stringify(errorMsg);
            console.log(errorMsg);
          }

          reject(msg);
        }
      );
    });
  }

}