import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, List } from 'ionic-angular';

import { ItemFilterPage } from '../item-filter/item-filter';

import { ListService } from '../../providers/list.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;
  
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  lista: string[];
  excludeTracks: any = [];
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  shownSessions: any = [];
  groups: any = [];
  confDate: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicio:ListService,
    public modalCtrl: ModalController,) {
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
    this.servicio.GetList().subscribe(
      (result) => {
        if(result.success){
          this.lista=result.list;
          console.log(this.lista);
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

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    /*this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });*/
  }

  presentFilter(item) {
    let modal = this.modalCtrl.create(ItemFilterPage, item);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        /*this.excludeTracks = data;
        this.updateSchedule();*/
        console.log(data);
      }
    });

  }
}
