import { SubCategory } from './sub';
export interface Product {
    id:number;
    name: string;
    details: string;
    price: number;
    photoUrl: string;
    productSubCategories: Array<SubCategory>;
} 