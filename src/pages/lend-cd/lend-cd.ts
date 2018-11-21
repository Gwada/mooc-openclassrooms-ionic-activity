import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CD } from '../../models/CD.models';
import { MyThingsService } from '../../services/myThings.service';

/**
 * Generated class for the LendCdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  index: number;
  cd: CD;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private cdsService: MyThingsService) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.cd = this.cdsService.cdsList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    this.cdsService.toogleLent(this.cd);
  }

}
