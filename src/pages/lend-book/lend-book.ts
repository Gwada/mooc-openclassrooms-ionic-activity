import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../models/Book.models';
import { MyThingsService } from '../../services/myThings.service';

/**
 * Generated class for the LendBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage {

  index: number;
  book: Book;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private booksService: MyThingsService) {
  }

  ngOnInit(): void {
    this.index = this.navParams.get('index');
    this.book = this.booksService.booksList[this.index];
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleBook() {
    this.booksService.toogleLent(this.book);
  }

}
