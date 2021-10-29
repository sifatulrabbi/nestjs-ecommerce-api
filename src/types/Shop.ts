export interface IShop {
    _id?: string;
    name: string;
    ownerId?: string;
    owner: string;
    categories: string[];
    desc?: string;
    items?: string[];
    coverURL?: string;
}
