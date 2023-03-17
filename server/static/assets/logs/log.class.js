export class Log {
    __id
    _ip
    _date
    _path

    constructor(id, ip, date, path) {
        this._id = id;
        this.ip = ip;
        this.date = date;
        this.path = path;
    }

    get _id() {
        return this.__id;
    }

    set _id(id) {
        this.__id = id;
    }

    get ip() {
        return this._ip;
    }

    set ip(ip) {
        this._ip = ip;
    }

    get date() {
        return this._date;
    }

    set date(date) {
        this._date = date;
    }

    get path() {
        this._path;
    }

    set path(path) {
        this._path = path;
    }
}