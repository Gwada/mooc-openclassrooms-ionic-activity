import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Book } from '../../models/Book.models';
import { MyThingsService } from '../../services/myThings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  book: Book;
  index: number;
  destForm: FormGroup;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private booksService: MyThingsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.book = this.navParams.get('book');
    this.index = this.navParams.get('index');
    
    if (!this.book.isLent) {
      this.initForm();
    }
  }

  initForm() {
    this.destForm = this.formBuilder.group({
      destinataire: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmitForm() {
    const destinataire = this.destForm.get('destinataire').value;
    
    this.booksService.setElem('book', this.index, destinataire);
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleBook() {
    if (this.book.isLent) {
      this.initForm();
      this.booksService.setElem('book', this.index, '');
    }
    else
      this.booksService.setElem('book', this.index, this.book.destinataire);
  }

}
