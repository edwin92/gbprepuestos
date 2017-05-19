import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

//import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
   userName: string;
   loggedIn: boolean;
   url = 'http://localhost/proyectosLaravel/crudRepuestos/public';

   constructor(private http: Http) {
      this.userName = '';
      this.loggedIn = false;
   }
   
   login(userInfo) {
      let url = `${this.url}/login`;
      let iJon = JSON.stringify(userInfo);
      let headers = new Headers();
      //headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      return this.http.post(url, userInfo, headers)
      .map(res => res.json())
      .map(res => {
         if (res.success){
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('loggedIn', 'true');
            this.userName = userInfo.user;
            this.loggedIn = true;
         } else {
           localStorage.setItem('loggedIn', 'false');
            this.loggedIn = false;
         }
         return this.loggedIn;
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

   logout(): void {
      localStorage.removeItem('user');
      this.userName = '';
      this.loggedIn = false;
   }

   isLoggedIn() {
     let loggedIn = localStorage.getItem('loggedIn');
     if (loggedIn === 'true') {
       this.loggedIn = true;
     } else {
       this.loggedIn = false;
     }      
      return this.loggedIn;
   }
}