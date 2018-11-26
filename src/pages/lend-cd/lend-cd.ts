import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { CD } from '../../models/CD.models';
import { MyThingsService } from '../../services/myThings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit
{

  cd: CD;
  index: number;
  destForm: FormGroup;

  constructor(public navParams: NavParams,
              private viewCtrl: ViewController,
              private cdsService: MyThingsService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cd = this.navParams.get('cd');
    this.index = this.navParams.get('index');
  
    !this.cd.isLent ? this.initForm() : null;
  }

  initForm() {
    this.destForm = this.formBuilder.group({
      destinataire: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmitForm() {
    const destinataire = this.destForm.get('destinataire').value;

    this.cdsService.setElem('cd', this.index, destinataire);
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }

  onToggleCd() {
    if (this.cd.isLent) {
      this.initForm();
      this.cdsService.setElem('cd', this.index, '');
    }
    else
      this.cdsService.setElem('book', this.index, this.cd.destinataire);
  }

}
