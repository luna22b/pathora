const BrowseSearch = ({ records = [], totalCount }) => {
  return (
    <div>
      <p className="flex justify-center mt-8 font-semibold text-2xl">
        Plant Database
      </p>
      <p className="mt-3 text-[#737373] text-center text-sm w-full px-4">
        Discover thousands of plant species with comprehensive botanical data
        powered by the Trefle API.
      </p>
      <div className="text-center mt-3 mb-4 text-xs text-[#737373] font-medium">
        {totalCount.toLocaleString()} species available
      </div>
      <div className="flex justify-center w-[90vw] shadow-xs mb-6 h-50 max-w-sm md:max-w-2xl lg:max-w-4xl rounded-lg mx-auto px-4 border border-[#eee]">
        <input
          type="text"
          placeholder="Search Plants..."
          className="border border-[#ddd] h-10 w-[80vw] rounded-lg bg-[#f5f5f5] pl-12 pr-4 outline-none focus:border-black transition-colors duration-200 mt-4"
        />
      </div>
    </div>
  );
};

export default BrowseSearch;
