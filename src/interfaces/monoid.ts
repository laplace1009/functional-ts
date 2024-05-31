import {SemiGroup} from "./semigroup";
export interface Monoid<T> extends SemiGroup<T> {
    // mempty(): Monoid<T>
    mappend(a: Monoid<T>): Monoid<T>
    // mconcat(a: List<Monoid<T>>): Monoid<T>
}