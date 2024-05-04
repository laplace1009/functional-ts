import {Monad} from "../../interfaces/monad"
import {assertCallable} from "../../utils/utils"
import {TypeOrReturnType} from "../../types/types";

export abstract class Maybe<T> implements Monad<T> {
    abstract map<A>(f: (a: T) => A): Maybe<A>
    abstract ap<A>(a: A): Maybe<TypeOrReturnType<T>>
    abstract bind<A>(f: (value: T) => Maybe<A>): Maybe<A>
}

export class Nothing<T> extends Maybe<T> {
    map<A>(f: (a: T) => A): Nothing<A> {
        return new Nothing<A>()
    }

    ap<A>(a: A): Nothing<TypeOrReturnType<T>> {
        return new Nothing<TypeOrReturnType<T>>()
    }

    bind<A>(f: (a: T) => Nothing<A>): Nothing<A> {
        return new Nothing<A>()
    }
}

export class Just<T> extends Maybe<T> {
    constructor(public readonly value: T) {
        super()
    }

    map<A>(f: (a: T) => A): Just<A> {
        return new Just<A>(f(this.value))
    }

    static pure<A>(arg: A): Just<A> {
        return new Just<A>(arg);
    }

    ap<A>(a: A): Maybe<TypeOrReturnType<T>> {
        assertCallable(this.value)
        if (a instanceof Maybe) {
            return a.map(this.value)
        }
        throw new TypeError('Argument is not a Maybe');
    }

    static wrap<A>(arg: A): Just<A> {
        return this.pure<A>(arg)
    }

    bind<U>(f: (value: T) => Maybe<U>): Maybe<U> {
        return f(this.value)
    }
}

