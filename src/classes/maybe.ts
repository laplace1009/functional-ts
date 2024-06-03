import {Monad} from "../interfaces/monad";
import {Cons, isCons, List, Nil} from "./list";
import {Monoid} from "../interfaces/monoid";
import {Foldable} from "../interfaces/foldable";

export const isJust = <T>(a: Maybe<T>): a is Just<T> => a instanceof Just

abstract class Maybe<T> implements Monad<T>, Monoid<T>, Foldable<T> {
    static catMaybes<T>(a: List<Maybe<T>>): List<T> {
        const helper = (acc: List<T>, cur: List<Maybe<T>>): List<T> => {
            if (isCons(cur)) {
                if (isJust<T>(cur.value)) {
                    const newList = new Cons<T>(cur.value.value, acc)
                    return helper(newList, cur.next);
                }
                return helper(acc,cur.next);
            }
            return acc;
        }
        return helper(new Nil<T>(), a);
    }

    abstract isNothing(): boolean
    abstract isJust(): boolean
    abstract fromJust<A>(a: A): A | T
    abstract fromMaybe<A>(a: A): A | T
    abstract maybeToList(): List<T>
    abstract map<A>(fn: (a: T) => A): Maybe<A>
    abstract ap<A, B>(this: Maybe<(a: A) => B>, a: Maybe<A>): Maybe<B>
    abstract bind<A>(fn: (a: T) => Maybe<A>): Maybe<A>
    abstract sappend(a: Maybe<T>): Maybe<T>
    abstract mempty(): Maybe<T>
    abstract mappend(a: Maybe<T>): Maybe<T>
    abstract fold<A>(fn: (a: A, b: T) => A, init: A): A
}

export class Nothing<T> extends Maybe<T> {
    isNothing(): boolean {
        return true;
    }

    isJust(): boolean {
        return false;
    }

    fromJust<A>(a: A): T {
        throw new TypeError('this is not instanceOf Just');
    }

    fromMaybe<A>(a: A): A {
        return a;
    }

    maybeToList(): Nil<T> {
        return new Nil<T>();
    }

    map<A>(fn: (a: T) => A): Nothing<A> {
        return new Nothing<A>();
    }

    static pure<A>(a: A): Just<A> {
        return new Just<A>(a);
    }

    ap<A, B>(this: Nothing<(a: A) => B>, a: Maybe<A>): Nothing<B> {
        return new Nothing<B>();
    }

    static wrap<A>(a: A): Just<A> {
        return this.pure(a);
    }

    bind<A>(fn: (a: T) => Maybe<A>): Nothing<A> {
        return new Nothing<A>();
    }

    sappend(a: Nothing<T>): Nothing<T>
    sappend(a: Just<T>): Just<T>
    sappend(a: Maybe<T>): Maybe<T> {
        if (isJust(a)) {
            return new Just<T>(a.value);
        }
        return new Nothing<T>();
    }

    mempty(): Maybe<T> {
        return new Nothing<T>();
    }

    mappend(a: Nothing<T>): Nothing<T>
    mappend(a: Just<T>): Just<T>
    mappend(a: Maybe<T>): Maybe<T> {
        if (isJust(a)) {
            return new Just<T>(a.value);
        }
        return new Nothing<T>();
    }

    fold<A>(fn: (a: A, b: T) => A, init: A): A {
        return init;
    }
}

export class Just<T> extends Maybe<T> {
    constructor(public readonly value: T) {
        super();
    }

    isNothing(): boolean {
        return false;
    }

    isJust(): boolean {
        return true;
    }

    fromJust<A>(a: A): T {
        return this.value;
    }

    fromMaybe<A>(a: A): T {
        return this.value;
    }

    maybeToList(): Cons<T> {
        return new Cons<T>(this.value, new Nil<T>());
    }

    map<A>(fn: (a: T) => A): Just<A> {
        return new Just<A>(fn(this.value));
    }

    static pure<A>(a: A): Just<A> {
        return new Just<A>(a);
    }

    ap<A, B>(this: Just<(a: A) => B>, a: Maybe<A>): Maybe<B> {
        return a.map(this.value);
    }

    static wrap<A>(a: A): Just<A> {
        return this.pure(a);
    }

    bind<A>(fn: (a: T) => Maybe<A>): Maybe<A> {
        return fn(this.value);
    }

    sappend(a: Maybe<T>): Just<T> {
        if (isJust(a)) {
            return new Just<T>(mappend(this.value, a));
        }
        return new Just<T>(this.value);
    }

    mempty(): Nothing<T> {
        return new Nothing<T>();
    }

    mappend(a: Nothing<T>): Just<T>
    mappend(a: Just<T>): Just<T>
    mappend(a: Maybe<T>): Maybe<T> {
        return this.sappend(a);
    }

    fold<A>(fn: (acc: A, b: T) => A, init: A): A {
        return fn(init, this.value);
    }
}

const mappend = (a: any, b: any) => a.mappend(b.value);
