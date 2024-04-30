import {Monad} from "../../interfaces/monad"
import {assertCallable} from "../../utils/utils"

export abstract class Maybe<T> implements Monad<T> {
    abstract map<U>(f: (a: T) => U): Nothing | Just<U>
    abstract applicative<A, B>(a: Nothing | Just<A>): Nothing | Just<B>
    abstract bind<U>(f: (value: T) => Nothing | Just<U>): Nothing | Just<U>
}

export class Nothing extends Maybe<never> {
    map<U>(f: (a: never) => U): Nothing {
        return new Nothing()
    }

    applicative<U>(a: Nothing | Just<U>): Nothing {
        return new Nothing()
    }

    bind<U>(f: (a: U) => Nothing | Just<U>): Nothing {
        return new Nothing()
    }
}

export class Just<T> extends Maybe<T> {
    constructor(public value: T) {
        super()
    }

    map<U>(f: (a: T) => U): Just<U> {
        return new Just(f(this.value))
    }

    static pure<U>(arg: U) {
        return new Just<U>(arg);
    }

    applicative<A, B>(a: Nothing | Just<A>): Nothing | Just<B> {
        assertCallable(this.value)
        return a.map(this.value)
    }

    static wrap<U>(arg: U): Just<U> {
        return this.pure(arg)
    }

    bind<U>(f: (value: T) => Nothing | Just<U>): Nothing | Just<U> {
        return f(this.value)
    }
}

