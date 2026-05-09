import type { AppTab } from "@/lib/types";

type TabNavigationProps = {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
};

const tabs: { id: AppTab; label: string }[] = [
  { id: "search", label: "散歩を探す" },
  { id: "favorites", label: "お気に入り" },
  { id: "records", label: "記録する" },
  { id: "summary", label: "サマリー" },
];

export function TabNavigation({
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  return (
    <nav className="px-4" aria-label="画面切り替え">
      <div className="grid grid-cols-4 gap-2 rounded-full bg-emerald-100/70 p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          // タブはbutton要素にして、スマホでも押しやすい高さを確保します。
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`min-h-[44px] rounded-full px-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "border border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
