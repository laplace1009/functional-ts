import {Node} from "../classes/tree"
import {Cons, isCons, Nil} from "../classes/list";

describe('Tree', () => {
    describe('Node', () => {
        it('map should return boolean', () => {
            const rCNode = new Node<number>(2, new Nil);
            const lCNode = new Node<number>(3, new Nil);
            const rootNode =
                new Node<number>(1,
                    new Cons<Node<number>>(lCNode, new Cons<Node<number>>(rCNode, new Nil)));
           const mapped = rootNode.map((a) => a + 10);
           const subF = mapped.subForest;
           expect(mapped.label).toBe(11);
            {
                if (isCons(subF)) {
                    expect(subF.length()).toBe(2);
                    expect(subF.value.label).toBe(13);
                }
            }
        });

        it('pure should return Node', () => {
            const rootNode = new Node<number>(1, new Nil);
            const pure = rootNode.pure('root');
            expect(pure.label).toEqual('root');
        });

        it('ap should return Node', () => {
            const rootNode =
                new Node<(a: number) => number>((a: number) => a * 10, new Nil);
            const apply = rootNode.ap(new Node<number>(1, new Nil));
            expect(apply.label).toEqual(10);
        });

        it('wrap should return Node', () => {
            const rootNode = new Node<number>(1, new Nil);
            const wrapped = rootNode.wrap('root');
            expect(wrapped.label).toBe('root');
        });

        it('bind should return Node', () => {
            const rCNode = new Node<number>(2, new Nil);
            const lCNode = new Node<number>(3, new Nil);
            const rootNode =
                new Node<number>(1,
                    new Cons<Node<number>>(lCNode, new Cons<Node<number>>(rCNode, new Nil)));
            const bind = rootNode.bind(a => new Node<number>(a + 3, new Nil));
            expect(bind.label).toEqual(4);
            expect(bind.subForest.length()).toBe(2);
        });

        it('fold should return new type', () => {
            const rCNode = new Node<number>(2, new Nil);
            const lCNode = new Node<number>(3, new Nil);
            const rootNode =
                new Node<number>(1,
                    new Cons<Node<number>>(lCNode, new Cons<Node<number>>(rCNode, new Nil)));
            const foldTree = rootNode.fold((acc, cur) => acc + cur, 0);
            expect(foldTree).toBe(6);
        });
    });
});