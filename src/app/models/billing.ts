// Interfaces about Billing process
import { Customer } from "./customer";
import { Product } from "./product";

export interface Billing {
    id: number;
    createdAt: string;
    idCustomer: number;
    customer: Customer;
    products: Product[];
}

export interface NewBilling {
    idCustomer: number;
    idsProducts: {
        id: number;
        quantity: 0;
    }[];
}

export interface UpdateBilling {
    idNewCustomer: number;
    id: number
}