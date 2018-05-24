import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/Item';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  public item: Item;
  public itemCollection: AngularFirestoreCollection<Item>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // Connect itemCollection to the collection we get from parameters from previous page
    this.itemCollection = navParams.get('itemCollection');
    // Connect item variable to the item that got sent like collection
    this.item = navParams.get('item');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
