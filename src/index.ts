import {Functor} from "./interfaces/functor";

export const map = <A, B>(f: (a: A) => B, value: Functor<A>) => value.map(f)