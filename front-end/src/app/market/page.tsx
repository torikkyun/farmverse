import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

const featuredCollections = [
  {
    title: "DDUST by jiwa",
    image: "/images/ddust.jpg",
    price: "0.0599 ETH",
    change: "",
    verified: true,
  },
  {
    title: "Pepemons",
    image: "/images/pepemons.jpg",
    price: "0.0589 ETH",
    change: "",
    verified: false,
  },
  {
    title: "DeePle Stuff",
    image: "/images/deeple.jpg",
    price: "0.0025 ETH",
    change: "-10.8%",
    verified: true,
  },
  {
    title: "Anichess Ethernals",
    image: "/images/anichess.jpg",
    price: "0.365 ETH",
    change: "-9.2%",
    verified: true,
  },
  {
    title: "Pixcape Genesis Pass",
    image: "/images/pixcape.jpg",
    price: "0.04 ETH",
    change: "+0.3%",
    verified: true,
  },
];

const trendingCollections = [
  {
    title: "Axie",
    image: "/images/axie.jpg",
    price: "5.00 RON",
    change: "-10.7%",
    verified: true,
  },
  {
    title: "NBA Top Shot",
    image: "/images/nba-top-shot.jpg",
    price: "0.93 FLOW",
    change: "+10.6%",
    verified: true,
  },
  // Thêm các bộ sưu tập khác...
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
        <div className="flex flex-1 flex-col bg-[#181a20] min-h-screen px-6">
          {/* Banner */}
          <div className="w-full rounded-2xl overflow-hidden mt-6 mb-10 relative bg-black shadow-lg min-h-[340px]">
            <img
              src="/images/parallel-banner.jpg"
              alt="Parallel Alpha"
              className="w-full h-[340px] object-cover opacity-80"
            />
            <div className="absolute left-12 bottom-12 text-white z-10">
              <h2 className="text-5xl font-bold flex items-center gap-2 drop-shadow-lg">
                Parallel Alpha
                <span className="inline-block bg-blue-600 rounded-full w-6 h-6 text-xs flex items-center justify-center ml-2">
                  ✔
                </span>
              </h2>
              <div className="text-base mt-3 flex items-center gap-2">
                By <span className="font-semibold">Parallel</span>
                <span className="w-1 h-1 bg-[#8b949e] rounded-full inline-block"></span>
                <span className="text-xs text-[#8b949e]">Verified</span>
              </div>
              <div className="flex gap-5 mt-8">
                <div className="bg-[#23262f] rounded-lg px-6 py-3 text-xs min-w-[110px]">
                  <div className="text-[#8b949e] font-mono tracking-wider">
                    FLOOR PRICE
                  </div>
                  <div className="font-bold text-base mt-1">0.0005 ETH</div>
                </div>
                <div className="bg-[#23262f] rounded-lg px-6 py-3 text-xs min-w-[110px]">
                  <div className="text-[#8b949e] font-mono tracking-wider">
                    ITEMS
                  </div>
                  <div className="font-bold text-base mt-1">5,855,182</div>
                </div>
                <div className="bg-[#23262f] rounded-lg px-6 py-3 text-xs min-w-[110px]">
                  <div className="text-[#8b949e] font-mono tracking-wider">
                    TOTAL VOLUME
                  </div>
                  <div className="font-bold text-base mt-1">77.9K ETH</div>
                </div>
                <div className="bg-[#23262f] rounded-lg px-6 py-3 text-xs min-w-[110px]">
                  <div className="text-[#8b949e] font-mono tracking-wider">
                    LISTED
                  </div>
                  <div className="font-bold text-base mt-1">50%</div>
                </div>
              </div>
            </div>
            {/* Carousel dots */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2 z-10">
              <span className="w-4 h-1.5 rounded bg-white/80"></span>
              <span className="w-4 h-1.5 rounded bg-white/40"></span>
              <span className="w-4 h-1.5 rounded bg-white/40"></span>
              <span className="w-4 h-1.5 rounded bg-white/40"></span>
              <span className="w-4 h-1.5 rounded bg-white/40"></span>
            </div>
            {/* Mini cards right */}
            <div className="absolute right-10 bottom-10 flex gap-3 z-10">
              <div className="w-16 h-24 bg-[#23262f] rounded-lg overflow-hidden border border-[#23262f]">
                <img
                  src="/images/mini1.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-24 bg-[#23262f] rounded-lg overflow-hidden border border-[#23262f]">
                <img
                  src="/images/mini2.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-16 h-24 bg-[#23262f] rounded-lg overflow-hidden border border-[#23262f]">
                <img
                  src="/images/mini3.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Tabs filter */}
          <div className="flex gap-2 mb-8">
            {[
              "All",
              "Gaming",
              "Art",
              "PFPs",
              "Memberships",
              "Music",
              "Photography",
            ].map((tab, idx) => (
              <button
                key={tab}
                className={`px-5 py-2 rounded-lg text-sm font-medium border border-transparent transition ${
                  idx === 0
                    ? "bg-white/10 text-white shadow"
                    : "bg-[#23262f] text-[#8b949e] hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Featured Collections */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-1">
              Featured Collections
            </h3>
            <div className="text-sm text-[#8b949e] mb-5">
              This week's curated collections
            </div>
            <div className="flex gap-6 overflow-x-auto pb-2">
              {featuredCollections.map((col) => (
                <Card
                  key={col.title}
                  className="min-w-[260px] bg-[#23262f] rounded-2xl overflow-hidden shadow-lg border border-[#23262f] hover:border-white/10 transition"
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white truncate">
                        {col.title}
                      </span>
                      {col.verified && (
                        <span className="inline-block bg-blue-600 rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                          ✔
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#8b949e] mt-1">
                      Floor price: {col.price}{" "}
                      {col.change && (
                        <span
                          className={
                            col.change.startsWith("+")
                              ? "text-green-400"
                              : "text-red-400"
                          }
                        >
                          {col.change}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Trending Tokens (placeholder) */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white mb-1">
              Trending Tokens
            </h3>
            <div className="text-sm text-[#8b949e] mb-5">
              Here are some trending tokens...
            </div>
            {/* Add your trending tokens component or table here */}
            <div className="bg-[#23262f] rounded-2xl p-8 text-white text-center opacity-60">
              Coming soon...
            </div>
          </div>

          {/* Trending Collections */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-white mb-1">
              Trending Collections
            </h3>
            <div className="text-sm text-[#8b949e] mb-5">
              Highest sales in the past hour
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trendingCollections.map((col) => (
                <Card
                  key={col.title}
                  className="bg-[#23262f] rounded-xl overflow-hidden flex items-center gap-3 p-3 border border-[#23262f] hover:border-white/10 transition"
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-white">
                        {col.title}
                      </span>
                      {col.verified && (
                        <span className="inline-block bg-blue-600 rounded-full w-4 h-4 text-[10px] flex items-center justify-center ml-1">
                          ✔
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#8b949e]">
                      {col.price}{" "}
                      <span
                        className={
                          col.change.startsWith("+")
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {col.change}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* NFT 101 */}
          <div className="mt-16">
            <h3 className="text-xl font-semibold text-white mb-1">NFT 101</h3>
            <div className="text-sm text-[#8b949e] mb-5">
              Learn about NFTs, Web3, and more.
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { title: "What is an NFT?", image: "/images/nft101-1.png" },
                { title: "How to buy an NFT", image: "/images/nft101-2.png" },
                { title: "What is minting?", image: "/images/nft101-3.png" },
                {
                  title: "How to stay protected in web3",
                  image: "/images/nft101-4.png",
                },
                {
                  title: "How to create an NFT on OpenSea",
                  image: "/images/nft101-5.png",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="min-w-[220px] bg-[#23262f] rounded-xl overflow-hidden shadow p-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-28 object-cover rounded mb-2"
                  />
                  <div className="text-white font-medium">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
