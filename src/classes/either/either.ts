import {CallableAtoB} from "../../types/types";

export abstract class Either<S, T> {
    abstract isLeft(): boolean
    abstract isRight(): boolean
    abstract either<A>(f:CallableAtoB<S | T, A>): A;
}

export class Left<T> extends Either<string, T> {
    constructor(public readonly value: string) {
        super();
    }
    isLeft(): boolean {
        return true;
    }

    isRight(): boolean {
        return false;
    }

    either<A>(f: CallableAtoB<string, A>): A {
        return f(this.value)
    }
}

export class Right<T> extends Either<string, T> {
    constructor(public readonly value: T) {
        super();
    }

    isLeft(): boolean {
        return false;
    }

    isRight(): boolean {
        return true;
    }

    either<A>(f: CallableAtoB<T, A>): A {
        return f(this.value)
    }

}