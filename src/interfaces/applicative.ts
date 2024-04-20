import {Functor} from "./functor";

/**
 * pure -> static 으로 구현
 */
export interface Applicative<F> extends Functor<F> {
    // pure<T>(value: T): Applicative
    applicative<A, B>(a: Applicative<A>): Applicative<B>
}