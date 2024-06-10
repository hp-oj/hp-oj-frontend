/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginBodyDTO } from '../models/LoginBodyDTO';
import type { R_boolean_ } from '../models/R_boolean_';
import type { R_Map_string_object_ } from '../models/R_Map_string_object_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthControllerService {
    /**
     * 验证码
     * @returns R_Map_string_object_ OK
     * @throws ApiError
     */
    public static captchaImageUsingGet(): CancelablePromise<R_Map_string_object_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/captchaImage',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 是否登录
     * @returns R_boolean_ OK
     * @throws ApiError
     */
    public static isLoginUsingGet(): CancelablePromise<R_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/isLogin',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 登录
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static loginUsingPost(
        requestBody?: LoginBodyDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 登出
     * @returns R_boolean_ OK
     * @throws ApiError
     */
    public static logoutUsingGet(): CancelablePromise<R_boolean_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/auth/logout',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
