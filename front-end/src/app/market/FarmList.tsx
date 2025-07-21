import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export type Farm = {
  id: string;
  name: string;
  description: string;
  location: string;
  size: number;
  images: string[];
  owner: {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
  };
  cropType?: string; // Thêm loại cây trồng
};

export function FarmList({
  farms,
  viewMode = "grid",
}: {
  farms: Farm[];
  viewMode?: "grid" | "list";
}) {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <h2 className="text-2xl font-bold text-primary mb-1">
        Các trang trại nổi bật
      </h2>
      <p className="text-muted-foreground mb-5">
        Những trang trại nổi bật nhất tuần của Farmverse
      </p>
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "grid-cols-1 gap-4"
        } p-4`}
        style={{
          overflowX: "hidden",
          overflowY: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {farms.map((farm, idx) => (
          <Link
            key={farm.id || idx}
            href={`/product/${farm.id}`}
            className="block"
          >
            <Card className="w-full bg-card border border-muted-foreground/10 hover:scale-[1.03] transition-transform duration-200 overflow-x-hidden">
              <CardContent className="p-0">
                <Image
                  src={farm.images?.[0] || "/images/default.jpg"}
                  alt={farm.name}
                  width={600}
                  height={176}
                  className="rounded-t-xl h-44 w-full object-cover"
                  priority
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base">
                      Nông trại: {farm.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-muted-foreground">Địa điểm:</span>
                    <span className="font-medium">{farm.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="text-muted-foreground">Diện tích:</span>
                    <span className="font-medium">
                      {farm.size.toFixed(0)} ha
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="text-muted-foreground">
                      Loại cây trồng:
                    </span>
                    <span className="font-medium">
                      {farm.cropType || "Chưa cập nhật"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
