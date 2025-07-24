export type ScheduleItem = {
  date: string;
  stage: string;
  action: string;
};

export type TreeItem = {
  id: string;
  name: string;
  img: string;
  type: string;
  age: number;
  yield: number;
  status: string;
  ownerName: string;
  rentStartDate: string;
  rentEndDate: string;
  monthlyRent: number;
  totalPaid: number;
  remainingMonths: number;
  schedule: ScheduleItem[];
};
