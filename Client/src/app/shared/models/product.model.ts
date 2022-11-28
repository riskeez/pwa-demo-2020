import { ProductImage } from "./product-image.model";
import { TranslationsObject } from "./translations-object.model";

export class Product {
    id!: number;
    country!: string;
    barcode!: string;
    quantity!: number;
    unit!: string;
    portion_quantity?: number;
    alcohol_by_volume?: number;
    created_at!: string;
    images: ProductImage[] = [];
    display_name_translations!: TranslationsObject;

    name: string;

    public constructor(obj: Partial<Product>) {
        Object.assign(this, obj);

        this.name = obj.display_name_translations?.en ?? '<missing>';
    }
}