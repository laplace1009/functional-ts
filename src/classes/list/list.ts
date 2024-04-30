import {Foldable} from "../../interfaces/foldable";
import {Monad} from "../../interfaces/monad";
import {assertCallable} from "../../utils/utils";
import {Unit} from "../../types/types";

export abstract class List<T> implements Foldable<T>, Monad<T> {
    abstract isEmpty(): boolean
    abstract head(): T | Unit
    abstract last(): T | Unit
    abstract tail(): Cons<T> | Nil | Unit
    abstract clone(): Cons<T> | Nil
    abstract append<U>(list: Cons<T> | Cons<U> | Nil) : Cons<T> | Cons<U> | Nil
    abstract length(): number
    abstract filter<U>(predict: (a: T | U) => boolean): Nil | Cons<T>
    abstract fold<U>(f: (a: U, b: T) => U, init: U): U
    abstract map<U>(f: (a: T) => U): Cons<U> | Nil
    abstract applicative<A, B>(a: Nil | Cons<A>): Cons<B> | Nil
    abstract bind<U>(f: (a: T) => Nil | Cons<U>): Nil | Cons<U>
}

export class Nil extends List<never> {
    constructor() {
        super();
    }

    isEmpty(): boolean {
        return true;
    }

    head(): void {
        throw new Error('empty list');
    }

    last(): void {
        throw new Error('empty list');
    }

    tail(): void {
        throw new Error('empty list');
    }

    clone(): Nil {
        return new Nil();
    }

    append<U>(list: Nil | Cons<U>): Nil | Cons<U> {
        if (isNil(list)) return list
        else if (isCons(list)) return list
        return list
    }

    length(): number {
        return 0;
    }

    filter<U>(f: (a: U) => boolean): Nil {
        return new Nil();
    }

    fold<U>(f: (a: U, b: never) => U, init: U): U {
        return init
    }

    map<U>(f: (a: never) => U): Nil {
        return new Nil()
    }

    applicative<A, B>(a: Nil | Cons<A>): Nil {
        return new Nil()
    }

    bind<U>(f: (a: U) => Cons<U>): Nil {
        return new Nil()
    }
}

export class Cons<T> extends List<T> {
    constructor(public value: T, public next: Nil | Cons<T>) {
        super()
    }

    isEmpty(): boolean {
        return false;
    }

    head(): T {
        return this.value;
    }

    last(): T {
        if (isNil(this.next)) return this.value
        return this.next.last()
    }

    tail(): Nil | Cons<T> {
        if (isNil(this.next)) return this
        return this.next
    }

    clone(): Cons<T> {
        return new Cons(this.value, this.next.clone())
    }

    append(list: Nil | Cons<T>): Cons<T> {
        if (isNil(list)) {
            return this.clone()
        }
        if (isNil(this.next)) {
            return new Cons(this.value, this.next.append(list))
        }
        return new Cons(this.value, this.next.append(list))
    }

    length(): number {
        return 1 + this.next.length()
    }

    filter(predict: (a: T) => boolean): Nil | Cons<T> {
        if (predict(this.value)) return new Cons(this.value, this.next.filter(predict))
        return this.next.filter(predict)
    }

    fold<U>(f: (a: U, b: T) => U, init: U): U {
        return this.next.fold(f, f(init, this.value))
    }

    map<U>(f: (a: T) => U): Cons<U> {
        return new Cons(f(this.value), this.next.map(f))
    }

    applicative<A, B>(a: Nil | Cons<A>): Nil | Cons<B> {
        assertCallable(this.value)
        return a.map(this.value)
    }

    bind<U>(f: (a: T) => Nil | Cons<U>): Nil | Cons<U> {
        return concat(this.map(f))
    }
}

export const concat = <T>(list: Cons<Nil | Cons<T>>): Nil | Cons<T> => {
    return list.fold((a: Nil | Cons<T>, b: Nil | Cons<T>) => a.append(b), new Nil())
}

export const isNil = <T>(a: Nil | Cons<T>): a is Nil => a instanceof Nil

export const isCons = <T>(a: Nil | Cons<T>): a is Cons<T> => a instanceof Cons
