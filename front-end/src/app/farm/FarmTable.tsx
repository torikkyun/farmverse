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

export function FarmTable({
  farms,
  loading,
  showMenu,
  setShowMenu,
  setEditFarm,
}: any) {
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
              farms.map((farm: any) => (
                <FarmTableRow
                  key={farm.id}
                  farm={farm}
                  showMenu={showMenu}
                  setShowMenu={setShowMenu}
                  onEdit={(farm: any) =>
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
