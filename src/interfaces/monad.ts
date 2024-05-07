import {Applicative} from "./applicative";
import {CallableAtoB} from "../types/types";

export interface Monad<T> extends Applicative<T> {
    wrap<A>(a: A): Monad<A>
    bind<A>(f: CallableAtoB<T, Monad<A>>): Monad<T> | Monad<A>
}