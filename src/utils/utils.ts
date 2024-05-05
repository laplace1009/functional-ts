import {Callable} from "../types/types";
import {Cons, List} from "../classes/list/list";

export const isUndefined = (a: unknown): a is undefined => a === undefined
export const isCallable = (f: unknown): f is Callable => typeof f === 'function'
export const isNotUndefinedAndCallable = (a: unknown): a is Callable => a !== undefined && typeof a === "function"

export function assertCallable(a: unknown): asserts a is Callable {
    if (typeof a !== 'function') {
        throw new Error('value is not callable')
    }
}

export function assertT<T>(arg: T | undefined): asserts arg is T {
    if (typeof arg === 'undefined') {
        throw new Error('empty list')
    }
}

export function assertIs2DList<T>(list: Cons<T> | Cons<List<T>>): asserts list is Cons<List<T>> {
    if (!(list instanceof Cons)) {
        throw new TypeError(`Expected a non-empty list, got ${typeof list}`);
    }
    if (list.isEmpty() || !(list.head() instanceof List)) {
        throw new TypeError('Expected a non-empty, 2-dimensional list; either an empty list or a list with incorrect item type was provided.');
    }
}