import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Item } from '../../models/Item';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

/**
 * Generated class for the ArchivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-archive',
  templateUrl: 'archive.html',
})
export class ArchivePage {

  public collection: AngularFirestoreCollection<Item>;
  public items: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private toastCtrl: ToastController) {
    this.collection = af.collection<Item>('items', (ref) => {
      return ref.where('status', '==', true) // Return all the posts where the status field are "true"
    }); 

    this.items = this.collection.snapshotChanges()
    .pipe( map(actions => {
      return actions.map(action => {
        let data = action.payload.doc.data() as Item;
        let id = action.payload.doc.id;

        return {
          id,
          ...data
        }
      })
    }),
    ) 

  }

  undoToDo(item: Item) {
    // Update the field status, on the given ID from false to true (Boolean)
    this.collection.doc(item.id).update({
      status: false
    })
    .then((response) => {
      this.toastCtrl.create({
        message: `Task ${item.title} - undone and moved back Todo-list`,
        duration: 2500
      }).present();
    })
  }


}
