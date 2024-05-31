import {Cons, List, Nil} from "../classes/list";

describe('List Implementation', () => {
    describe('Nil', () => {
        it('isEmpty should return true', () => {
            const emptyList = new Nil<number>();
            expect(emptyList.isEmpty()).toBe(true);
        });

        it('head should throw "empty list"', () => {
            const emptyList = new Nil<number>();
            expect(() => emptyList.head()).toThrow('empty list');
        });

        it('tail should throw "empty list"', () => {
            const emptyList = new Nil<string>();
            expect(() => emptyList.tail()).toThrow('empty list');
        });

        it('append should return the appended list', () => {
            const emptyList = new Nil<number>();
            const anotherEmptyList = new Nil<number>();
            expect(emptyList.append(anotherEmptyList)).toBe(anotherEmptyList);
        });

        it('length should return 0', () => {
            const emptyList = new Nil<number>();
            expect(emptyList.length()).toBe(0);
        });

        it('filter should return empty list', () => {
            const emptyList = new Nil<number>();
            const anotherEmptyList = emptyList.filter((a) => a === 0);
            expect(anotherEmptyList.length()).toBe(0);
        });

        it('map should return apply fn list', () => {
            const emptyList = new Nil<number>();
            const mapped = emptyList.map(x => x * 2);
            expect(mapped instanceof Nil).toBe(true);
        });

        it('pure should return Cons', () => {
            const emptyList = new Nil<number>();
            const newList = emptyList.pure('here');
            expect(typeof newList.value).toBe('string');
        })

        it('ap should return Nil', () => {
            const emptyList = new Nil<(a: number) => number>();
            const numList = new Cons<number>(1, new Nil<number>());
            const applied = emptyList.ap(numList);
            expect(applied instanceof Nil).toBe(true);
        });

        it('wrap should return Cons', () => {
            const emptyList = new Nil<number>();
            const wrapList = emptyList.wrap('str');
            expect(wrapList.length()).toBe(1);
        });

        it('bind should return Cons', () => {
            const emptyList = new Nil<number>();
            const bindList  = emptyList.bind((a: number) =>
                new Cons<number>(a * 10, new Nil<number>()));
            expect(bindList instanceof Nil).toBe(true);
        });

        it('clone should return Nil', () => {
            const emptyList = new Nil<number>();
            const cloneList = emptyList.clone();
            expect(cloneList.length()).toBe(0);
            expect(cloneList instanceof Nil).toBe(true);
        });

        it('append should return append list', () => {
            const emptyList = new Nil<number>();
            const numList = new Cons<number>(1, new Cons<number>(2, new Nil<number>()));
            const appendList = emptyList.append(numList);
            expect(appendList.length()).toBe(2);
        });

        it('fold should return another type or same type', () => {
            const emptyList = new Nil<number>();
            const ten = emptyList.fold((a, b) => a + b, 10);
            expect(ten).toBe(10);
        });

        it('semigroup append should return append list', () => {
            const emptyList = new Nil<number>();
            const sAppendList = emptyList.sappend(new Cons<number>(10, new Nil<number>()));
            expect(sAppendList.length()).toBe(1);
        });

        it('monoid empty should return Nil', () => {
            const emptyList = new Nil<number>();
            const mEmptyList = emptyList.mempty();
            expect(mEmptyList.length()).toBe(0);
            expect(mEmptyList instanceof Nil).toBe(true);
        });

        it('monoid append should return append list', () => {
            const emptyList = new Nil<number>();
            const numList = new Cons<number>(100, new Cons<number>(-100, new Nil<number>()));
            const mAppendList = emptyList.mappend(numList);
            expect(mAppendList.length()).toBe(2);
            expect(mAppendList instanceof Cons).toBe(true);
        });

        it('monoid concat should return Nil', () => {
            const emptyList = new Nil<number>();
            const mConcatList = emptyList.mconcat();
            expect(mConcatList.length()).toBe(0);
            expect(mConcatList instanceof Nil).toBe(true);
        });
    });

    describe('Cons', () => {

        it('isEmpty should return false', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            expect(list.isEmpty()).toBe(false);
        });

        it('head should return first element', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            expect(list.head()).toBe(1);
        });


        it('tail should return tail list', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            expect(list.tail()).toEqual(new Cons(2, new Cons(3, new Nil())));
        });

        it('append should concatenate lists', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const newList = list.append(new Cons<number>(4, new Nil()));
            expect(newList.length()).toBe(4);
        });

        it('length should return the correct size', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            expect(list.length()).toBe(3);
        });

        it('filter should return list', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const filterList = list.filter(a => a % 2 === 0);
            expect(filterList.length()).toBe(1);
        });

        it('map should return mapped list', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const mappedList = list.map(a => a.toString());
            expect(mappedList.length()).toBe(3);
            expect(typeof mappedList.value).toBe('string');
        });

        it('pure should return Cons', () => {
            const list = new Cons(1, new Nil<number>());
            const pureList = list.pure(5);
            expect(pureList.length()).toBe(1);
        });

        it('ap should return List', () => {
            const list = new Cons((a: number) => a * 10, new Nil());
            const numList = new Cons<number>(33, new Cons<number>(12, new Nil<number>()));
            const apList = list.ap(numList) as Cons<number>;
            expect(apList.length()).toBe(2);
            expect(apList.head()).toBe(330);
            expect(apList.next.head()).toBe(120);
        });

        it('wrap should return Cons', () => {
            const list = new Cons(1, new Nil());
            const wrapList = list.wrap('here');
            expect(wrapList.length()).toBe(1);
        });

        it('bind should return List', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const bindList = list.bind(a => new Cons<number>(a + 1, new Nil<number>()));
            expect(bindList.head()).toBe(2);
            expect(bindList.length()).toBe(3);
        });

        it('clone should return same Cons', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const cloneList = list.clone();
            expect(cloneList).toEqual(list);
        });

        it('append should return append List', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const numNil = new Nil<number>();
            const numCons = new Cons(4, new Cons(5, new Cons(6, new Nil())));
            const appendNil = list.append(numNil);
            const appendCons = list.append(numCons);
            expect(appendNil.length()).toBe(3);
            expect(appendCons.length()).toBe(6);
        });

        it('fold should accumulate correctly', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const sum = list.fold((acc, val) => acc + val, 0);
            expect(sum).toBe(6);
        });

        it('semigroup append should return Cons', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const anotherList = new Cons<number>(4, new Nil<number>());
            const sAppendList = list.sappend(anotherList);
            expect(sAppendList.length()).toBe(4);
        });

        it('monoid empty should return Nil', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const mEmptyList = list.mempty();
            expect(mEmptyList.length()).toBe(0);
            expect(mEmptyList instanceof Nil).toBe(true);
        });

        it('monoid append should return Cons', () => {
            const list = new Cons(1, new Cons(2, new Cons(3, new Nil())));
            const numNil = new Nil<number>();
            const numCons = new Cons(4, new Cons(5, new Cons(6, new Nil())));
            const mAppendNil = list.append(numNil);
            const mAppendCons = list.append(numCons);
            expect(mAppendNil.length()).toBe(3);
            expect(mAppendCons.length()).toBe(6);
        });

        it('monoid concat should return concat list', () => {
            // const listOfList =
            //     new Cons(new Cons<number>(1, new Nil<number>()), new Nil<Cons<number>>());
            const list = new Cons(new Cons(1, new Nil()), new Cons(new Cons<number>(2, new Nil()), new Nil()));
            // console.log(list.mconcat())
        })

        // test('map should transform list correctly', () => {
        //     const mappedList = list.map(x => x * 2);
        //     expect(mappedList.toArray()).toEqual([2, 4, 6]);
        // });

        // test('bind should apply function and flatten', () => {
        //     const boundList = list.bind(x => new Cons(x + 1, new Nil()));
        //     expect(boundList.toArray()).toEqual([2, 3, 4]);
        // });
    });
});
