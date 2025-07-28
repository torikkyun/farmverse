export interface NFTItem {
  id: string; // Đảm bảo là string
  name: string;
  type: string;
  description: string;
  image: string[];
  quantity: number;
  price: number;
  stock: number;
}

export interface DungItem {
  id: string; // Đảm bảo là string
  name: string;
  type: string;
  description: string;
  image: string[];
  quantity: number;
  price: number;
  stock: number;
}

export interface Farm {
  id: string;
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    province?: string;
    city?: string;
    country?: string;
  };
  size: number;
  description: string;
  images: string[];
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    address?: object;
    fvtBalance?: number;
    role?: string;
  };
  schedule?: Array<{
    month: number;
    activities: string[];
  }>;
}

export type FarmItem = NFTItem | DungItem;
