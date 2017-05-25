import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TemporalService } from '../../providers/temporal.service';

@Component({
  selector: 'page-card-pre-kids',
  templateUrl: 'card-pre-kids.html',
})
export class CardPreKidsPage {
  ListCard: string[] = [];
  valorTotal: any = 0;
  eliminado = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private serTemporal: TemporalService, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.ListCard = this.serTemporal.GetCar() || []; 
    this.valorTotal = this.serTemporal.ValorCar();
  }

  dismiss(data?: any) {  
    if (this.eliminado) {
      this.viewCtrl.dismiss("Eliminado"); 
    }else{
      this.viewCtrl.dismiss();
    }
  }

  deleteItem(){
    try{
      let respallist = this.ListCard.slice(0);
      for (let i in this.ListCard) {
        var element = this.ListCard[i];
        if (this.ListCard[i]["check"]) {
          console.log("eliminar i ---> ",i);
          let j : number = Number(i); 
          console.log("eliminar j ---> ",j);
          respallist.splice(j);
        }
      }
      this.serTemporal.PostCompleteCar(respallist);
      this.ListCard = respallist;
      this.ionViewDidLoad();
      this.eliminado = true;
    }catch(e){
      console.log("error tri filter --->");
    }
  }
}
