import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, List, Refresher, ToastController } from 'ionic-angular';

import { ItemFilterPage } from '../item-filter/item-filter';
import { CardPreKidsPage } from '../card-pre-kids/card-pre-kids'

import { ListService } from '../../providers/list.service';
import { TemporalService } from '../../providers/temporal.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  lista: string[] = [];
  excludeTracks: any = [];
  dayIndex = 0;
  queryText = '';
  segment = 'kits';
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  totalCard: number = 0;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicio:ListService,
    private serTemporal: TemporalService,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

  }

  ngOnInit() {
    let resultCart = this.serTemporal.GetCar() || [];
    try {
      this.totalCard = resultCart.length;
    } catch (error) {
      this.totalCard = 0;
    }
    this.servicio.GetList().subscribe(
      (result) => {
        if(result.success){
          this.lista=result.list;
          try{
            this.lista.forEach(datofor => {
              resultCart.filter(list =>{
                if (datofor["kit"].id === list.lista.kit.id) {
                  datofor["mostrar"] = true;
                }
              });
            });
          }catch(e){
            console.log("error tri filter --->");
          }
        }else{
          alert("Algo salio mal");
        }
      },
      ()=>console.log(this.lista)
    );
  }

  ngRefresh() {
    let resultCart = this.serTemporal.GetCar() || [];
    try {
      this.totalCard = resultCart.length;
    } catch (error) {
      this.totalCard = 0;
    }
    this.servicio.GetListSinCache().subscribe(
      (result) => {
        if(result.success){
          this.lista=result.list;
          try{
            this.lista.forEach(datofor => {
              resultCart.filter(list =>{
                if (datofor["kit"].id === list.lista.kit.id) {
                  datofor["mostrar"] = true;
                }
              });
            });
          }catch(e){
            console.log("error tri filter --->");
          }
        }else{
          alert("Algo salio mal");
        }
      },
      ()=>console.log(this.lista)
    );
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }
  presentFilter(item) {
    // Edwin mira aqui estas pasando el item osea tienes como manipular la vista solo tienes q pasarle este mismo iten modificado 
    let modal = this.modalCtrl.create(ItemFilterPage, item);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        //este es el dato que trae cuando cierrras el filtro aqui es donde debes modificar el item para  q cambie la visual exitos papa
        console.log(data);
        item.descontar = data.length;
        item.datos = data; 
        if (!item.mostrar) {
          item.mostrar = true
          this.totalCard = this.serTemporal.PostCar(item);
        }else{
          try{
            let resultCart = this.serTemporal.GetCar() || [];
            this.lista.forEach(datofor => {
              resultCart.filter(list =>{
                if (datofor["kit"].id === list.lista.kit.id) {
                  list.lista.datos = item.datos;
                  list.lista.descontar = data.length;
                }
              });
            });
            this.serTemporal.PostCompleteCar(resultCart);
          }catch(e){
            console.log("error tri filter --->");
          }
          //console.log(item);
        }               
      }
    });
  }

  presentCard() {
    let modal = this.modalCtrl.create(CardPreKidsPage);
    modal.present();

    modal.onWillDismiss((data: any) => {
      if (data) {
        this.ngRefresh();
        console.log(data);
      }
    });
  }

  doRefresh(refresher: Refresher) {
    this.ngRefresh();
    setTimeout(() => {
      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Se han actualizado los Kits.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }
  //GetListSinCache
}
