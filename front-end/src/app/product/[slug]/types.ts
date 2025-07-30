export interface NFTItem {
  id: string;
  name: string;
  description: string;
  images: string[];
  quantity: number;
  price: number;
  stock: number;
  type: "FERTILIZER" | "TREE" | "PESTICIDE";
}

export interface DungItem {
  id: string;
  name: string;
  type: "FERTILIZER" | "TREE" | "PESTICIDE";
  description: string;
  images: string[];
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

  signatureUrl?: string;
}

export type FarmItem = NFTItem | DungItem;
