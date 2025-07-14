import { Card } from "@/components/ui/card";

interface SettingsTabMenuProps {
  activeTab: "profile" | "account";
  setActiveTab: (tab: "profile" | "account") => void;
}

export default function SettingsTabMenu({
  activeTab,
  setActiveTab,
}: SettingsTabMenuProps) {
  return (
    <Card className="p-4 rounded-2xl shadow-md w-full h-full flex flex-col justify-start">
      <div className="flex flex-row md:flex-col gap-2">
        <button
          type="button"
          className={`text-left px-3 py-2 rounded font-semibold transition ${
            activeTab === "profile" ? "bg-muted" : "hover:bg-muted"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Thông tin
        </button>
        <button
          type="button"
          className={`text-left px-3 py-2 rounded font-semibold transition ${
            activeTab === "account" ? "bg-muted" : "hover:bg-muted"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Tài khoản
        </button>
      </div>
    </Card>
  );
}
