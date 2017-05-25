import { Component, Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ListService } from '../../providers/list.service';


@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html',
})
export class ItemFilterPage {

 tracks: Array<{name: string, sistema: string, cantidad: number, item: number, kit_id: number, isChecked: boolean}> = [];

  constructor(
    public confData: ListService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let item = this.navParams.data;
    let resItem: string[] = [];
    
    item.item.forEach( dato => {
        //let resItem = item.datos.filter(book => {book === dato.nombre}); 
        try{
          resItem = item.datos.filter(book => book === dato.nombre); 
        }catch(e){
          console.log("error --->");
        }
        if (resItem.length > 0) {
          this.tracks.push({
            name: dato.nombre,
            sistema: dato.sistema,
            cantidad: dato.cantidad,
            item: dato.item,
            kit_id: dato.kit_id,
            isChecked: (item.item.indexOf(dato.nombre) === 1)
          });
        }else{
          this.tracks.push({
            name: dato.nombre,
            sistema: dato.sistema,
            cantidad: dato.cantidad,
            item: dato.item,
            kit_id: dato.kit_id,
            isChecked: (item.item.indexOf(dato.nombre) === -1)
          });
        }
        
    });
  }

  resetFilters() {
    // reset all of the toggles to be checked
    this.tracks.forEach(track => {
      track.isChecked = true;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    let item = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(item);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }

}
