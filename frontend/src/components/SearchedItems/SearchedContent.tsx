import { useSearchParams } from "react-router-dom";
import { useSearchItemsQuery } from "../../redux/api/mainApiSlice";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./BreadCramb/BreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";

import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";
import { useAppSelector } from "../../redux/hook";
import CategoryItem from "./CategoryList/CategoryItem";

const SearchedContent = () => {
  const [searchParams] = useSearchParams();
  const categoryNames = useAppSelector(
    (state) => state.searchSlice.categoryNames,
  );
  const searchQuery = searchParams.get("s") ? searchParams.get("s") : null;

  const { data, isLoading, isError, isSuccess } = useSearchItemsQuery(
    searchQuery ?? "",
  );

  return (
    <div className="mt-3 flex h-full w-24 min-w-[1240px] items-start justify-between">
      <div className="h-full w-[300px] bg-red-500">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
      <div className="h-full w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb isLoading={isLoading} />
          <FilterSelect isLoading={isLoading} />
        </div>

        <h1 className="text-lg text-blackTextColor">
          {searchQuery &&
            `Browse ${isLoading ? "..." : "1000"} results for ${searchQuery}`}
        </h1>

        <div className="flex flex-col">
          <ChosenCategoryList isLoading={isLoading} />
          <SearchedItemsList items={data && data.data} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
