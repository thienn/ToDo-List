import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore) {
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


}
