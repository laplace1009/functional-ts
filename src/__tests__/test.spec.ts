import {Just, Nothing, Callable} from '../index'


describe('Maybe Monad', () => {
    describe('Just', () => {
        it('should contain a value', () => {
            const just = new Just(5);
            expect(just.getValue()).toEqual(5);
            expect(just.isJust()).toBe(true);
            expect(just.isNothing()).toBe(false);
        });

        it('should map over a Just correctly', () => {
            const just = new Just(3);
            const mapped = just.map(x => x * 2);
            expect(mapped.getValue()).toEqual(6);
        });

        it('should apply a function applicatively when Just holds a function', () => {
            const justFn = new Just((x: number) => x + 5);
            const result = justFn.applicative(10);
            expect(result.getValue()).toEqual(15);
        });

        it('should bind correctly', () => {
            const just = new Just(5);
            const bound = just.bind(x => new Just(x * 2));
            expect(bound.getValue()).toEqual(10);
        });
    });

    describe('Nothing', () => {
        it('should handle operations as Nothing', () => {
            const nothing = new Nothing<number>();
            expect(nothing.getValue()).toBeUndefined();
            expect(nothing.isJust()).toBe(false);
            expect(nothing.isNothing()).toBe(true);
        });

        it('should map to Nothing', () => {
            const nothing = new Nothing<number>();
            const mapped = nothing.map(x => x * 2);
            expect(mapped.isNothing()).toBe(true);
        });

        it('should return Nothing on applicative', () => {
            const nothing = new Nothing<Callable>();
            const result = nothing.applicative(5);
            expect(result.isNothing()).toBe(true);
        });

        it('should bind to Nothing', () => {
            const nothing = new Nothing<number>();
            const bound = nothing.bind(x => new Just(x * 2));
            expect(bound.isNothing()).toBe(true);
        });
    });
});