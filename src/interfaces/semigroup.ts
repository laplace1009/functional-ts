export interface SemiGroup<T> {
    sappend(a: SemiGroup<T>): SemiGroup<T>
}
