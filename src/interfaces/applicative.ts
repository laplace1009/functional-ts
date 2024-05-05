import {Functor} from "./functor";
import {TypeOrReturnType} from "../types/types";

/**
 * pure -> static 으로 구현
 */
export interface Applicative<T> extends Functor<T> {
    pure<A>(a: A): Functor<A>
    ap<A>(a: A): Functor<TypeOrReturnType<T>>
}