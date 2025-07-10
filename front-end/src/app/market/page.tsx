"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

const featuredCollections = [
  {
    title: "DDUST by jiwa",
    img: "/images/ddust.jpg",
    floor: "0.0536",
    change: -32.8,
    verified: true,
  },
  {
    title: "Pepemons",
    img: "/images/pepemons.jpg",
    floor: "0.0549",
    change: -19.9,
    verified: true,
  },
  {
    title: "DeePle Stuff",
    img: "/images/deeple.jpg",
    floor: "0.0025",
    change: -10.8,
    verified: true,
  },
  {
    title: "Anichess Ethernals",
    img: "/images/anichess.jpg",
    floor: "0.367",
    change: -8.3,
    verified: true,
  },
];

const trendingTokens = [
  {
    name: "Chill ...",
    symbol: "CHILL",
    price: "$0.02",
    change: 136.9,
    img: "/images/chill.png",
  },
  {
    name: "Alt...",
    symbol: "ALT",
    price: "$0.05",
    change: 100.3,
    img: "/images/alt.png",
    badge: "MỚI",
  },
  {
    name: "Use...",
    symbol: "USELESS",
    price: "$0.32",
    change: 45.8,
    img: "/images/useless.png",
  },
  {
    name: "Kled AI",
    symbol: "KLED",
    price: "$0.01",
    change: 36,
    img: "/images/kled.png",
  },
  {
    name: "Kori",
    symbol: "KORI",
    price: "$0.02",
    change: 101.5,
    img: "/images/kori.png",
  },
  {
    name: "Sta...",
    symbol: "STARTUP",
    price: "$0.04",
    change: 56.8,
    img: "/images/startup.png",
  },
  {
    name: "IKUN",
    symbol: "IKUN",
    price: "$0.02",
    change: 42.9,
    img: "/images/ikun.png",
  },
  {
    name: "House...",
    symbol: "House",
    price: "$0.02",
    change: 32.2,
    img: "/images/house.png",
  },
];

export default function MarketPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-background m-7">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary mb-1">
              Các trang trại nổi bật
            </h2>
            <p className="text-muted-foreground mb-5">
              Những trang trại nổi bật nhất tuần của Farmverse
            </p>
            <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted-foreground/30">
              {featuredCollections.map((col, idx) => (
                <Link
                  key={idx}
                  href={`/product/${col.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="block"
                >
                  <Card className="w-80 min-w-[320px] bg-card border border-muted-foreground/10 hover:scale-[1.03] transition-transform duration-200 overflow-x-hidden">
                    <CardContent className="p-0">
                      <img
                        src={col.img}
                        alt={col.title}
                        className="rounded-t-xl h-44 w-full object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">
                            {col.title}
                          </span>
                          {col.verified && (
                            <Badge
                              variant="secondary"
                              className="px-1 py-0.5 text-xs"
                            >
                              ✔
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <span className="text-muted-foreground">Giá:</span>
                          <span className="font-medium">{col.floor} ETH</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Token xu hướng */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-1">
              Các cây trồng xu hướng
            </h2>
            <p className="text-muted-foreground mb-5">
              Top cây trồng phổ biến nhất trong nhất 24h qua
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {trendingTokens.map((token, idx) => (
                <div key={idx} className="relative group">
                  <Link
                    href={`/product/${token.symbol.toLowerCase()}`}
                    className="block"
                  >
                    <Card className="bg-card border border-muted-foreground/10 shadow-md hover:shadow-xl transition-shadow group-hover:ring-2 group-hover:ring-primary/60">
                      <CardContent className="flex items-center gap-3 p-3">
                        <Avatar className="h-12 w-12 border border-muted-foreground/20">
                          <AvatarImage src={token.img} alt={token.symbol} />
                          <AvatarFallback>{token.symbol[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 truncate">
                            <span className="font-semibold truncate">
                              {token.name}
                            </span>
                            {token.badge && (
                              <Badge
                                variant="outline"
                                className="ml-1 text-xs border-green-500 text-green-600"
                              >
                                {token.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {token.symbol}
                          </div>
                        </div>
                        <div className="text-right min-w-[70px]">
                          <div className="font-medium">{token.price}</div>
                          <div
                            className={
                              token.change > 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {token.change > 0 ? "+" : ""}
                            {token.change}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
