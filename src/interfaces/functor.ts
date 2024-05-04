import {CallableAtoB} from "../types/types";

export interface Functor<T> {
    map<A>(f: CallableAtoB<T, A>): Functor<A>
}