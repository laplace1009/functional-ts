import {Foldable} from "./foldable";
import {Functor} from "./functor";
import {Applicative} from "./applicative";

export interface Traversable<T> extends Functor<T>, Foldable<T> {
    traverse<A>(fn: (a: T) => Applicative<A>, a: Foldable<T>): Applicative<Foldable<A>>
}