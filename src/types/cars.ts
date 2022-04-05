export interface CarLibraryResponse {
  items: CarLibraryItem[];
  limit: number;
  skip: number;
  total: number;
  length: number;
}

export enum CarFuelType {
  gasoline = "gasoline",
  electric = "electric",
  kerosene = "kerosene",
  diesel = "diesel",
  hydro = "hydro"
}

export interface ValueType {
  name: string,
  value?: boolean | string | number | CarFuelType | string[]
}

export interface CarLibraryItem {
  id: number;
  model: string;
  name: string;
  hash: string;
  manufacturer: string;
  class: string;
  type: string;
  seats: number;
  hasAutoPilot?: boolean;
  convertibleRoof: boolean;
  sirens: boolean;
  image: string;
  images?: string[];
  fuelType: CarFuelType;
  baggageSize: number;
  fuelLevelMaxRaw: number;
  fuelUsagePerKM: number;
  brandId?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
