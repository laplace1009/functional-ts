import {Monad} from "../interfaces/monad";
import {List, Nil} from "./list";

export abstract class Tree<T> implements Monad<T> {
    abstract map<A>(fn: (a: T) => A): Tree<A>
    abstract pure<A>(a: A): Tree<A>
    abstract ap<A, B>(this: Tree<(a: A) => B>, a: Tree<A>): Tree<B>
    abstract wrap<A>(a: A): Tree<A>
    abstract bind<A>(fn: (a: T) => Tree<A>): Tree<A>
}

export class Node<T> extends Tree<T> {
    constructor(public readonly label: T, public subForest: List<Node<T>>) {
        super();
    }

    map<A>(fn: (a: T) => A): Node<A> {
        return new Node<A>(fn(this.label), this.subForest.map((a: Node<T>) => a.map(fn)));
    }

    pure<A>(a: A): Node<A> {
        return new Node<A>(a, new Nil<Node<A>>());
    }

    ap<A, B>(this: Node<(a: A) => B>, a: Node<A>): Node<B> {
        return a.map(this.label)
    }

    wrap<A>(a: A): Node<A> {
        return this.pure(a)
    }

    bind<A>(fn: (a: T) => Node<A>): Node<A> {
        return new Node<A>(fn(this.label).label, this.subForest.map((a: Node<T>) => a.bind(fn)))
    }
}
