import {Applicative} from "./applicative";
import {Foldable} from "./foldable";

interface Traversable<T> extends Applicative<T>, Foldable<T>{
    // traverse :: (Traversable t, Applicative f) => (a -> f b) -> t a -> f (t b)
    // sequenceA:: (Traversable t, Applicative f) => t (f a) -> f (t a)
}