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

  // Item variables to use for population during update process
  public itemTitleUpdate = "";
  public itemBodyUpdate = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    // Connect itemCollection to the collection we get from parameters from previous page
    this.itemCollection = navParams.get('itemCollection');
    // Connect item variable to the item that got sent like collection
    this.item = navParams.get('item');

    // Populating the variables for whne update is called upon. 
    this.itemTitleUpdate = this.item.title;
    this.itemBodyUpdate = this.item.body;
  }

  updateItem() {
      // https://forum.ionicframework.com/t/how-to-get-the-data-from-alert-prompt/43779 - Help on retrieving data from inputs
      console.log(this.itemTitleUpdate);
      console.log(this.itemBodyUpdate);
      // Alert box(Prompt) to input title & Text (show the current one)
      let alert = this.alertCtrl.create({
        title: 'Update Task',
        message: 'Modify the fields and click update when done. Input Title & Message',
        inputs: [
          {
            name: 'Title',
            value: this.itemTitleUpdate // Populate it with the old data in case you only want to modify a bit
          },
          {
            name: 'Text',
            value: this.itemBodyUpdate // Populate it with the old data in case you only want to modify a bit
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked')
            }
          },
          {
           text: 'Update',
           handler: data => {
            // Data from input-fields
            console.log(data.Title);
            console.log(data.Text);

            // Old item variables pre-connecting
            console.log(this.itemTitleUpdate);
            console.log(this.itemBodyUpdate);

            // Connect the two variables
            this.itemTitleUpdate = data.Title;
            this.itemBodyUpdate = data.Text;
            
            // Run the update query to Firebase
            this.itemCollection.doc(this.item.id).update({
              title: this.itemTitleUpdate,
              body: this.itemBodyUpdate
            } as Item)
            .then((response) => {
              // Make a quick toast confirmation message then send back to list to see the updated version
              this.toastCtrl.create({
                message: 'Task updated',
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
