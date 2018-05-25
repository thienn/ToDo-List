import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Item } from '../../models/Item';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AddItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'add-item.html',
})
export class AddItemPage {
  public itemCollection: AngularFirestoreCollection<Item>;

  // Variables to send to Firebase
  public itemTitle: string = "";
  public itemBody: string = "";
  
  // To read the state while posting
  loading: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
    // Since we are getting the collection data from previous page, we don't need to set up everything again and only need to point / connect to the one we get 
    this.itemCollection = navParams.get('itemCollection');
  }

  addItem() {
    // Loading while it runs
    let loading = this.loadingCtrl.create({ content: "Adding item..."});
    loading.present();

    // Go through the process
    this.itemCollection.add({
      title: this.itemTitle,
      body: this.itemBody,
      status: false, // Status for finished or not should be false by default so no need to invoke it before now
      author: this.af.firestore.app.auth().currentUser.email // For filtering feature + when teams are implemented
    } as Item).then(() => {
      // dismiss loading when ready
      loading.dismiss();
      
      // Clear the fields in case user want to add another entry
      this.itemTitle = "";
      this.itemBody = "";

      // Present sucessful-toast when it's done
      this.toastCtrl.create({
        message: "Item is added to the list!", // Will change later for title, atm cleaning title before able to toast, so would be empty by the time the toast came up
        duration: 2500
      }).present();
    })
    .catch(error => {
      // Toast if something went wrong with the error message
      this.toastCtrl.create({
        message: error,
        duration: 2500
      }).present();
    })
    
  }
}