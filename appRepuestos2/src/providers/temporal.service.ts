import { Injectable }                              from '@angular/core';
import {Observable}                                from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable() 
export class TemporalService {
     data: any = [];
     totalValor: any = 0;

     constructor() { }

     GetCar(){
        let tempCar = localStorage.getItem('carro');
        this.data = JSON.parse(tempCar);
        return this.data;
     }

     ValorCar(){
        this.totalValor = 0;
        let valor: any = 0;
        let tempCar = localStorage.getItem('carro');
        this.data = JSON.parse(tempCar) || [];
        this.data.forEach((dato: any) => {
            valor = 0;
            dato.lista.item.forEach((item: any) => {
                valor = Number(item.valor)+Number(valor);
            });
            if (dato.lista.descontar === 0) {
                let ciento = dato.lista.kit.descuento;
                ciento=ciento.toString().replace(',','.');
                valor=valor.toString().replace(',','.');
                let resultado=Number(ciento)*Number(valor)/100;
                let total = Math.round((Number(valor)-Number(resultado)) *100)/100; 
                this.totalValor = Number(this.totalValor) + Number(total);
            }else{
                this.totalValor = Number(this.totalValor) + Number(valor);
            }
        });
        this.totalValor = this.totalValor.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        this.totalValor = this.totalValor.split('').reverse().join('').replace(/^[\.]/,'');
        return this.totalValor;
     }

     PostCar(lista){
        let tempCar = localStorage.getItem('carro');
        this.data = JSON.parse(tempCar)  || [];
        this.data.push({lista});
        localStorage.setItem('carro', JSON.stringify(this.data));
        return this.data.length;
     }

     PostCompleteCar(lista){
        localStorage.setItem('carro', JSON.stringify(lista));
     }

     
}