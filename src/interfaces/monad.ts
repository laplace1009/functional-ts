import {Applicative} from "./applicative";

/**
 * lift -> static 으로 구현
 */
export interface Monad<M> extends Applicative<M> {
    // lift<U>(value: U): Monad<U>
    bind<N>(f: (value: M) => Monad<N>): Monad<N>
}
