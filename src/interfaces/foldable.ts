export interface Foldable<T> {
    fold<A>(fn: (a: A, b: T) => A, init: A): A
}