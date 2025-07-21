export type FarmMarket = {
  id: string;
  name: string;
  location: string;
  size: number;
  images: string[];
  crops: string[];
};

export type ItemMarket = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  images: string[];
  price: number;
  quantity: number;
  farm: string;
};

export const FARMS_MARKET: FarmMarket[] = [
  {
    id: "farm1",
    name: "Nông trại Bình Minh",
    location: "Đắk Lắk",
    size: 12,
    images: [
      "https://th.bing.com/th/id/R.e3c4a4d0eb3fc77c5a94b68cd4f531b4?rik=6rPPfVIjz3tpOg&pid=ImgRaw&r=0",
    ],
    crops: ["Xoài"],
  },
  {
    id: "farm2",
    name: "Nông trại Lê Khôi",
    location: "Bình Sơn, Long Thành, Đồng Nai",
    size: 20,
    images: [
      "https://bbt.1cdn.vn/2022/12/29/z3996741334134_702065666ba43e93d876065e03dcb123.jpg",
    ],
    crops: ["Sầu riêng", "Chôm chôm"],
  },
];

export const ITEMS_MARKET: ItemMarket[] = [
  {
    id: "item1",
    name: "Phân bón NPK",
    type: "Phân bón",
    description: "Phân bón NPK chất lượng cao",
    images: ["https://songgianh.com.vn/upload/attachment/358115-5-20.jpg"],
    price: 150,
    quantity: 32,
    farm: "farm1",
  },
  {
    id: "item2",
    name: "Thuốc trừ sâu sinh học",
    type: "Thuốc trừ sâu",
    description: "Thuốc trừ sâu an toàn cho cây ăn trái",
    images: [
      "https://th.bing.com/th/id/R.ad6b9b329a0808980175c61b5dfb05e8?rik=mbuVTh94dQCiWg&pid=ImgRaw&r=0",
    ],
    price: 80,
    quantity: 40,
    farm: "farm2",
  },
  {
    id: "item3",
    name: "Phân hữu cơ vi sinh",
    type: "Phân bón",
    description: "Phân hữu cơ giúp cây phát triển khỏe mạnh",
    images: [
      "https://songgianh.com.vn/upload/attachment/336vi-sinh-cc-sua.jpg",
    ],
    price: 100,
    quantity: 54,
    farm: "farm2",
  },
];
