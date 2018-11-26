import { Book } from '../models/Book.models';
import { CD } from '../models/CD.models';
import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class MyThingsService {
    private booksList: Book[] = [];
    private cdsList: CD[] = [];
    bookList$ = new Subject<Book[]>();
    cdsList$ = new Subject<CD[]>();

    constructor(private storage: Storage) {
        this.fetchList();
    }

    toogleLent(item: any) {
        item.isLent = !item.isLent
    }

    emitBooks() {
        this.bookList$.next(this.booksList.slice())
    }

    emitCds() {
        this.cdsList$.next(this.cdsList.slice())
    }

    saveBooksDataOnFirebase() {
        return new Promise(
          (resolve, reject) => {
            firebase.database().ref('books').set(this.booksList).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
          }
        );
    }

    retrieveFirebaseBooksData() {
        return new Promise(
            (resolve, reject) => {
              firebase.database().ref('books').once('value').then(
                (data) => {
                  this.booksList = data.val();
                  this.emitBooks();
                  this.saveData();
                  resolve('Chargement des livres terminé');
                },
                (error) => {
                    reject(error);
                }
              );
            }
        );
    }

    saveCdsDataOnFirebase() {
        return new Promise(
          (resolve, reject) => {
            firebase.database().ref('cds').set(this.cdsList).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            )
          }
        );
    }

    retrieveFirebaseCdsData() {
        return new Promise(
            (resolve, reject) => {
              firebase.database().ref('cds').once('value').then(
                (data) => {
                  this.cdsList = data.val();
                  this.emitCds();
                  this.saveData();
                  resolve('Chargement des cds terminé');
                },
                (error) => {
                    reject(error);
                }
              );
            }
        );
    }

    saveData() {
        this.storage.set('books', this.booksList);
        this.storage.set('cds', this.cdsList);
    }

    fetchList() {
        this.storage.get('books').then(
            (bookList) => {
                bookList && bookList.length ? this.booksList = bookList.slice() : 0;
                this.emitBooks();
            }
        ).catch(
            (reason) => {
                console.log(`erreur lors de la recuperation des livres : ${reason}`);
            }
        );

        this.storage.get('cds').then(
            (cdList) => {
                cdList && cdList.length ? this.cdsList = cdList.slice() : 0;
                this.emitCds();
            }
        ).catch(
            (reason) => {
                console.log(`erreur lors de la recuperation des cds : ${reason}`);
            }
        );
    }

    addBook(book: Book) {
        this.booksList.push(book);
        this.saveData();
        this.emitBooks();
    }

    addCd(cd: CD) {
        this.cdsList.push(cd);
        this.saveData();
        this.emitCds();
    }

    setElem(type: string, index: number, dest: string) {
        if (type === 'book') {
            this.booksList[index].destinataire = dest;
            this.booksList[index].isLent = !this.booksList[index].isLent;
        }
        else if (type === 'cd') {
            this.cdsList[index].destinataire = dest;
            this.cdsList[index].isLent = !this.cdsList[index].isLent;
        }
        this.saveData();
        this.emitBooks();
        this.emitCds();
    }
}