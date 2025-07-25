const StatCard = () => {
  return (
    <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center space-y-6 px-4">
      <div className="flex w-full flex-wrap justify-center gap-4">
        <div className="h-[140px] max-w-[320px] min-w-[240px] flex-1 rounded-lg border border-[#a3c7f9] p-4 shadow-md">
          <div className="text-[15px] font-semibold text-[#525252]">
            Plants Identified
          </div>
        </div>
        <div className="h-[140px] max-w-[320px] min-w-[240px] flex-1 rounded-lg border border-[#fff49f] p-4 shadow-md">
          <div className="text-[15px] font-semibold text-[#525252]">
            Journal Entries
          </div>
        </div>
        <div className="h-[140px] max-w-[320px] min-w-[240px] flex-1 rounded-lg border border-[#f5a3a3] p-4 shadow-md">
          <div className="text-[15px] font-semibold text-[#525252]">
            Gallery Images
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
        <div className="h-40 max-w-[400px] min-w-[280px] flex-1 rounded-lg border border-[#b6f0bb] bg-[#f6fdf6] p-4 shadow-md" />
        <div className="h-40 max-w-[400px] min-w-[280px] flex-1 rounded-lg border border-[#a3c7f9] bg-[#f7fbff] p-4 shadow-md" />
        <div className="h-40 max-w-[400px] min-w-[280px] flex-1 rounded-lg border border-[#f5a3a3] bg-[#fffafa] p-4 shadow-md" />
      </div>
    </div>
  );
};

export default StatCard;
