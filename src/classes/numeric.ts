import {Monoid} from "../interfaces/monoid";

export class Sum implements Monoid<number> {
    constructor(public readonly value: number) {}

    sappend(a: Sum): Sum {
        return new Sum(this.value + a.value);
    }

    static empty(): Sum {
        return new Sum(0);
    }

    mempty(): Sum {
        return Sum.empty();
    }

    mappend(a: Sum): Sum {
        return this.sappend(a);
    }
}

export class Product implements Monoid<number>{
    constructor(public readonly value: number) {}

    sappend(a: Product): Product {
        return new Product(this.value * a.value);
    }

    static empty(): Product {
        return new Product(1);
    }

    mempty(): Product {
        return Product.empty();
    }

    mappend(a: Product): Product {
        return this.sappend(a);
    }
}