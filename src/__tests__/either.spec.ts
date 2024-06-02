import {Left, Right} from "../classes/either";

describe('Either', () => {
    describe('Left', () => {
        it('isLeft should return boolean', () => {
            const left = new Left<string, number>('error');
            expect(left.isLeft()).toEqual(true);
        });

        it('isRight should return boolean', () => {
            const left = new Left<String, number>('error');
            expect(left.isRight()).toEqual(false);
        });

        it('fromLeft should return is Left value or argument ', () => {
            const left = new Left<string, number>('error');
            expect(left.fromLeft('hello')).toBe('error');
        });

        it('fromRight should return is Right value or argument', () => {
            const left = new Left<string, number>('error');
            expect(left.fromRight('right')).toEqual('right');
        });

        it('map should return is Left value', () => {
            const left = new Left<string, number>('error');
            const mapped = left.map((a) => a * 10);
            expect(mapped.value).toEqual('error');
        });

        it('pure should return is Right', () => {
            const pure = new Left<string, number>('error').pure('right');
            expect(pure instanceof Right).toEqual(true);
            expect(pure.value).toBe('right');
        });

        it('ap should return Left or Right', () => {
            const left = new Left<string, number>('error');
            const apply = left.ap(new Right<string, string>('right'));
            expect(apply instanceof Left).toEqual(true);
            expect(apply.value).toEqual('error');
        });

        it('wrap should return Right', () => {
            const left = new Left<string, number>('error');
            const wrapped = left.wrap('right');
            expect(wrapped instanceof Right).toEqual(true);
            expect(wrapped.value).toEqual('right');
        });

        it('bind should return Left', () => {
            const left = new Left<string, number>('error');
            const bind = left.bind((a) => new Right<string, number>(a * 10));
            expect(bind instanceof Left).toEqual(true);
            expect(bind.value).toEqual('error');
        });
    });

    describe('Right', () => {
        it('isLeft should return boolean', () => {
            const right = new Right<string, number>(10);
            expect(right.isLeft()).toEqual(false);
        });

        it('isRight should return boolean', () => {
            const right = new Right<string, number>(10);
            expect(right.isRight()).toEqual(true);
        });

        it('fromLeft should return is Left value or argument ', () => {
            const right = new Right<string, number>(10);
            expect(right.fromLeft('hello')).toBe('hello');
        });

        it('fromRight should return is Right value or argument', () => {
            const right = new Right<string, number>(10);
            expect(right.fromRight('right')).toEqual(10);
        });

        it('map should return is Left value', () => {
            const right = new Right<string, number>(10);
            const mapped = right.map((a) => a * 10);
            expect(mapped.value).toEqual(100);
        });

        it('pure should return is Right', () => {
            const pure = new Right<string, number>(10).pure('right');
            expect(pure instanceof Right).toEqual(true);
            expect(pure.value).toBe('right');
        });

        it('ap should return Left or Right', () => {
            const right = new Right<string, (a: number) => number>((a) => a * 10);
            const apply = right.ap(new Right<string, number>(33));
            expect(apply instanceof Right).toEqual(true);
            expect(apply.value).toEqual(330);
        });

        it('wrap should return Right', () => {
            const right = new Right<string, number>(10);
            const wrapped = right.wrap('right');
            expect(wrapped instanceof Right).toEqual(true);
            expect(wrapped.value).toEqual('right');
        });

        it('bind should return Left', () => {
            const right = new Right<string, number>(10);
            const bindLeft = right.bind((a) => new Left<string, string>('error'));
            const bindRight = right.bind((a) => new Right<string, number>(a * 10));
            expect(bindRight instanceof Right).toEqual(true);
            expect(bindRight.value).toEqual(100);
            expect(bindLeft instanceof Left).toEqual(true);
            expect(typeof bindLeft.value).toEqual('string')
        });
    });
});