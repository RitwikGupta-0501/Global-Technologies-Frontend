/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Schema } from '../models/Schema';
import type { TokenObtainPairInputSchema } from '../models/TokenObtainPairInputSchema';
import type { TokenObtainPairOutputSchema } from '../models/TokenObtainPairOutputSchema';
import type { TokenRefreshInputSchema } from '../models/TokenRefreshInputSchema';
import type { TokenRefreshOutputSchema } from '../models/TokenRefreshOutputSchema';
import type { TokenVerifyInputSchema } from '../models/TokenVerifyInputSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TokenService {
    /**
     * Verify Token
     * @param requestBody
     * @returns Schema OK
     * @throws ApiError
     */
    public static tokenVerify(
        requestBody: TokenVerifyInputSchema,
    ): CancelablePromise<Schema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/token/verify',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Refresh Token
     * @param requestBody
     * @returns TokenRefreshOutputSchema OK
     * @throws ApiError
     */
    public static tokenRefresh(
        requestBody: TokenRefreshInputSchema,
    ): CancelablePromise<TokenRefreshOutputSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/token/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Obtain Token
     * @param requestBody
     * @returns TokenObtainPairOutputSchema OK
     * @throws ApiError
     */
    public static tokenObtainPair(
        requestBody: TokenObtainPairInputSchema,
    ): CancelablePromise<TokenObtainPairOutputSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/token/pair',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
