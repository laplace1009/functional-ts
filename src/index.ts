export type Callable = (...args: any[]) => any;

export interface Functor {
    map<T>(f: (value: any) => T): Functor
}

/**
 * pure -> static 으로 구현
 */
export interface Applicative extends Functor {
    // 언어 특성상 static 으로 따로 구현해야함
    // pure<T>(value: T): Applicative
    applicative<T>(value: T): Applicative
}

/**
 * lift -> static 으로 구현
 */
export interface Monad<T> extends Applicative {
    // lift<U>(value: U): Monad<U>
    bind<U>(f: (value: any) => Monad<U>): Monad<U>
}

export interface Maybe<T> extends Monad<T> {
    value: T | undefined
    getValue: () => undefined | T
    isNothing: () => boolean
    isJust: () => boolean
}

export class Just<T> implements Maybe<T> {
    value: T
    
    constructor(value: T) {
        this.value = value
    }

    static pure<U>(arg: U): Maybe<U> {
        return new Just<U>(arg)
    }

    static lift<U>(arg: U): Maybe<U> {
        return new Just<U>(arg)
    }
    
    getValue() {
        return this.value
    }

    isNothing(): this is Nothing {
        return false
    }

    isJust(): this is Just<T> {
        return true
    }

    map<U>(f: (value: T) => U): Maybe<U> {
        return new Just(f(this.value))
    }

    applicative<U>(arg: U): Maybe<U> {
        if (typeof this.value === 'function') {
            const fn = this.value as Callable
            return new Just<U>(fn(arg))
        } else {
            return new Nothing<U>() as Maybe<U>
        }
    }

    bind<U>(f: (value: T) => Just<U>): Just<U> {
        return f(this.value)
    }
}

export class Nothing<T = any> implements Maybe<T> {
    value: T | undefined = undefined

    getValue(): T | undefined {
        return this.value
    }

    isNothing(): this is Nothing<T> {
        return true
    }

    isJust(): this is Just<T> {
        return false
    }

    map<U>(f: (value: T) => U) {
        return new Nothing()
    }

    applicative<U>(value: U): Nothing<U> {
        return new Nothing<U>()
    }

    bind<U>(f: (value: T) => Monad<U>): Nothing<U> {
        return new Nothing()
    }
}