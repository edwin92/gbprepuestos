import { Injectable }                              from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import {Observable}                                from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable() 
export class ListService {
     url = 'http://localhost/proyectosLaravel/crudRepuestos/public';
     private headers = new Headers({'Content-Type':'application/json','Accept':'application/json'});
     private options = new RequestOptions({ headers: this.headers });
     data: any;

     constructor(private http: Http) { }

    

     GetList(){
        if (this.data) {
            return Observable.of(this.data);
        }else{
            let url = `${this.url}/listkit`;
            //let token = localStorage.getItem("auth_token");
            return this.http
                .get(url)
                .map(r=>r.json())
                .map((res) => {
                    this.data = res;
                    //console.log(res);
                    return res;
                })
                .catch(this.handleError);
        }
     }

     private handleError (error: Response | any) {
        //console.log("entro al error");
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        //console.error(errMsg);
        return Observable.throw(errMsg);
     }
}