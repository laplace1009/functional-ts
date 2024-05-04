import {Functor} from "./functor";
import {TypeOrReturnType} from "../types/types";

/**
 * pure -> static 으로 구현
 */
export interface Applicative<T> extends Functor<T> {
    // pure<T>(value: T): Applicative
    ap<A>(a: A): Functor<TypeOrReturnType<T>>
}