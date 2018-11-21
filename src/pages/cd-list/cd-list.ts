import { Component } from '@angular/core';
import { MyThingsService } from '../../services/myThings.service';
import { CD } from '../../models/CD.models';
import { ModalController, MenuController } from 'ionic-angular';
import { LendCdPage } from '../lend-cd/lend-cd';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage {

  cdsList: CD[] = [];

  constructor(private cdService: MyThingsService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.cdsList = this.cdService.cdsList;
  }

  onLoadCd(index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
