import {Functor} from "./functor";

/**
 * pure -> static 으로 구현
 */
export interface Applicative<F> extends Functor<F> {
    // 언어 특성상 static 으로 따로 구현해야함
    // pure<T>(value: T): Applicative
    applicative<A, B>(a: Applicative<A>): Applicative<B>
}