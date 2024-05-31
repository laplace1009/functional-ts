import {Product, Sum} from "../classes/numeric";
import {Cons, mconcat, Nil} from "../classes/list";

describe('Numeric', () => {
    describe('Sum', () => {
        it('semigroup append should return number + number', () => {
            const sum = new Sum(1);
            const newSum = sum.sappend(new Sum(10));
            expect(newSum.value).toEqual(11);
        });

        it('monoid empty should return Sum(0)', () => {
            const emptySum = Sum.mempty();
            expect(emptySum).toEqual(new Sum(0));
        });

        it('monoid append should return Sum', () => {
            const sum = new Sum(123);
            const anotherSum = new Sum(456);
            const newSum = sum.mappend(anotherSum);
            expect(newSum.value).toBe(123 + 456);
        });

        it('monoid concat should return Sum', () => {
            const sumList = new Cons<Sum>(new Sum(1), new Cons(new Sum(2), new Nil()));
            const mConcatSum = mconcat<Sum>(sumList, Sum.mempty())
            expect(mConcatSum.value).toBe(3);
        });
    });

    describe('Product', () => {
        it('semigroup append should return number * number', () => {
            const product = new Product(5);
            const appendProduct = product.sappend(new Product(3));
            expect(appendProduct.value).toBe(15);
        });

        it('monoid empty should return Product(1)', () => {
            const emptyProduct = Product.mempty();
            expect(emptyProduct).toEqual(new Product(1));
        });

        it('monoid append should return Product', () => {
            const product = new Product(5);
            const anotherProduct = new Product(2);
            expect(product.mappend(anotherProduct)).toEqual(new Product(10));
        });

        it('monoid concat should return Sum', () => {
            const productList = new Cons<Product>(new Product(3), new Cons(new Product(4), new Nil()));
            const t = mconcat<Product>(productList, Product.mempty());
            expect(t.value).toBe(12);
        });
    });
});