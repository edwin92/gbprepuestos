import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//import 'rxjs/add/operator/map';

@Injectable()
export class SaveService {
   dato: string[];
   url = 'http://localhost/proyectosLaravel/crudRepuestos/public';

   constructor(private http: Http) {}
   
   saveCard(ListCard: any, valorTotal: any, btnComprar: any, User: any) {
      let url = `${this.url}/pedido/crear`;
      let iJon = JSON.stringify({'ListCard': ListCard, 'valorTotal': valorTotal, 'btnComprar': btnComprar,'User': User});
      let headers = new Headers();
      //headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this.http.post(url, {ListCard, valorTotal, btnComprar, User}, headers)
      .map(res => res.json())
      .map(res => {
         if (res.success){
             return res;
         } else {
             return false;
         }
         
      })
      .catch(this.handleError);
   }


   private handleError (error: Response | any) {
    console.log("entro al error");
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}