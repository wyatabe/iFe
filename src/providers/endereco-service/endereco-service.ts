import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the EnderecoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = 'http://179.190.29.69:3000/endereco/';

@Injectable()
export class EnderecoServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EnderecoServiceProvider Provider');
  }

  postData(cep, type) {
    console.log(cep);
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl + type + "/" + cep).subscribe(
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