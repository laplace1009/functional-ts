export interface Functor<T> {
    map<A>(fn: (a: T) => A): Functor<A>
}
