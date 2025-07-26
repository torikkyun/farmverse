import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Farm } from "./types/market";

export default function FarmList({
  farms,
  viewMode = "grid",
}: {
  farms: Farm[];
  viewMode?: "grid" | "list";
}) {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <h2 className="text-3xl font-bold text-primary mb-2">
        Các trang trại nổi bật
      </h2>
      <p className="text-lg text-muted-foreground mb-6">
        Những trang trại nổi bật nhất tuần của Farmverse
      </p>
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
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
                  src={
                    farm.images?.[0] ||
                    farm.user.avatar ||
                    "/images/default.jpg"
                  }
                  alt={farm.name}
                  width={600}
                  height={176}
                  className="rounded-t-xl h-80 w-full object-cover"
                  priority
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-lg">{farm.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground font-medium">
                      Chủ trang trại:
                    </span>
                    <span className="font-semibold">{farm.user.name}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground font-medium">
                      Địa điểm:
                    </span>
                    <span className="font-semibold">
                      {[
                        farm.address?.city || farm.address?.province,
                        farm.address?.commune,
                      ]
                        .filter(Boolean)
                        .join(", ") || "Chưa cập nhật"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground font-medium">
                      Diện tích:
                    </span>
                    <span className="font-semibold">
                      {farm.size.toLocaleString()} ha
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
