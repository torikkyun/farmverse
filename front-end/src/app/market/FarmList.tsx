import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
};

export function FarmList({ farms }: { farms: Farm[] }) {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <h2 className="text-2xl font-bold text-primary mb-1">
        Các trang trại nổi bật
      </h2>
      <p className="text-muted-foreground mb-5">
        Những trang trại nổi bật nhất tuần của Farmverse
      </p>
      <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30">
        {farms.map((farm, idx) => (
          <Link
            key={farm.id || idx}
            href={`/product/${farm.id}`}
            className="block"
          >
            <Card className="w-80 min-w-[320px] bg-card border border-muted-foreground/10 hover:scale-[1.03] transition-transform duration-200 overflow-x-hidden">
              <CardContent className="p-0">
                <img
                  src={farm.images?.[0] || "/images/default.jpg"}
                  alt={farm.name}
                  className="rounded-t-xl h-44 w-full object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base">
                      {farm.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <span className="text-muted-foreground">Địa điểm:</span>
                    <span className="font-medium">{farm.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm">
                    <span className="text-muted-foreground">Diện tích:</span>
                    <span className="font-medium">{farm.size} m²</span>
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