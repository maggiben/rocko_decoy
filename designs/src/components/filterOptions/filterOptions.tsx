const FilterOptions = () => {
  return (
    <div className="absolute invisible opacity-0 duration-300 group-hover:visible group-hover:opacity-100 top-[calc(100%+10px)] left-0 w-full bg-white rounded-md shadow-md z-10 min-w-[256px] p-2 flex flex-col gap-4 border">
      <div className="p-4 flex items-center justify-start gap-3">
        <input
          type="checkbox"
          className="checkbox"
          id="custom-checkbox-1"
        />
        <label
          htmlFor="custom-checkbox-1"
          className="text-sm font-medium text-blackPrimary"
        >
          Filter Options selected
        </label>
      </div>
      <div className="p-4 flex items-center justify-start gap-3">
        <input type="checkbox" className="checkbox" id="custom-checkbox-2" />
        <label
          htmlFor="custom-checkbox-2"
          className="text-sm font-medium text-blackPrimary"
        >
          Filter Options
        </label>
      </div>
      <div className="p-4 flex items-center justify-start gap-3">
        <input type="checkbox" className="checkbox" id="custom-checkbox-3" />
        <label
          htmlFor="custom-checkbox-3"
          className="text-sm font-medium text-blackPrimary"
        >
          Filter Options
        </label>
      </div>
    </div>
  );
};

export default FilterOptions;
