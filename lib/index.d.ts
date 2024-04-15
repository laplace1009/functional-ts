type MaybeType<T> = Nothing | Just<T>;
declare class Nothing {
    private value;
    constructor();
    Get(): unknown;
}
declare class Just<T> {
    private value;
    constructor(value: T);
    Get(): T;
}
declare class Maybe<T> {
    private value;
    constructor(value: undefined | T);
    Get(): MaybeType<T>;
}
