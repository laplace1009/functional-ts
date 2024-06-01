import {Monad} from "../interfaces/monad";
import {Foldable} from "../interfaces/foldable";
import {Monoid} from "../interfaces/monoid";
import {NonEmpty} from "../interfaces/nonEmpty";

export abstract class List<T> implements Monad<T>, Foldable<T>, Monoid<T> {
    abstract isEmpty(): boolean
    abstract head(): T
    abstract tail(): List<T>
    abstract length(): number
    abstract filter(predict: (a: T) => boolean): List<T>
    abstract map<A>(fn: (a: T) => A): List<A>
    abstract pure<A>(a: A): List<A>
    abstract ap<A, B>(this: List<(a: A) => B>, a: List<A>): List<B>
    abstract wrap<A>(a: A): List<A>
    abstract bind<A>(fn: (a: T) => List<A>): List<A>
    abstract clone(): List<T>
    abstract append(a: List<T>): List<T>
    abstract fold<A>(fn: (a: A, b: T) => A, init: A): A
    abstract sappend(a: List<T>): List<T>
    abstract mempty(): List<T>
    abstract mappend(a: List<T>): List<T>
    abstract mconcat<U>(this: List<List<U>>): List<U>
}

export class Nil<T> extends List<T> {
    constructor() {
        super();
    }
    isEmpty(): boolean {
        return true;
    }

    head(): T {
        throw new TypeError('empty list');
    }

    tail(): List<T> {
        throw new TypeError('empty list');
    }

    length(): number {
        return 0;
    }

    filter(predict: (a: T) => boolean): Nil<T> {
        return new Nil<T>();
    }

    map<A>(fn: (a: T) => A): Nil<A> {
        return new Nil<A>();
    }

    pure<A>(a: A): Cons<A> {
        return new Cons<A>(a, new Nil<A>());
    }

    ap<A, B>(this: Nil<(a: A) => B>, a: List<A>): Nil<B> {
        return new Nil<B>();
    }

    wrap<A>(a: A): Cons<A> {
        return this.pure<A>(a);
    }

    bind<A>(fn: (a: T) => List<A>): Nil<A> {
        return new Nil<A>();
    }

    clone(): Nil<T> {
        return new Nil<T>();
    }

    append(a: List<T>): List<T> {
        return a;
    }

    fold<A>(fn: (a: A, b: T) => A, init: A): A {
        return init;
    }

    sappend(a: List<T>): List<T> {
        const newList = this.clone();
        return newList.append(a);
    }

    mempty(): Nil<T> {
        return new Nil<T>();
    }

    mappend(a: List<T>): List<T> {
        return this.sappend(a);
    }

    mconcat<U>(this: Nil<Nil<U>>): Nil<U> {
        return new Nil<U>();
    }
}

export class Cons<T> extends List<T> implements NonEmpty {
    constructor(public readonly value: T, public readonly next: List<T>) {
        super();
    }

    isEmpty(): boolean {
        return false;
    }

    head(): T {
        return this.value;
    }

    tail(): List<T> {
        return this.next.clone();
    }

    length(): number {
        return 1 + this.next.length();
    }

    filter(predict: (a: T) => boolean): List<T> {
        return predict(this.value) ?
            new Cons<T>(this.value, this.next.filter(predict)) : this.next.filter(predict);
    }

    map<A>(fn: (a: T) => A): Cons<A> {
        return new Cons(fn(this.value), this.next.map(fn));
    }

    pure<A>(a: A): Cons<A> {
        return new Cons<A>(a, new Nil<A>());
    }

    ap<A, B>(this: Cons<(a: A) => B>, a: List<A>): List<B> {
        return a.map(this.value);
    }

    wrap<A>(a: A): Cons<A> {
        return this.pure<A>(a);
    }

    bind<A>(fn: (a: T) => List<A>): List<A> {
        return concat(this.map(fn));
    }

    clone(): Cons<T> {
        return new Cons<T>(this.value, this.next.clone());
    }

    append(a: List<T>): Cons<T> {
        return new Cons<T>(this.value, this.next.append(a));
    }

    fold<A>(fn: (a: A, b: T) => A, init: A): A {
        return this.next.fold(fn, fn(init, this.value));
    }

    sappend(a: List<T>): Cons<T> {
        return this.append(a);
    }

    mempty(): Nil<T> {
        return new Nil<T>();
    }

    mappend(a: List<T>): List<T> {
        return this.sappend(a);
    }

    mconcat<U>(this: Cons<List<U>>): List<U> {
        return concat(this);
    }
}

export const isCons = <T>(a: List<T>): a is Cons<T> => a instanceof Cons;

export const concat = <T> (list: Foldable<List<T>>): List<T> => {
    return list.fold((acc: List<T>, cur: List<T>) => acc.append(cur), new Nil<T>());
}

export const concatMap = <T, U> (fn: (a: T) => List<U>, list: Foldable<T>): List<U> => {
    return list.fold((acc: List<U>, cur: T) => acc.append(fn(cur)), new Nil<U>())
}

export const mconcat = <T> (list: List<Monoid<T>>, init: Monoid<T>): T => {
    return list.fold((acc: Monoid<T>, cur: Monoid<T>) => acc.mappend(cur), init) as T;
}