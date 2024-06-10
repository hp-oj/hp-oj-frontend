/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Page } from '../models/Page';
import type { QuestionDTO } from '../models/QuestionDTO';
import type { QuestionSubmitDTO } from '../models/QuestionSubmitDTO';
import type { R_boolean_ } from '../models/R_boolean_';
import type { R_Map_string_string_ } from '../models/R_Map_string_string_';
import type { R_Page_Question_ } from '../models/R_Page_Question_';
import type { R_Page_QuestionSubmit_ } from '../models/R_Page_QuestionSubmit_';
import type { R_Page_QuestionSubmitVO_ } from '../models/R_Page_QuestionSubmitVO_';
import type { R_Page_QuestionVO_ } from '../models/R_Page_QuestionVO_';
import type { R_Question_ } from '../models/R_Question_';
import type { R_QuestionVO_ } from '../models/R_QuestionVO_';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class QuestionControllerService {
    /**
     * 添加题目
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static addQuestionUsingPost(
        requestBody?: QuestionDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/add',
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
     * 删除题目
     * @param id id
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static deleteQuestionUsingPost(
        id: number,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/delete',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据id查询题目
     * @param id id
     * @returns R_Question_ OK
     * @throws ApiError
     */
    public static getQuestionUsingGet(
        id: number,
    ): CancelablePromise<R_Question_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/get',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 随机获得一题目VO
     * @returns R_QuestionVO_ OK
     * @throws ApiError
     */
    public static getRandQuestionVoUsingGet(): CancelablePromise<R_QuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getRand',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 查看题目代码
     * @param id id
     * @returns R_Map_string_string_ OK
     * @throws ApiError
     */
    public static getSubmitAnswerUsingGet(
        id: number,
    ): CancelablePromise<R_Map_string_string_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getSubmitAnswer',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 根据id查询题目VO
     * @param id id
     * @returns R_QuestionVO_ OK
     * @throws ApiError
     */
    public static getQuestionVoUsingGet(
        id: number,
    ): CancelablePromise<R_QuestionVO_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/getVo',
            query: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * 分页查询题目
     * @param requestBody
     * @returns R_Page_Question_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionUsingPost(
        requestBody?: Page,
    ): CancelablePromise<R_Page_Question_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list',
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
     * 分页查询题目VO
     * @param requestBody
     * @returns R_Page_QuestionVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionVoUsingPost(
        requestBody?: Page,
    ): CancelablePromise<R_Page_QuestionVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/listVo',
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
     * 提交题目
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static submitQuestionUsingPost(
        requestBody?: QuestionSubmitDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/submit/do',
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
     * 分页查询提交记录
     * @param requestBody
     * @returns R_Page_QuestionSubmit_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitUsingPost(
        requestBody?: Page,
    ): CancelablePromise<R_Page_QuestionSubmit_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/submit/list',
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
     * 分页查询提交记录VO
     * @param requestBody
     * @returns R_Page_QuestionSubmitVO_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static listQuestionSubmitVoUsingPost(
        requestBody?: Page,
    ): CancelablePromise<R_Page_QuestionSubmitVO_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/submit/listVo',
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
     * 更新题目
     * @param requestBody
     * @returns R_boolean_ OK
     * @returns any Created
     * @throws ApiError
     */
    public static updateQuestionUsingPost(
        requestBody?: QuestionDTO,
    ): CancelablePromise<R_boolean_ | any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/update',
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
