export interface Foldable<T> {
    fold<A>(f: (a: A, b: T) => A, init: A): A
    // fold1(f: (a: T, b: T) => T, init: T, fold: Foldable<T>): T
    // toList(fold: Foldable<T>): Foldable<T>
}