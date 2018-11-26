import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, MenuController } from 'ionic-angular';
import { Book } from '../../models/Book.models';
import { MyThingsService } from '../../services/myThings.service';
import { LendBookPage } from '../lend-book/lend-book';
import { AddElementPage } from '../add-element/add-element';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})
export class BookListPage implements OnInit, OnDestroy {

  booksList: Book[] = [];
  booksListSubscription: Subscription;

  constructor(private bookService: MyThingsService,
              private modalCtrl: ModalController,
              private menuCtrl: MenuController) { }

  ngOnInit() {
    this.booksListSubscription = this.bookService.bookList$.subscribe(
      (books: Book[]) => {
        this.booksList = books;
      }
    );

    this.bookService.emitBooks();
  }

  ionViewWillEnter() {
    this.bookService.emitBooks();
  }

  onLoadBook(book: Book, index: number) {
    const modal = this.modalCtrl.create(LendBookPage, {book: book, index: index});

    modal.present();
  }

  onAddElement() {
    const modal = this.modalCtrl.create(AddElementPage, {element: 'livre'});

    modal.present();
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  ngOnDestroy() {
    this.booksListSubscription.unsubscribe();
  }

}
