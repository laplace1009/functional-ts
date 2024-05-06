import {Semi} from "./semigroup";
import {Unit} from "../types/types";

export interface Monoid<T> extends Semi<T> {
    mempty<U>(): Monoid<U>
    mappend(a: Monoid<T>): Monoid<T>
    mconcat(): Unit | Monoid<T>
}