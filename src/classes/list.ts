import {Foldable} from "../interfaces/foldable";
import {Monad} from "../interfaces/monad";
import {assertIsCallable} from "../utils/utils";

export const isNil = <T>(a: List<T>): a is Nil => a.isEmpty()

export abstract class List<T> implements Foldable<T>, Monad<T> {
    abstract isEmpty(): boolean
    abstract head(): T | void
    abstract last(): T | void
    abstract tail(): List<T> | void
    abstract clone(): List<T>
    abstract append<U>(list: List<U> | List<T>): List<U> | List<T>
    abstract length(): number
    abstract fold<U>(f: (a: U, b: T) => U, init: U): U
    abstract map<U>(f: (a: T) => U): List<U>
    abstract applicative<A, B>(a: List<A>): List<B>
    abstract bind<U>(f: (a: T) => List<U>): List<U>
}

export class Nil extends List<never> {
    constructor() {
        super();
    }

    isEmpty(): boolean {
        return true;
    }

    head() {
        throw new Error('empty list');
    }

    last(): void {
        throw new Error('empty list');
    }

    tail(): void {
        throw new Error('empty list');
    }

    clone(): List<never> {
        return new Nil();
    }

    append<U>(list: List<U>) {
        return list
    }

    length(): number {
        return 0;
    }

    fold<U>(f: (a: U, b: never) => U, init: U): U {
        return init
    }

    map<U>(f: (a: never) => U): Nil {
        return new Nil()
    }

    applicative<A, B>(a: List<A>): Nil {
        return new Nil()
    }

    bind(f: (a: never) => Nil): Nil {
        return new Nil()
    }
}

export class Cons<T> extends List<T> {
    constructor(public value: T, public next: List<T>) {
        super()
    }

    isEmpty() {
        return false;
    }

    head() {
        return this.value;
    }

    last() {
        if (isNil(this.next)) return this.value
        return this.next.last()
    }

    tail() {
        return this.next
    }

    clone(): Cons<T> {
        return new Cons(this.value, this.next.clone())
    }

    append(list: List<T>): Cons<T> {
        return new Cons(this.value, this.next.append(list))
    }

    length(): number {
        return 1 + this.next.length()
    }

    fold<U>(f: (a: U, b: T) => U, init: U): U {
        return this.next.fold(f, f(init, this.value))
    }

    map<U>(f: (a: T) => U): Cons<U> {
        return new Cons(f(this.value), this.next.map(f))
    }

    applicative<A, B>(a: List<A>): List<B> {
        assertIsCallable(this.value)
        return a.map(this.value)
    }

    bind<U>(f: (a: T) => List<U>): List<U> {
        return f(this.value)
    }
}

