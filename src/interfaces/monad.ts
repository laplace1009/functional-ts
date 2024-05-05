import {Applicative} from "./applicative";
import {CallableAtoB} from "../types/types";

/**
 * lift -> static 으로 구현
 */
export interface Monad<T> extends Applicative<T> {
    // lift<U>(value: U): Monad<U>
    wrap<A>(a: A): Monad<A>
    bind<A>(f: CallableAtoB<T, Monad<A>>): Monad<A>
}
