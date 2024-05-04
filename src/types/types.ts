export type Callable = (...arg: any[]) => any
export type Unit = void
export type CallableAtoB<A, R> = (arg: A) => R
export type TypeOrReturnType<Type> = Type extends (arg: infer A) => infer R ? R : Type