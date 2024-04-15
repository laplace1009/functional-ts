import { Maybe, Just, Nothing } from "../index";

describe('Maybe Monad Tests', () => {
    test('Nothing should return undefined', () => {
        const nothing = new Nothing();
        expect(nothing.Get()).toBeUndefined();
    });

    test('Just should return the contained value', () => {
        const just = new Just(123);
        expect(just.Get()).toBe(123);
    });

    test('Maybe should handle undefined with Nothing', () => {
        const maybeNothing = new Maybe(undefined);
        expect(maybeNothing.Get()).toBeInstanceOf(Nothing);
    });

    test('Maybe should handle value with Just', () => {
        const maybeJust = new Maybe(456);
        expect(maybeJust.Get()).toBeInstanceOf(Just);
    });
});