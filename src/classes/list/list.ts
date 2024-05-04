
import {Monad} from "../../interfaces/monad";
import {assertCallable} from "../../utils/utils";
import {TypeOrReturnType} from "../../types/types";
import {Foldable} from "../../interfaces/foldable";

export abstract class List<T> implements Foldable<T>, Monad<T>, NonEmpty {
    abstract isEmpty(): boolean
    abstract head(): T
    abstract last(): T
    abstract tail(): List<T>
    abstract clone(): List<T>
    abstract append(list: List<T>) : List<T>
    abstract length(): number
    abstract filter(predict: (a: T) => boolean): List<T>
    abstract fold<U>(f: (a: U, b: T) => U, init: U): U
    abstract map<U>(f: (a: T) => U): List<U>
    abstract ap<A>(a: A): List<TypeOrReturnType<T>>
    abstract bind<U>(f: (a: T) => List<U>): List<U>
}

export class Nil<T> extends List<T> {
    constructor() {
        super();
    }

    isEmpty(): boolean {
        return true;
    }

    head(): T {
        throw new TypeError('Empty List');
    }

    last(): T {
        throw new TypeError('Empty List');
    }

    tail(): List<T> {
        throw new TypeError('Empty List');
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

    map<U>(f: (a: T) => U): Nil<U> {
        return new Nil<U>()
    }

    ap<A>(a: A): List<TypeOrReturnType<T>> {
        throw new TypeError('Empty List');
    }

    bind<U>(f: (a: T) => Nil<U>): Nil<U> {
        return new Nil()
    }
}

export class Cons<T> extends List<T> {
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

    ap<A>(a: A): List<TypeOrReturnType<T>>  {
        assertCallable(this.value)
        if (a instanceof List) {
            return a.map(this.value)
        }
        throw new TypeError('Argument is not a List');
    }

    bind<U>(f: (a: T) => List<U>): List<U> {
        return concat(this.map(f))
    }
}

const concat= <T>(list: Cons<List<T>>) => {
    return list.fold((a:List<T>, b:List<T>) => a.append(b), new Nil())
}