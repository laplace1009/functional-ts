import { Functor } from "./interfaces/functor";
export declare const map: <A, B>(f: (a: A) => B, value: Functor<A>) => Functor<B>;
