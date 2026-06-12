import React from "react";

const SwitchBtn = ({TABS_CONFIG, activeTab, setActiveTab}) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative bg-[#0b0b0c] border border-neutral-900 p-1.5 rounded-xl flex items-center shadow-inner overflow-hidden w-full max-w-85">
        {/* Sliding Background Pill Accent */}
        <div
          className="absolute top-1.5 bottom-1.5 left-1.5 bg-neutral-800 border border-neutral-700/50 rounded-lg shadow-md transition-all duration-300 ease-out"
          style={{
            width: "calc(50% - 6px)",
            transform:
              activeTab === "recruiters"
                ? "translateX(100%)"
                : "translateX(0%)",
          }}
        />

        {/* Looped Tab Triggers */}
        {TABS_CONFIG.map((tab) => {
          const TabIcon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 w-1/2 h-10 rounded-lg text-[12.5px] font-semibold tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer select-none ${
                isSelected
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <TabIcon size={13} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SwitchBtn;

