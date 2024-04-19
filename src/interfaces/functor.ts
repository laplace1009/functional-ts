export interface Functor<F> {
    map<G>(f: (a: F) => G): Functor<G>
}