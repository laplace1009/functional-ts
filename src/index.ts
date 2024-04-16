type IsNothingType<T> = T extends undefined ? undefined : T

export interface Functor<T> {
    map<U>(f:(value: T) => U): Functor<U>
}

export interface Applicative<T> extends Functor<T>{
    pure: (value: T) => Applicative<T>
    applicative<U>(f: (value: T) => U): Applicative<U>
}

export interface Monad<T> extends Applicative<T>{
    lift: (value: T) => Monad<T>;
    bind<U>(f: (value: T) => Monad<U>): Monad<U>
}

export class Nothing<T> {
    private value: unknown

    constructor() {
        this.value = undefined
    }

    IsNothing(): this is Nothing<T> {
        return true
    }

    IsJust(): this is Just<T> {
        return false
    }

    Get() {
        return this.value
    }
}

export class Just<T> {
    private value

    constructor(value: T) {
        this.value = value
    }

    IsNothing(): this is Nothing<T> {
        return false
    }

    IsJust(): this is Just<T> {
        return true;
    }

    Get() {
        return this.value
    }
}

export class Maybe<T> implements Monad<T> {
    private value: Nothing<T> | Just<T>

    constructor(value: undefined | T) {
        if (value === undefined) {
            this.value = new Nothing()
        } else {
            this.value = new Just(value)
        }
    }

    Get() {
        return this.value
    }

    Map<U>(f: (value: T) => U): Maybe<U> {
        if (this.value.IsNothing()) {
            return new Maybe<U>(undefined)
        }

        return new Maybe<U>(f(this.value.Get()))
    }
}