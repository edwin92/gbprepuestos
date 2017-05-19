import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ListService } from '../../providers/list.service';

/**
 * Generated class for the ItemFilterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-item-filter',
  templateUrl: 'item-filter.html',
})
export class ItemFilterPage {

 tracks: Array<{name: string, isChecked: boolean}> = [];

  constructor(
    public confData: ListService,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let item = this.navParams.data;
    item.item.forEach(trackName => {
        this.tracks.push({
          name: trackName.nombre,
          isChecked: (item.item.indexOf(trackName.nombre) === -1)
        });
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
    console.log("en applyFilters",item);
    this.dismiss(item);
  }

  dismiss(data?: any) {
    // using the injected ViewController this page
    // can "dismiss" itself and pass back data
    console.log("en dimiss",data);
    this.viewCtrl.dismiss(data);
  }

}
