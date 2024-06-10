/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { R } from '../models/R';
import type { R_boolean_ } from '../models/R_boolean_';
import type { R_UserVO_ } from '../models/R_UserVO_';
import type { RegisterBodyDTO } from '../models/RegisterBodyDTO';
import type { UserUpdateDTO } from '../models/UserUpdateDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserControllerService {
    /**
     * 获取用户信息
     * @returns R_UserVO_ OK
     * @throws ApiError
     */
    public static getInfoUsingGet(): CancelablePromise<R_UserVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/getInfo',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 注册
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static registerUsingPost(
        requestBody?: RegisterBodyDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
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
     * 测试
     * @returns R OK
     * @throws ApiError
     */
    public static testUsingGet(): CancelablePromise<R> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/test',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 更新用户信息
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateInfoUsingPost(
        requestBody?: UserUpdateDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/updateInfo',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
