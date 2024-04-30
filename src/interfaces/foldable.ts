import {List} from "../classes/list/list";

export interface Foldable<T> {
    fold<U>(f: (a: U, b: T) => U, init: U): U
    // fold1(f: (a: T, b: T) => T, init: T, fold: Foldable<T>): T
    // toList(fold: Foldable<T>): Foldable<T>
}