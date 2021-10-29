export interface IProduct {
    _id?: string;
    name: string;
    desc: string;
    price: string;
    photoURL?: string;
    shopId: string;
    category: string;
    tags: string[];
}
