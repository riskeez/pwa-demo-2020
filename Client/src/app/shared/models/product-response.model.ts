import { Product } from "./product.model";

export class ProductResponse {
    requested_at: string;
    data: Product[];

    public constructor(products: Product[]) {
        this.requested_at = new Date().toLocaleString();
        this.data = products;
    }
}