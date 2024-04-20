import {Monad} from "../interfaces/monad";
import {assertIsCallable} from "../utils/utils";

export abstract class Maybe<T> implements Monad<T> {
    abstract map<U>(f: (a: T) => U): Maybe<U>
    abstract applicative<A, B>(a: Maybe<A>): Maybe<B>
    abstract bind<U>(f: (value: T) => Maybe<U>): Maybe<U>
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

    applicative<A, B>(a: Maybe<A>): Maybe<B> {
        assertIsCallable(this.value)
        return a.map(this.value)
    }

    static wrap<U>(arg: U) {
        return this.pure(arg)
    }

    bind<U>(f: (value: T) => Just<U>): Just<U> {
        return f(this.value)
    }
}

export class Nothing extends Maybe<never> {
    map<U>(f: (a: never) => U): Nothing {
        return new Nothing()
    }

    applicative(a: Maybe<unknown>): Nothing {
        return new Nothing()
    }

    bind<U>(f: (a: never) => Maybe<U>): Nothing {
        return new Nothing()
    }
}
