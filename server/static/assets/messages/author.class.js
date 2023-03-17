export class Author {
    _id

    _username

    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }
}