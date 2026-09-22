/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemOutSchema } from './OrderItemOutSchema';
export type OrderOutSchema = {
    id: number;
    status: string;
    total_amount: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    company_name?: (string | null);
    gstin?: (string | null);
    shipping_address_line1: string;
    shipping_address_line2: string;
    shipping_city: string;
    shipping_state: string;
    shipping_pincode: string;
    razorpay_order_id?: (string | null);
    razorpay_payment_id?: (string | null);
    created_at: string;
    items: Array<OrderItemOutSchema>;
};

