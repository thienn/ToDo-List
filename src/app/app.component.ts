import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AccountPage } from '../pages/account/account';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  // Connect to child to get access to navigation due to the fact that navigation get from root therefore cant inject
  //  https://ionicframework.com/docs/api/navigation/NavController/#navigating-from-the-root-component
  @ViewChild(Nav) nav: Nav;

  // Array to store the name and page related to menu to access with openPage
  pages: Array<{title: string, component: any}>;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, af: AngularFirestore) {
    const authObserver = af.firestore.app.auth().onAuthStateChanged(
      (user) => {

        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = 'LoginPage';
        }
      }
    )


      // Array-liste som genererer side menyen, med link til siden. + (Lukk meny på slutten i app.HTML som er utenfor array, så den alltid er på slutten og konstant)
      this.pages = [
        { title: 'Homescreen', component: HomePage},
        { title: 'Account', component: AccountPage},
        { title: 'Archive', component: 'Unknown' }
      ];


    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  // 
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

