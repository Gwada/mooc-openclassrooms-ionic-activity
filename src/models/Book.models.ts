export class Book {

    public isLent: boolean;
    public destinataire: string;

    constructor(public name: string, public author: string) {
        this.isLent = false;
    }
}