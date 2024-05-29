import {Monad} from "../interfaces/monad";

abstract class Either<L, R> implements Monad<R> {
    abstract isLeft(): boolean
    abstract isRight(): boolean
    abstract fromLeft<A>(a: A): A | L
    abstract fromRight<A>(a: A): A | R
    abstract map<A>(fn: (a: R) => A): Either<L, A>;
    abstract pure<A>(a: A): Either<L, A>
    abstract ap<A, B>(this: Either<L, (a: A) => B>, a: Either<L, A>): Either<L, B>;
    abstract wrap<A>(a: A): Either<L, A>
    abstract bind<A>(fn: (a: R) => Either<L, A>): Either<L, A>
}

class Left<L, R> extends Either<L, R> {
    constructor(public readonly value: L) {
        super();
    }

    isLeft() {
        return true
    }

    isRight() {
        return false;
    }

    fromLeft<A>(a: A): L {
        return this.value
    }

    fromRight<A>(a: A): A {
        return a
    }

    map<A>(fn: (a: R) => A): Either<L, A> {
        return new Left<L, A>(this.value)
    }
    pure<A>(a: A): Right<L, A> {
        return new Right<L, A>(a)
    }

    ap<A, B>(a: Either<any, any>): Left<L, B> {
        return new Left<L, B>(this.value)
    }

    wrap<A>(a: A): Right<L, A> {
        return this.pure(a)
    }

    bind<A>(fn: (a: R) => Either<L, A>): Either<L, A> {
        return new Left<L, A>(this.value)
    }
}

class Right<L, R> extends Either<L, R> {
    constructor(public readonly value: R) {
        super();
    }

    isLeft() {
        return false
    }

    isRight() {
        return true
    }

    fromLeft<A>(a: A): A {
        return a
    }

    fromRight<A>(a: A): R {
        return this.value
    }

    map<A>(fn: (a: R) => A): Either<L, A> {
        return new Right<L, A>(fn(this.value))
    }

    pure<A>(a: A): Right<L, A> {
        return new Right<L, A>(a)
    }

    ap<A, B>(this: Right<L, (a: A) => B>, a: Either<L, A>): Either<L, B> {
        return a.map(this.value)
    }

    wrap<A>(a: A): Right<L, A> {
        return this.pure(a)
    }

    bind<A>(fn: (a: R) => Either<L, A>): Either<L, A> {
        return fn(this.value)
    }
}
