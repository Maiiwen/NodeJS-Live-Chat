export class Message {
    _message

    _date

    _author

    constructor(message, date, author) {
        this.message = message;
        this.date = date;
        this.author = author;
    }

    get message() {
        return this._message;
    }

    set message(message) {
        this._message = message;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        this._author = author;
    }
}