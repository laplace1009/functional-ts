import {Applicative} from "./applicative";

export interface Monad<T> extends Applicative<T> {
    // wrap<A>(a: A): Monad<A>
    bind<A>(fn: (a: T) => Monad<A>): Monad<A>
}
