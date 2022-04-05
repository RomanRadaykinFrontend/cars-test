import { makeRequest } from "../helpers";
import { CarLibraryResponse } from "../types/cars";

export interface SkipLimitPayload {
  skip?: number;
  limit?: number;
}

export type SkipLimitWith<T> = T & SkipLimitPayload;

export interface GetCarsPayload {
  searchString?: string;
  vehicleModel?: string | string[];
}

export type GetCarsParams = SkipLimitWith<GetCarsPayload>;

export class CarService {
  async getCars(params: GetCarsParams): Promise<CarLibraryResponse> {
    return makeRequest<GetCarsParams, CarLibraryResponse>(
      "/cars/library",
      params
    );
  }
}
