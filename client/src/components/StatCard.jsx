const StatCard = () => {
  return (
    <div>
      <div className="mt-5 grid grid-cols-2 w-[90vw] gap-2">
        <div className="h-[100px] mt-4 rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#b6f0bb]">
          <div className="mt-2 font-semibold text-[#525252] text-[15px]">
            Plants Identified
          </div>
        </div>
        <div className="h-[100px] mt-4 rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#a3c7f9]">
          <div className="mt-2 font-semibold text-[#525252] text-[15px]">
            Care Streak
          </div>
        </div>
        <div className="h-[100px] mt-4 rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#fff49f]">
          <div className="mt-2 font-semibold text-[#525252] text-[15px]">
            Journal Entries
          </div>
        </div>
        <div className="h-[100px] mt-4 rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#f5a3a3]">
          <div className="mt-2 font-semibold text-[#525252] text-[15px]">
            Favorites
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center flex-col">
        <div className="h-[60px] mt-4 w-[90vw] rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#b6f0bb] bg-[#f6fdf6]">
          <div></div>
        </div>
        <div className="h-[60px] mt-4 w-[90vw] rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#a3c7f9] bg-[#f7fbff]">
          <div></div>
        </div>
        <div className="h-[60px] mt-4 w-[90vw] rounded-lg shadow-[0_2px_8px_0_rgba(99,99,99,0.2)] border border-[#f5a3a3] bg-[#fffafa]">
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
