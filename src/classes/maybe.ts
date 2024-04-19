import {Monad} from "../interfaces/monad";
import {Functor} from "../interfaces/functor";
import {Applicative} from "../interfaces/applicative";
import {isCallable, isUndefined} from "../utils/utils";

export abstract class Maybe<T> implements Monad<T> {
    constructor(public value?: T) {}

    abstract map<U>(f: (a: T) => U): Functor<U>
    abstract applicative<A, B>(a: Applicative<A>): Applicative<B>
    abstract bind<U>(f: (value: T) => Monad<U>): Monad<U>
}

export class Just<T> extends Maybe<T> {
    constructor(arg: T) {
        super(arg)
    }

    map<U>(f: (a: T) => U): Maybe<U> {
        if (isUndefined(this.value)) {
            return new Nothing()
        }

        return new Just(f(this.value))
    }

    static pure<U>(arg: U) {
        return new Just<U>(arg);
    }

    applicative<A, B>(a: Maybe<A>): Maybe<B> {
        if (isUndefined(this.value)) {
            return new Nothing()
        }

        if (isCallable(this.value)) {
            return a.map(this.value) as ReturnType<typeof this.value>
        }

        throw new Error('this value is not callable')
    }

    static wrap<U>(arg: U) {
        return this.pure(arg)
    }

    bind<U>(f: (value: T) => Monad<U>): Maybe<U> {
        if (isUndefined(this.value)) {
            return new Nothing()
        }

        return f(this.value)
    }
}

export class Nothing extends Maybe<undefined> {
    map<U>(f: (a: any) => U): Maybe<U> {
        return new Nothing()
    }

    applicative<U>(a: Maybe<any>): Maybe<U> {
        return new Nothing()
    }

    bind<U>(f: (a: any) => Monad<U>): Maybe<U> {
        return new Nothing()
    }
}
