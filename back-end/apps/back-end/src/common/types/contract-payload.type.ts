import { Prisma, $Enums } from 'generated/prisma';

export type ContractQueuePayload = {
  transactionId: string;
  userId: string;
  items: {
    itemId: string;
    quantity: number;
    includesIot: boolean;
    startDate: Date;
    endDate: Date;
  }[];
  totalPrice: number;
  itemRecords: ({
    id: string;
    details: Prisma.JsonValue;
    type: $Enums.ItemType;
    farmId: string;
    name: string;
    description: string | null;
    images: string[];
    price: number;
    stock: number;
  } | null)[];
  farmRecord: {
    userId: string;
    id: string;
    name: string;
    address: Prisma.JsonValue;
    description: string | null;
    images: string[];
    size: number;
    schedule: Prisma.JsonValue[];
  } | null;
};
