/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressSchema } from './AddressSchema';
import type { OrderItemSchema } from './OrderItemSchema';
export type OrderCreateSchema = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name: (string | null);
    gstin: (string | null);
    billing_address: AddressSchema;
    shipping_address: AddressSchema;
    items: Array<OrderItemSchema>;
    save_info?: boolean;
};

