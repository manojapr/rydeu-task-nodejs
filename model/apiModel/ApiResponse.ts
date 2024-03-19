import { ApiCode } from './ApiCode';

export interface ApiResponse<T> {
  body: T;
  status: ApiCode;
}
