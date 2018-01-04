import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiabmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiabmProvider {

  constructor(public http: Http) {
   
  }

  load() {
    this.http.get("").map(r=>r.json());
  }

}
