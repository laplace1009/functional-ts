import {Just, Nothing} from '../classes/maybe'
import {Applicative} from "../interfaces/applicative";

describe('Maybe Monad', () => {
    describe('Just', () => {
        it('should map correctly', () => {
            const justFive = new Just(5);
            const mapped = justFive.map(x => x * 2);
            expect(mapped instanceof Just).toBeTruthy();
            expect(mapped.value).toEqual(10);
        });

        it('should return Nothing when mapped with undefined value', () => {
            const nothing = new Nothing()
            const mapped = nothing.map(x => x * 2);
            expect(mapped instanceof Nothing).toBeTruthy();
        });

        it('should handle applicative correctly when function is stored', () => {
            const justFn = new Just((x: number) => x + 5);
            const justThree = new Just(3)
            const applicativeResult: Applicative<number> = justFn.applicative(justThree);
            expect(applicativeResult instanceof Just).toBeTruthy();
            // expect(applicativeResult.value).toEqual(8);
        });

        it('should throw error if non-callable is used in applicative', () => {
            const justFive = new Just(5);
            expect(() => justFive.applicative(new Just(3))).toThrow('this value is not callable');
        });

        it('should bind correctly', () => {
            const justFive = new Just(5);
            const bound = justFive.bind(x => new Just(x * 2));
            expect(bound instanceof Just).toBeTruthy();
            // expect(bound.value).toEqual(10);
        });

        it('should return Nothing when bind is called with undefined', () => {
            const justUndefined = new Nothing()
            const bound = justUndefined.bind(x => new Just(x * 2));
            expect(bound instanceof Nothing).toBeTruthy();
        });
    });

    describe('Nothing', () => {
        it('should return Nothing when map is called', () => {
            const nothing = new Nothing();
            const mapped = nothing.map(x => x * 2);
            expect(mapped instanceof Nothing).toBeTruthy();
        });

        it('should return Nothing when applicative is called', () => {
            const nothing = new Nothing();
            const applicativeResult = nothing.applicative(new Just(3));
            expect(applicativeResult instanceof Nothing).toBeTruthy();
        });

        it('should return Nothing when bind is called', () => {
            const nothing = new Nothing();
            const bound = nothing.bind(x => new Just(x * 2));
            expect(bound instanceof Nothing).toBeTruthy();
        });
    });
});