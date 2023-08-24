const SortOptions = ({ setSortOption }: { setSortOption: Function }) => {
  return (
    <div className="absolute invisible opacity-0 duration-300 group-hover:visible group-hover:opacity-100 top-[calc(100%+10px)] right-0 w-full bg-white rounded-md shadow-md z-10 min-w-[256px] p-2 flex flex-col gap-2 border">
      <div className="p-2 flex items-center justify-between gap-3">
        <label className="cursor-pointer" htmlFor="custom-radio-1">
          APR (lowest to highest)
        </label>
        <input
          type="radio"
          className="radio"
          id="custom-radio-1"
          value="APR (lowest)"
          name="custom-radio"
          onChange={(e) => setSortOption(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center justify-between gap-3">
        <label
          htmlFor="custom-radio-2"
          className="text-sm font-medium text-blackPrimary cursor-pointer"
        >
          APR (highest to lowest)
        </label>
        <input
          type="radio"
          className="radio"
          id="custom-radio-2"
          name="custom-radio"
          value="APR (highest)"
          onChange={(e) => setSortOption(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center justify-between gap-3">
        <label
          htmlFor="custom-radio-3"
          className="text-sm font-medium text-blackPrimary cursor-pointer"
        >
          Label-1
        </label>
        <input
          type="radio"
          className="radio"
          id="custom-radio-3"
          name="custom-radio"
          value="Label-1"
          onChange={(e) => setSortOption(e.target.value)}
        />
      </div>
      <div className="p-2 flex items-center justify-between gap-3">
        <label
          htmlFor="custom-radio-4"
          className="text-sm font-medium text-blackPrimary cursor-pointer"
        >
          Label-2
        </label>
        <input
          type="radio"
          className="radio"
          id="custom-radio-4"
          name="custom-radio"
          value="Label-2"
          onChange={(e) => setSortOption(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SortOptions;
