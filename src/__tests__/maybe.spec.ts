import {Just, Nothing} from "../classes/maybe";
import {Cons, Nil} from "../classes/list";
import {Product, Sum} from "../classes/numeric";

describe('Maybe Monad', () => {
    describe('Nothing', () => {
        it('should return Nothing when isNothing and isJust is called', () => {
            const nothing = new Nothing<number>();
            expect(nothing.isNothing()).toBe(true);
            expect(nothing.isJust()).toBe(false);
        });

        it('should return Nothing when fromJust is called', () => {
            const nothing = new Nothing<number>();
            expect(() => { nothing.fromJust(1); })
                .toThrow(TypeError);

            expect(() => { nothing.fromJust(1); })
                .toThrow('this is not instanceOf Just');
        });

        it('should return Nothing when fromMaybe is called', () => {
            const nothing = new Nothing<number>();
            expect(nothing.fromMaybe(1)).toBe(1);
        });

        it('should return Nothing when maybeToList is called', () => {
            const nothing = new Nothing<number>();
            const maybeToList = nothing.maybeToList();
            expect(maybeToList instanceof Nil).toBeTruthy();
        });

        it('should return Nothing when map is called', () => {
            const nothing = new Nothing<number>();
            const mapped = nothing.map(x => x * 2);
            expect(mapped instanceof Nothing).toBeTruthy();
        });

        it('should return Nothing when pure is called', () => {
            const pureValue = Nothing.pure(5);
            expect(pureValue instanceof Just).toBeTruthy();
        });

        it('should return Nothing when applicative is called', () => {
            const nothingFn = new Nothing<(a: number) => number>();
            const applicativeResult = nothingFn.ap(new Just<number>(2));
            expect(applicativeResult instanceof Nothing).toBeTruthy();
        });

        it('should return Nothing when wrap is called', () => {
            const wrapValue = Nothing.wrap(10);
            expect(wrapValue instanceof Just).toBeTruthy();
        });

        it('should return Nothing when bind is called', () => {
            const nothing = new Nothing<number>();
            const bound = nothing.bind<number>(x => new Just(x * 2));
            expect(bound instanceof Nothing).toBeTruthy();
        });

        it('should return Nothing semigroup append with Numeric', () => {
            const nothingSum = new Nothing<Sum>();
            const justSum = new Just<Sum>(new Sum(1));
            const sAppendSum = nothingSum.sappend(justSum);
            expect(sAppendSum.value.value).toBe(1);
            const nothingProduct = new Nothing<Product>();
            const justProduct = new Just<Product>(new Product(11));
            const sAppendProduct = nothingProduct.sappend(justProduct);
            expect(sAppendProduct.value.value).toBe(11);
        });

        it('should return Nothing monoid append with Numeric', () => {
            const nothingSum = new Nothing<Sum>();
            const justSum = new Just<Sum>(new Sum(1));
            const mAppendSum = nothingSum.mappend(justSum);
            expect(mAppendSum.value.value).toBe(1);
            const nothingProduct = new Nothing<Product>();
            const justProduct = new Just<Product>(new Product(11));
            const mAppendProduct = nothingProduct.mappend(justProduct);
            expect(mAppendProduct.value.value).toBe(11);
        });
    });

    describe('Just', () => {
        it('should return Just when isNothing and isJust is called', () => {
            const just = new Just<number>(3);
            expect(just.isNothing()).toBe(false);
            expect(just.isJust()).toBe(true);
        });

        it('should return Just when fromJust is called', () => {
            const just = new Just<number>(1);
            expect(just.fromJust(100)).toBe(1);
        });

        it('should return Just when fromMaybe is called', () => {
            const just = new Just<number>(100);
            expect(just.fromMaybe(1)).toBe(100);
        });

        it('should return Just when maybeToList is called', () => {
            const just = new Just<number>(7);
            const maybeToList = just.maybeToList();
            expect(maybeToList instanceof Cons).toBeTruthy();
        });

        it('should map correctly', () => {
            const justFive = new Just(5);
            const mapped = justFive.map(x => x * 2);
            expect(mapped instanceof Just).toBeTruthy();
            expect(mapped.value).toEqual(10);
        });

        it('should return Just when pure is called', () => {
            const pure = Just.pure(10);
            expect(pure.value).toBe(10);
        })

        it('should return Just when applicative is called', () => {
            const justFn = new Just((x: number) => x + 5);
            const justThree = new Just(3);
            const applicativeResult = justFn.ap(justThree);
            expect(applicativeResult instanceof Just).toBeTruthy();
        });

        it('should return Just when wrap is called', () => {
            const just = Just.wrap('test');
            expect(just.value).toBe('test');
        });

        it('should return Just when bind is called', () => {
            const justFive = new Just(5);
            const bound = justFive.bind(x => new Just(x * 2));
            expect(bound instanceof Just).toBeTruthy();
        });

        it('should return Just when semigroup append with numeric', () => {
            const just = new Just<Sum>(new Sum(3));
            const nothing = new Nothing<Sum>();
            const justSum = new Just<Sum>(new Sum(4));
            const res1= just.sappend(nothing);
            const res2 = just.sappend(justSum);
            expect(res1.value.value).toBe(3);
            expect(res2.value.value).toBe(7);
        });

        it('should return Just monoid empty with Numeric', () => {
            const justSumEmpty = new Just<Sum>(Sum.empty());
            expect(justSumEmpty.value.value).toBe(0);
            const justProductEmpty = new Just<Product>(Product.empty());
            expect(justProductEmpty.value.value).toBe(1);
        });

        it('should return Just monoid append with Numeric', () => {
            const justSum = new Just<Sum>(new Sum(1));
            const nothingSum = new Nothing<Sum>();
            const anotherJustSum = new Just<Sum>(new Sum(3));
            const mAppendNothingSum = justSum.mappend(nothingSum);
            const mAppendJustSum = justSum.mappend(anotherJustSum);
            expect(mAppendNothingSum.value.value).toBe(1);
            expect(mAppendJustSum.value.value).toBe(4);
            const justProduct = new Just<Product>(new Product(3));
            const nothingProduct = new Nothing<Product>();
            const anotherJustProduct = new Just<Product>(new Sum(3));
            const mAppendNothingProduct = justProduct.mappend(nothingProduct);
            const mAppendJustProduct = justProduct.mappend(anotherJustProduct);
            expect(mAppendNothingProduct.value.value).toBe(3);
            expect(mAppendJustProduct.value.value).toBe(9);
        });
    });
});