/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItem } from './OrderItem';
export type Page = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    optimizeJoinOfCountSql?: boolean;
    orders?: Array<OrderItem>;
    pages?: number;
    records?: Array<Record<string, any>>;
    searchCount?: boolean;
    size?: number;
    total?: number;
};

