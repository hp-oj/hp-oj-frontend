/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { R_string_ } from '../models/R_string_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CommonControllerService {
    /**
     * 文件上传
     * @param requestBody
     * @returns R_string_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static uploadUsingPost(
        requestBody?: Blob,
    ): CancelablePromise<R_string_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/common/upload',
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
