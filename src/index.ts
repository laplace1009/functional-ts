export type MaybeType<T> = Nothing | Just<T>

export class Nothing {
    private value: unknown

    constructor() {
        this.value = undefined
    }

    Get() {
        return this.value
    }
}

export class Just<T> {
    private value

    constructor(value: T) {
        this.value = value
    }

    Get() {
        return this.value
    }
}

export class Maybe<T> {
    private value: MaybeType<T>

    constructor(value: undefined | T) {
        if (value === undefined) {
            this.value = new Nothing()
        } else {
            this.value = new Just(value)
        }
    }

    Get() {
        return this.value
    }
}