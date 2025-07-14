import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FarmTableRow } from "./FarmTableRow";
import React from "react";

interface Farm {
  id: string | number;
  name: string;
  description?: string;
  location?: string;
  size?: string | number;
  images?: string[] | string;
}

interface FarmTableProps {
  farms: Farm[];
  loading: boolean;
  showMenu: string | number | null;
  setShowMenu: (id: string | number | null) => void;
  setEditFarm: (farm: Farm) => void;
}

export default function FarmTable({
  farms,
  loading,
  showMenu,
  setShowMenu,
  setEditFarm,
}: FarmTableProps) {
  return (
    <div className="rounded-xl shadow border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Ảnh</TableHead>
              <TableHead>Tên nông trại</TableHead>
              <TableHead>Chủ nông trại</TableHead>
              <TableHead>Địa chỉ</TableHead>
              <TableHead>Diện tích (ha)</TableHead>
              <TableHead>Mô tả</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7}>Đang tải...</TableCell>
              </TableRow>
            ) : farms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7}>Không có dữ liệu</TableCell>
              </TableRow>
            ) : (
              farms.map((farm: Farm) => (
                <FarmTableRow
                  key={farm.id}
                  farm={{
                    ...farm,
                    images: Array.isArray(farm.images)
                      ? farm.images
                      : typeof farm.images === "string" && farm.images
                      ? [farm.images]
                      : [],
                  }}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  onEdit={(farm: Farm) =>
                    setEditFarm({
                      ...farm,
                      images: Array.isArray(farm.images)
                        ? farm.images.join(", ")
                        : farm.images || "",
                    })
                  }
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
