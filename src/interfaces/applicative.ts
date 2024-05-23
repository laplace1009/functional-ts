import {Functor} from "./functor";

export interface Applicative<T> extends Functor<T> {
    pure<A>(a: A): Functor<A>
    ap<A, B>(this: Functor<(a: A) => B>, a: Functor<A>): Functor<B>
}