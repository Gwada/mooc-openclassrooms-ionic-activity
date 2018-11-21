export class Book {

    public isLent: boolean;

    constructor(public name: string, public author: string) {
        this.isLent = false;
    }
}