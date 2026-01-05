/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProductSchema = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price?: (string | null);
    category: string;
    type: string;
    price_type: string;
    rating: number;
    reviews: number;
    features: Array<string>;
    specs?: Record<string, any>;
    images: Array<string>;
};

