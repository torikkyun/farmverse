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

export interface NFTItem {
  id: number;
  name: string;
  price: string;
  image: string;
}
