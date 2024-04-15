"use strict";
var Nothing = /** @class */ (function () {
    function Nothing() {
        this.value = undefined;
    }
    Nothing.prototype.Get = function () {
        return this.value;
    };
    return Nothing;
}());
var Just = /** @class */ (function () {
    function Just(value) {
        this.value = value;
    }
    Just.prototype.Get = function () {
        return this.value;
    };
    return Just;
}());
var Maybe = /** @class */ (function () {
    function Maybe(value) {
        if (value === undefined) {
            this.value = new Nothing();
        }
        else {
            this.value = new Just(value);
        }
    }
    Maybe.prototype.Get = function () {
        return this.value;
    };
    return Maybe;
}());
