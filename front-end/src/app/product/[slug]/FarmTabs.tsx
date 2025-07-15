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
        {activeTab === 0 && (
          <NFTGrid items={items} selectedItems={selectedItems} onSelect={handleSelect} />
        )}
        {activeTab === 1 && (
          <DungGrid dungs={dungs} selectedItems={selectedItems} onSelect={handleSelect} />
        )}
        {activeTab === 2 }
      </main>
    </>
  );
}