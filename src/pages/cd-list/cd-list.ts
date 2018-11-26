import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyThingsService } from '../../services/myThings.service';
import { CD } from '../../models/CD.models';
import { ModalController, MenuController } from 'ionic-angular';
import { LendCdPage } from '../lend-cd/lend-cd';
import { AddElementPage } from '../add-element/add-element';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-cd-list',
  templateUrl: 'cd-list.html',
})
export class CdListPage implements OnInit, OnDestroy {

  cdsList: CD[] = [];
  cdsListSubscription: Subscription;

  constructor(private cdService: MyThingsService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.cdsListSubscription = this.cdService.cdsList$.subscribe(
      (cd: CD[]) => { this.cdsList = cd; }
    );

    this.cdService.fetchList();
  }

  ionViewWillEnter() {
    this.cdService.emitCds();
  }

  onLoadCd(cd: CD, index: number) {
    let modal = this.modalCtrl.create(LendCdPage, {cd: cd, index: index});

    modal.present();
  }

  onAddElement() {
    const modal = this.modalCtrl.create(AddElementPage, {element: 'cd'});

    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    this.cdsListSubscription.unsubscribe();
  }
}
