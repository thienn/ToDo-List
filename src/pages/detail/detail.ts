import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    // Connect itemCollection to the collection we get from parameters from previous page
    this.itemCollection = navParams.get('itemCollection');
    // Connect item variable to the item that got sent like collection
    this.item = navParams.get('item');

  }

  updateItem() {

  }

  deleteItem() {
    let alert = this.alertCtrl.create({
      title: 'You are about to delete a task permanently',
      message: `Are you sure you want to delete task ${this.item.title}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.itemCollection.doc(this.item.id).delete()
            .then((reponse) => {
              this.toastCtrl.create({
                message: `Task ${this.item.title} deleted`,
                duration: 2500
              }).present();
      
              this.navCtrl.pop();
            })
            .catch(error => {
              this.toastCtrl.create({
                message: `Error with deleting: ${error}`,
                duration: 2500
              }).present();
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    alert.present();
  } 

}
