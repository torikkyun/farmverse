import TabMenu from "../components/tab-menu";
import NFTGrid from "../components/nft-grid";
import DungGrid from "../components/dung-grid";

type NFTItem = {
  id: number;
  name: string;
  price: string;
  image: string;
};

interface Props {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  items: NFTItem[];
  dungs: NFTItem[];
  selectedItems: number[];
  handleSelect: (id: number) => void;
}

export default function FarmTabs({
  activeTab,
  setActiveTab,
  items,
  dungs,
  selectedItems,
  handleSelect,
}: Props) {
  const data = activeTab === 0 ? items : dungs;

  return (
    <>
      <TabMenu
        tabs={[
          { label: "Cây trồng" },
          { label: "Phân bón" },
          { label: "Lịch trình farm" },
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1 p-6 bg-white">
        <div>
          {data.length === 0 && (
            <div className="text-gray-400 py-4 text-center">
              Không có dữ liệu
            </div>
          )}
          {data.map((item) => (
            <div
              key={item.id}
              className="border-b py-2 flex items-center gap-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded"
              />
              <span>{item.name}</span>
              <span className="ml-2 text-xs text-gray-500">{item.price}đ</span>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
