export interface Farm {
  id: string;
  name: string;
  address: {
    houseNumber?: string;
    street?: string;
    commune?: string;
    ward?: string;
    city?: string;
    province?: string;
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
    address: {
      houseNumber?: string;
      street?: string;
      commune?: string;
      ward?: string;
      city?: string;
      province?: string;
      country?: string;
    };
    fvtBalance: number;
    role: string;
  };
}

export interface Item {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  farm?: Farm;
  images?: string[];
  price?: number;
  quantity?: number | null;
}

export interface FarmMarket {
  id: string;
  name: string;
  location: string;
  crops?: string[];
  description?: string;
  owner?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
  };
  size?: number;
  images?: string[];
}
