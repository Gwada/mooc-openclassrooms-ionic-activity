import { Component } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Book } from '../../models/Book.models';
import { MyThingsService } from '../../services/myThings.service';
import { LendBookPage } from '../lend-book/lend-book';

/**
 * Generated class for the BookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage {

  booksList: Book[] = [];

  constructor(private bookService: MyThingsService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.booksList = this.bookService.booksList;
  }

  onLoadBook(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, {index: index});
    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

}
