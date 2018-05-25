import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Item } from '../../models/Item';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs';
 import { map } from "rxjs/operators";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: AngularFirestoreCollection<Item>;
  public items: Observable<Item[]>;

  constructor(public navCtrl: NavController, private af: AngularFirestore) {

    this.collection = af.collection<Item>("items"); // Connecting to the collection in Firebase called items

    /* Pre RXJS 6. For reference
    this.items = this.collection.snapshotChanges() // With Observable for realtime look for changes.
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Item;
          let id = action.payload.doc.id;

          return { // returns ID and the rest of the items while spreading them
            id,
            ...data
          };
        });
      });
      
      */

      // New syntax after RXJS 6.
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

  itemSelected(item: Item) {
    this.navCtrl.push('DetailPage', {
      item,
      itemCollection: this.collection
    })
  }

  logout() {
    this.af.firestore.app.auth().signOut();
  }

  goToAddItemPage() {
    this.navCtrl.push('AddItemPage', {
      itemCollection: this.collection
    })
  }

  finishToDo(item: Item) {
    // Update the field status, on the given ID from false to true (Boolean)
    this.collection.doc(item.id).update({
      status: true
    });
  }

}
