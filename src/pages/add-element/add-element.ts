import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Book } from '../../models/Book.models';
import { CD } from '../../models/CD.models';
import { MyThingsService } from '../../services/myThings.service';

@Component({
  selector: 'page-add-element',
  templateUrl: 'add-element.html',
})
export class AddElementPage implements OnInit {

  elemetType: string;
  elementForm: FormGroup;
  newElement: Book | CD;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private myThingsService: MyThingsService) { }

  ngOnInit() {
    this.elemetType = this.navParams.get('element');

    this.initForm();
  }

  initForm() {
    this.elementForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      author: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmitForm() {
    const name = this.elementForm.get('name').value;
    const author = this.elementForm.get('author').value;

    if (this.elemetType === 'livre') {
      this.newElement = new Book(name, author);
      this.myThingsService.addBook(this.newElement);
    }
    else {
      this.newElement = new CD(name, author);
      this.myThingsService.addCd(this.newElement);
    }
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

}
