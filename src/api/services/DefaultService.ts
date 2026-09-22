/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponseSchema } from '../models/AuthResponseSchema';
import type { OrderCreateSchema } from '../models/OrderCreateSchema';
import type { OrderInitSchema } from '../models/OrderInitSchema';
import type { OrderOutSchema } from '../models/OrderOutSchema';
import type { PagedProductSchema } from '../models/PagedProductSchema';
import type { PaymentVerifySchema } from '../models/PaymentVerifySchema';
import type { ProductSchema } from '../models/ProductSchema';
import type { QuoteInputSchema } from '../models/QuoteInputSchema';
import type { QuoteSuccessSchema } from '../models/QuoteSuccessSchema';
import type { SavedAddressSchema } from '../models/SavedAddressSchema';
import type { UserLoginSchema } from '../models/UserLoginSchema';
import type { UserOutSchema } from '../models/UserOutSchema';
import type { UserRegisterSchema } from '../models/UserRegisterSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * List Products
     * @param category
     * @param typeFilter
     * @param priceType
     * @param q
     * @param page
     * @param pageSize
     * @returns PagedProductSchema OK
     * @throws ApiError
     */
    public static productApiListProducts(
        category?: (string | null),
        typeFilter?: (string | null),
        priceType?: ('fixed' | 'quote' | null),
        q?: (string | null),
        page: number = 1,
        pageSize?: (number | null),
    ): CancelablePromise<PagedProductSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/',
            query: {
                'category': category,
                'type_filter': typeFilter,
                'price_type': priceType,
                'q': q,
                'page': page,
                'page_size': pageSize,
            },
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
     * Login
     * @param requestBody
     * @returns AuthResponseSchema OK
     * @throws ApiError
     */
    public static userApiLogin(
        requestBody: UserLoginSchema,
    ): CancelablePromise<AuthResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
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
     * To allow guests to send quotes: Check issue #24 comment.
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
    /**
     * Initiate Order
     * @param requestBody
     * @returns OrderInitSchema OK
     * @throws ApiError
     */
    public static orderApiInitiateOrder(
        requestBody: OrderCreateSchema,
    ): CancelablePromise<OrderInitSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/initiate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get My Addresses
     * @returns SavedAddressSchema OK
     * @throws ApiError
     */
    public static orderApiGetMyAddresses(): CancelablePromise<Array<SavedAddressSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/my-addresses',
        });
    }
    /**
     * Get My Orders
     * List all orders for the currently authenticated user.
     * @returns OrderOutSchema OK
     * @throws ApiError
     */
    public static orderApiGetMyOrders(): CancelablePromise<Array<OrderOutSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/my-orders',
        });
    }
    /**
     * Verify Payment
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static orderApiVerifyPayment(
        requestBody: PaymentVerifySchema,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Razorpay Webhook
     * Razorpay Webhook to ensure payments are captured
     * even if the user closes their browser prematurely.
     * @returns any OK
     * @throws ApiError
     */
    public static orderApiRazorpayWebhook(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/order/webhook',
        });
    }
    /**
     * Get Order Detail
     * Retrieve details of a single order belonging to the user.
     * @param orderId
     * @returns OrderOutSchema OK
     * @throws ApiError
     */
    public static orderApiGetOrderDetail(
        orderId: number,
    ): CancelablePromise<OrderOutSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/order/{order_id}',
            path: {
                'order_id': orderId,
            },
        });
    }
}
