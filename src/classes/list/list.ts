import {Foldable} from "../../interfaces/foldable";
import {Monad} from "../../interfaces/monad";
import {assertCallable, assertIs2DList} from "../../utils/utils";
import {Monoid} from "../../interfaces/monoid";
import {TypeOrReturnType, Unit} from "../../types/types";

export abstract class List<T> implements Foldable<T>, Monad<T>, Monoid<T> {
    abstract isEmpty(): boolean

    abstract head(): T

    abstract last(): T

    abstract tail(): List<T>

    abstract clone(): List<T>

    abstract append(list: List<T>): List<T>

    abstract length(): number

    abstract filter(predict: (a: T) => boolean): List<T>

    abstract fold<U>(f: (a: U, b: T) => U, init: U): U

    abstract map<U>(f: (a: T) => U): List<U>

    abstract pure<A>(a: A): List<A>

    abstract ap<A>(a: A): List<TypeOrReturnType<T>>

    abstract wrap<A>(a: A): List<A>

    abstract bind<U>(f: (a: T) => List<U>): List<U>

    abstract sappend(a?: NonEmpty): List<T>

    abstract mempty(): List<T>

    abstract mappend(a: List<T>): List<T>

    abstract mconcat(): Unit | List<T>
}

export class Nil<T> extends List<T> {
    constructor() {
        super();
    }

    isEmpty(): boolean {
        return true;
    }

    head(): T {
        throw new Error('empty list');
    }

    last(): T {
        throw new Error('empty list');
    }

    tail(): List<T> {
        throw new Error('empty list');
    }

    clone(): Nil<T> {
        return new Nil<T>();
    }

    append(list: List<T>): List<T> {
        return list;
    }

    length(): number {
        return 0;
    }

    filter(f: (a: T) => boolean): Nil<T> {
        return new Nil<T>();
    }

    fold<A>(f: (a: A, b: T) => A, init: A): A {
        return init;
    }

    pure<A>(arg: A): Cons<A> {
        return new Cons<A>(arg, new Nil<A>())
    }

    map<U>(f: (a: T) => U): Nil<U> {
        return new Nil<U>()
    }

    ap<A>(a: A): List<TypeOrReturnType<T>> {
        throw new TypeError('empty list');
    }

    wrap<A>(arg: A): Cons<A> {
        return this.pure<A>(arg);
    }

    bind<U>(f: (a: T) => Nil<U>): Nil<U> {
        return new Nil()
    }

    sappend(a?: NonEmpty): Nil<T> {
        throw new TypeError('Empty List');
    }

    mempty<U>(): Nil<U> {
        return new Nil<U>()
    }

    mappend(a: List<T>): List<T> {
        return this.append(a)
    }

    mconcat(): Unit {
        return;
    }
}

export class Cons<T> extends List<T> implements NonEmpty {
    constructor(public value: T, public next: List<T>) {
        super()
    }

    isEmpty(): boolean {
        return false;
    }

    head(): T {
        return this.value;
    }

    last(): T {
        if (this.next instanceof Nil) return this.value
        return this.next.last()
    }

    tail(): List<T> {
        return this.next
    }

    clone(): Cons<T> {
        return new Cons<T>(this.value, this.next.clone())
    }

    append(list: List<T>): Cons<T> {
        return new Cons<T>(this.value, this.next.append(list));
    }

    length(): number {
        return 1 + this.next.length()
    }

    filter(predict: (a: T) => boolean): List<T> {
        if (predict(this.value)) {
            return new Cons<T>(this.value, this.next.filter(predict))
        }

        return this.next.filter(predict)
    }

    fold<U>(f: (a: U, b: T) => U, init: U): U {
        return this.next.fold(f, f(init, this.value))
    }

    map<U>(f: (a: T) => U): Cons<U> {
        return new Cons(f(this.value), this.next.map(f))
    }

    pure<A>(a: A): Cons<A> {
        return new Cons<A>(a, new Nil<A>())
    }

    ap<A>(a: A): List<TypeOrReturnType<T>>  {
        assertCallable(this.value)
        if (a instanceof List) {
            return a.map(this.value)
        }
        throw new TypeError('argument is not a list');
    }

    wrap<A>(a: A): Cons<A> {
        return this.pure(a)
    }

    bind<U>(f: (a: T) => List<U>): List<U> {
        return concat(this.map(f))
    }

    sappend(a: Cons<T>): Cons<T> {
        return this.append(a)
    }

    mempty<U>(): Nil<U> {
        return new Nil<U>()
    }

    mappend(a: List<T>): List<T> {
        return this.append(a)
    }

    mconcat(): List<T> {
        assertIs2DList(this)
        return concat(this)
    }
}

export const concat = <T>(list: Cons<List<T>>) => {
    return list.fold((a:List<T>, b:List<T>) => a.append(b), new Nil())
}

