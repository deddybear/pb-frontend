export interface GeneralResponse<T = unknown> {
    codeHttp: number;
    message: string;
    response: T;
} 