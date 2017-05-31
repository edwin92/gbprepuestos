import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { TemporalService } from '../../providers/temporal.service';
import { AuthService } from '../../providers/auth.service';
import { SaveService } from '../../providers/save.service';

@Component({
  selector: 'page-card-pre-kids',
  templateUrl: 'card-pre-kids.html',
})
export class CardPreKidsPage {
  ListCard: string[] = [];
  valorTotal: any = 0;
  eliminado = false;
  btnComprar = 'Comprar';
  User: any = {};
  showTotal = true;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private serTemporal: TemporalService, 
              private serAuth: AuthService,
              public toastCtrl: ToastController,
              private serSave: SaveService,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.ListCard = this.serTemporal.GetCar() || []; 
    this.valorTotal = this.serTemporal.ValorCar();
    let User = this.serAuth.GetUser();
    this.User = User;
    if (User['tipo'] === "Tecnico Cliente") {
      this.btnComprar = 'Solicitar';
      this.showTotal = false;
    }
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
          let j : number = Number(i); 
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

  saveCompras(){
    let resultado: any;
    this.serSave.saveCard(this.ListCard, this.valorTotal, this.btnComprar, this.User).subscribe(
      rs => resultado = rs,
      er => console.log(er),
      () => {
        if (resultado){
          const toast = this.toastCtrl.create({
            message: 'Se ha solicitado la compra de los Kits.',
            duration: 3000
          });
          toast.present();
          this.serTemporal.DeleteCar();
          this.ionViewDidLoad();
          this.eliminado = true;
          /*this.navCtrl.setRoot(HomePage)
          .then(data => console.log(data),
          error => console.log(error));*/
        } else {
          console.log('Acceso denegado');
        }
      }
    )

  }
}
