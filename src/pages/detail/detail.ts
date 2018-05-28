import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    // Connect itemCollection to the collection we get from parameters from previous page
    this.itemCollection = navParams.get('itemCollection');
    // Connect item variable to the item that got sent like collection
    this.item = navParams.get('item');

  }

  updateItem() {

  }

  deleteItem() {
    this.itemCollection.doc(this.item.id).delete()
      .then((reponse) => {
        this.toastCtrl.create({
          message: "Task deleted - " + this.item.title,
          duration: 2500
        }).present();

        this.navCtrl.pop();
      })
      .catch(error => {
        this.toastCtrl.create({
          message: "Error with deleting: " + error,
          duration: 2500
        }).present();
        this.navCtrl.pop();
      })
  } 

}
