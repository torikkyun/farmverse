interface TabMenuProps {
  tabs: { label: string }[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export default function TabMenu({ tabs, activeTab, setActiveTab }: TabMenuProps) {
  return (
  <nav className="w-full bg-black border-b border-black/20 shadow-sm">
      <ul className="flex gap-2 px-0 py-2 justify-center">
        {tabs.map((item, idx) => (
          <li key={item.label}>
            <button
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2 rounded-lg font-semibold transition-all duration-150
                ${
                  activeTab === idx
                    ? "bg-white text-black font-bold shadow"
                    : "bg-[#232323] text-white/80 hover:bg-white/10"
                }
              `}
              style={{ letterSpacing: 1, minWidth: 64 }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}