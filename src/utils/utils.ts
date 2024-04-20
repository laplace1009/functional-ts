import {Callable} from "../types/types";

export const isUndefined = (a: unknown): a is undefined => a === undefined
export const isCallable = (f: unknown): f is Callable => typeof f === 'function'
export const isNotUndefinedAndCallable = (a: unknown): a is Callable => a !== undefined && typeof a === "function"

export function assertIsCallable(a: unknown): asserts a is Callable {
    if (a === undefined) {
        throw new Error('value is not callable')
    }
}
export function assertIsEmptyList<T>(arg: T | undefined): asserts arg is T {
    if (typeof arg === 'undefined') {
        throw new Error('empty list')
    }
}