import { useSearchParams } from "react-router-dom";
import { useLazySearchItemsQuery } from "../../redux/api/mainApiSlice";
import { SearchResponse, SearchParams } from "../../types/searchTypes";
import ChosenCategoryList from "./ChosenCategory/ChosenCategoryList";
import FilterBreadCrumb from "./BreadCramb/BreadCrumb";
import FilterSelect from "./FilterSelect/FilterSelect";
import SearchedItemsList from "./SearchedItemsList/SearchedItemsList";
import CategoryList from "./CategoryList/CategoryList";
import { useEffect } from "react";
import BrandsList from "./BrandsList/BrandsList";
import GenderList from "./GenderList/GenderList";

const SearchedContent = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("s") ?? "";
  const categoryQuery = searchParams.get("category") || "";
  const brandQuery = searchParams.get("brand") || "";
  const page = Number(searchParams.get("page")) || 1;
  const genderQuery = searchParams.get("gender") || "";
  const [fetchData, { data, isLoading, error }] = useLazySearchItemsQuery<{
    data: SearchResponse;
    error: any;
    isLoading: boolean;
  }>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const searchParams: SearchParams = {
      searchingValue: [searchQuery].filter(Boolean).join(" "),
      categoryQuery: [categoryQuery].filter(Boolean).join(" "),
      brandQuery: [brandQuery].filter(Boolean).join(" "),
      genderQuery: [genderQuery].filter(Boolean).join(" "),
    };
    fetchData(searchParams);
  }, [searchQuery, categoryQuery, page, fetchData, brandQuery, genderQuery]);

  if (error) {
    return (
      <div className="mt-3 flex justify-center text-red-500">
        Error loading items. Please try again later.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-3 flex h-full w-full max-w-[1240px] items-start justify-between px-4">
      <div className="h-full w-[300px]">
        <CategoryList />
        <BrandsList />
        <GenderList />
      </div>
      <div className="h-full w-full max-w-[927px] p-2">
        <div className="flex h-10 justify-between">
          <FilterBreadCrumb isLoading={isLoading} />
          <FilterSelect isLoading={isLoading} />
        </div>

        <h1 className="text-lg text-blackTextColor">
          {searchQuery &&
            `Browse ${isLoading ? "..." : data?.total || 0} results for ${searchQuery}`}
        </h1>

        <div className="flex flex-col">
          <ChosenCategoryList isLoading={isLoading} />
          <SearchedItemsList
            items={data?.data}
            isLoading={isLoading}
            total={data?.total || 0}
            currentPage={page}
            totalPages={data?.totalPages || 1}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchedContent;
