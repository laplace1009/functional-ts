import {Nil, Cons} from "../classes/list"

describe('List Implementation', () => {
    describe('Nil', () => {
        const emptyList = new Nil();

        test('isEmpty should return true', () => {
            expect(emptyList.isEmpty()).toBe(true);
        });

        test('head should throw "empty list"', () => {
            expect(() => emptyList.head()).toThrow('empty list');
        });

        test('last should throw "empty list"', () => {
            expect(() => emptyList.last()).toThrow('empty list');
        });

        test('tail should throw "empty list"', () => {
            expect(() => emptyList.tail()).toThrow('empty list');
        });

        test('append should return the appended list', () => {
            const anotherEmptyList = new Nil();
            expect(emptyList.append(anotherEmptyList)).toBe(anotherEmptyList);
        });

        test('length should return 0', () => {
            expect(emptyList.length()).toBe(0);
        });

        test('fold should return initial value', () => {
            expect(emptyList.fold((acc, val) => acc + val, 10)).toBe(10);
        });

        test('map should return Nil', () => {
            expect(emptyList.map(x => x * 2)).toEqual(new Nil());
        });

        // test('bind should return Nil', () => {
        //     expect(emptyList.bind(x => new Cons(x * 2, new Nil()))).toEqual(new Nil());
        // });
    });

    describe('Cons', () => {
        const list: Cons<number> = new Cons<number>(1, new Cons<number>(2, new Cons<number>(3, new Nil())));

        test('isEmpty should return false', () => {
            expect(list.isEmpty()).toBe(false);
        });

        test('head should return first element', () => {
            expect(list.head()).toBe(1);
        });

        test('last should return last element', () => {
            expect(list.last()).toBe(3);
        });

        test('tail should return tail list', () => {
            expect(list.tail()).toEqual(new Cons(2, new Cons(3, new Nil())));
        });

        test('append should concatenate lists', () => {
            const newList = list.append(new Cons<number>(4, new Nil()));
            expect(newList.length()).toBe(4);
            expect(newList.last()).toBe(4);
        });

        test('length should return the correct size', () => {
            expect(list.length()).toBe(3);
        });

        test('fold should accumulate correctly', () => {
            const sum = list.fold((acc, val) => acc + val, 0);
            expect(sum).toBe(6);
        });

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
