import { Book } from "../models/Book.models";
import { CD } from "../models/CD.models";

export class MyThingsService
{
    booksList: Book[] = [
        new Book('AngularJs', 'Michel Martin'),
        new Book('Angular 6 for Entreprise-Ready Web Applications', 'Doguhan Uluca'),
        new Book('Ionic: Hybrid Mobile App Development', 'Rahat Khanna, Sani Yusuf et Hoc Phan'),
        new Book('Hybrid Mobile Development with Ionic', 'Gaurav Saini')
    ];
    cdsList: CD[] = [
        new CD('Lithopédion', 'Damso'),
        new CD('Phoenix', 'Soprano'),
        new CD('Jvlivs', 'Sch'),
        new CD('Trône', 'Booba')
    ];

    toogleLent(item: {name: string, author: string, isLent: boolean}) {
        item.isLent = !item.isLent;
    }
}