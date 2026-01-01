/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProductSchema } from '../models/ProductSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * List Products
     * @returns ProductSchema OK
     * @throws ApiError
     */
    public static productApiListProducts(): CancelablePromise<Array<ProductSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/',
        });
    }
    /**
     * Get Product
     * @param productId
     * @returns ProductSchema OK
     * @throws ApiError
     */
    public static productApiGetProduct(
        productId: number,
    ): CancelablePromise<ProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{product_id}',
            path: {
                'product_id': productId,
            },
        });
    }
}
