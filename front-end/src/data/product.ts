export type CareSchedule = {
  month: number;
  activities: string[];
};

export type TreeItemProduct = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  images: string[];
  price: number;
  quantity: number;
  output: string;
  harvestTime: {
    start: number;
    end: number;
  };
  soilType: string;
  farm: string;
  careSchedule?: CareSchedule[];
};

export type ItemProduct = {
  id: string;
  name: string;
  type: string;
  description?: string | null;
  images: string[];
  price: number;
  quantity: number;
  farm: string;
};

export const TREE_ITEMS: TreeItemProduct[] = [
  {
    id: "product1",
    name: "Cây Xoài",
    type: "Cây trồng",
    description: "Cây xoài trồng ở vùng đất màu mỡ.",
    images: [
      "https://cayxanhgiapham.com/wp-content/uploads/2020/06/cay-xoa-3-600x450.jpg",
    ],
    price: 80,
    quantity: 1,
    output: "150kg/năm",
    harvestTime: {
      start: 5,
      end: 8,
    },
    soilType: "Đất thịt",
    farm: "farm1",
    careSchedule: [
      { month: 1, activities: ["Bón phân hữu cơ", "Tưới nước định kỳ"] },
      { month: 2, activities: ["Kiểm tra sâu bệnh", "Tỉa cành"] },
      { month: 3, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 4, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 5, activities: ["Chuẩn bị thu hoạch", "Tưới nước"] },
      { month: 6, activities: ["Thu hoạch", "Bón phân sau thu hoạch"] },
      { month: 7, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 8, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
      { month: 9, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 10, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 11, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 12, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
    ],
  },
  {
    id: "product2",
    name: "Cây Sầu Riêng",
    type: "Cây trồng",
    description: "Cây sầu riêng trồng ở vùng đất màu mỡ.",
    images: [
      "https://th.bing.com/th/id/R.f8ea8c40cdead4e44f25a0c866b3f021?rik=GohkeybcLR4k6Q&pid=ImgRaw&r=0",
    ],
    price: 150,
    quantity: 1,
    output: "80kg/năm",
    harvestTime: {
      start: 4,
      end: 7,
    },
    soilType: "Đất thịt",
    farm: "farm1",
    careSchedule: [
      { month: 1, activities: ["Bón phân hữu cơ", "Tưới nước"] },
      { month: 2, activities: ["Kiểm tra sâu bệnh", "Tỉa cành"] },
      { month: 3, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 4, activities: ["Chuẩn bị thu hoạch", "Tưới nước"] },
      { month: 5, activities: ["Thu hoạch", "Bón phân sau thu hoạch"] },
      { month: 6, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 7, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
      { month: 8, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 9, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 10, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 11, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
      { month: 12, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
    ],
  },
  {
    id: "product3",
    name: "Cây Chôm Chôm",
    type: "Cây trồng",
    description: "Cây chôm chôm trồng ở vùng đất màu mỡ.",
    images: [
      "https://elead.com.vn/wp-content/uploads/2022/09/cay-chom-chom-22.jpg",
    ],
    price: 40,
    quantity: 1,
    output: "40kg/năm",
    harvestTime: {
      start: 5,
      end: 8,
    },
    soilType: "Đất thịt",
    farm: "farm1",
    careSchedule: [
      { month: 1, activities: ["Bón phân hữu cơ", "Tưới nước"] },
      { month: 2, activities: ["Kiểm tra sâu bệnh", "Tỉa cành"] },
      { month: 3, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 4, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 5, activities: ["Chuẩn bị thu hoạch", "Tưới nước"] },
      { month: 6, activities: ["Thu hoạch", "Bón phân sau thu hoạch"] },
      { month: 7, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 8, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
      { month: 9, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 10, activities: ["Bón phân NPK", "Tưới nước"] },
      { month: 11, activities: ["Kiểm tra sâu bệnh", "Tưới nước"] },
      { month: 12, activities: ["Tỉa cành", "Bón phân hữu cơ"] },
    ],
  },
];

export const ITEMS: ItemProduct[] = [
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

export const CARE_SCHEDULE: CareSchedule[] = [
  {
    month: 1,
    activities: ["Bón phân hữu cơ", "Tưới nước"],
  },
  {
    month: 2,
    activities: ["Kiểm tra sâu bệnh", "Tỉa cành"],
  },
  {
    month: 3,
    activities: ["Bón phân NPK", "Tưới nước"],
  },
  {
    month: 4,
    activities: ["Kiểm tra sâu bệnh", "Tưới nước"],
  },
  {
    month: 5,
    activities: ["Chuẩn bị thu hoạch", "Tưới nước"],
  },
  {
    month: 6,
    activities: ["Thu hoạch", "Bón phân sau thu hoạch"],
  },
  {
    month: 7,
    activities: ["Kiểm tra sâu bệnh", "Tưới nước"],
  },
  {
    month: 8,
    activities: ["Tỉa cành", "Bón phân hữu cơ"],
  },
  {
    month: 9,
    activities: ["Kiểm tra sâu bệnh", "Tưới nước"],
  },
  {
    month: 10,
    activities: ["Bón phân NPK", "Tưới nước"],
  },
  {
    month: 11,
    activities: ["Kiểm tra sâu bệnh", "Tưới nước"],
  },
  {
    month: 12,
    activities: ["Tỉa cành", "Bón phân hữu cơ"],
  },
];
