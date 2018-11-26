import { Component } from '@angular/core';
import { MenuController, LoadingController, ToastController } from 'ionic-angular';
import { MyThingsService } from '../../services/myThings.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private menuCtrl: MenuController,
              private mythingsService: MyThingsService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController) { }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onLoadData() {
    let booksLoader = this.loadingCtrl.create({ content:'Chargement des livres en cours ...' });
    let cdsLoader = this.loadingCtrl.create({ content: 'Chargement des cds en cours ...' });

    booksLoader.present();
    this.mythingsService.retrieveFirebaseBooksData().then(
      () => {
        booksLoader.dismiss();
        this.toastCtrl.create({
          message: 'Livres récupérés !',
          duration: 3000,
          position: 'bottom'
        }).present();

        cdsLoader.present();
        this.mythingsService.retrieveFirebaseCdsData().then(
          () => {
            cdsLoader.dismiss();
            this.toastCtrl.create({
              message: 'Cds récupérés !',
              duration: 3000,
              position: 'bottom'
            }).present();
          }
        ).catch(
          (error) => {
            console.log(`erreur lors du chargement des cds : ${error}`);
          }
        );
      }
    ).catch(
      (error) => {
        booksLoader.dismiss();
        this.toastCtrl.create({
          message: `erreur lors du chargement des livres : ${error}`,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  onSaveData() {
    this.mythingsService.saveBooksDataOnFirebase().then(
      () => {
        console.log('Livres sauvegardées sur firebase');
      },
      (error) => {
        console.log(error);
      }
    );
    this.mythingsService.saveCdsDataOnFirebase().then(
      () => {
        console.log('Cds sauvegardées sur firebase');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
