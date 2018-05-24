import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  // Simple object to use for auth
  public user = {
    username: "",
    password: ""
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {


  }

    // Refactor this into own component later on 
    // Set up loading that covers the screen while the rest run in the background
    // When done, make a toast message if successful with logging in or registering
    // Alert if there is anything wrong

  loginUser() {
    // Present loading the moment the user click the button (starting the method)
    let loading = this.loadingCtrl.create({ content: "Logging in..."});
    loading.present();

    this.af.firestore.app.auth()
      .signInWithEmailAndPassword(this.user.username, this.user.password)
      .then(response => {
        // Dismiss loading then make a toast if successful
        loading.dismiss();

        this.toastCtrl.create({
          message: "You are now logged in as " + this.user.username,
          duration: 2500
        }).present();

      })
      .catch(error => {
        // If error dismiss loading then use alert for message on why
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: "Error with login process",
          subTitle: error, // Message based on what error comes back
          buttons: ['Close']
        });
        alert.present();
      })
    }

  registerUser() {
    // Present loading the moment the user click the button (starting the method)
    let loading = this.loadingCtrl.create({ content: "Creating user..."});
    loading.present();

    this.af.firestore.app.auth()
      .createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then(response => {
        // Dismiss loading then make a toast if successful
        loading.dismiss();

        this.toastCtrl.create({
          message: "You successfully created user " + this.user.username,
          duration: 2500
        }).present();

      })
      .catch(error => {
        // If error dismiss loading then use alert for message on why
        loading.dismiss();

        let alert = this.alertCtrl.create({
          title: "Error with registering process",
          subTitle: error, // Message based on what error comes back
          buttons: ['Close']
        });
        alert.present();
      })
  }
}
