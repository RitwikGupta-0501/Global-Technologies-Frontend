/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponseSchema } from '../models/AuthResponseSchema';
import type { ProductSchema } from '../models/ProductSchema';
import type { QuoteInputSchema } from '../models/QuoteInputSchema';
import type { QuoteSuccessSchema } from '../models/QuoteSuccessSchema';
import type { UserOutSchema } from '../models/UserOutSchema';
import type { UserRegisterSchema } from '../models/UserRegisterSchema';
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
    /**
     * Register User
     * @param requestBody
     * @returns AuthResponseSchema Created
     * @throws ApiError
     */
    public static userApiRegisterUser(
        requestBody: UserRegisterSchema,
    ): CancelablePromise<AuthResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Me
     * Used by the frontend to get 'Who am I?'
     * after login or page reload.
     * @returns UserOutSchema OK
     * @throws ApiError
     */
    public static userApiGetMe(): CancelablePromise<UserOutSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }
    /**
     * Create Quote Request
     * @param requestBody
     * @returns QuoteSuccessSchema OK
     * @throws ApiError
     */
    public static quotesApiCreateQuoteRequest(
        requestBody: QuoteInputSchema,
    ): CancelablePromise<QuoteSuccessSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/quotes/request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
