import {CallableAtoB, TypeOrReturnType} from "../../types/types";
import {Monad} from "../../interfaces/monad";
import {assertCallable} from "../../utils/utils";

export abstract class Either<L, R> implements Monad<L | R>{
    abstract isLeft(): boolean
    abstract isRight(): boolean
    abstract either<A>(f:CallableAtoB<L | R, A>): A;
    abstract map<A>(f: CallableAtoB<L | R, A>): Either<A, never> | Either<never, A>
    abstract pure<A>(a: A): Either<never, A>
    abstract ap<A>(a: A): Either<TypeOrReturnType<L | R>, never> | Either<never, TypeOrReturnType<L | R>>
    abstract wrap<A>(a: A): Either<never, A>
    abstract bind<A>(f: CallableAtoB<L | R, Either<L, never> | Either<never, A>>): Either<L, never> | Either<never, A>
}

export class Left<L> extends Either<L, never> {
    constructor(public readonly value: L) {
        super();
    }
    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }

    either<A>(f: CallableAtoB<L, A>): A {
        return f(this.value)
    }

    map<A>(f: CallableAtoB<L, A>): Left<L> {
        return new Left<L>(this.value)
    }

    pure<A>(a: A): Right<A> {
        return new Right<A>(a)
    }

    ap<A>(a: A): Left<TypeOrReturnType<L>> {
        assertCallable(this.value)
        if (isLeft(a))
        return new Left<TypeOrReturnType<L>>(this.value)
    }

    wrap<A>(a: A): Either<never, A> {
        return this.pure(a)
    }

    bind<A>(f: CallableAtoB<L, Left<A>>): Left<L> {
        return this.map(f).value
    }
}

export class Right<R> extends Either<never, R> {
    constructor(public readonly value: R) {
        super();
    }

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }

    either<A>(f: CallableAtoB<R, A>): A {
        return f(this.value)
    }

}

const isLeft = (a:unknown): a is Left<unknown> => a instanceof Left