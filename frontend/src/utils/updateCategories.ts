// utils/updateCategories.ts
import { SetURLSearchParams } from "react-router-dom";
import { Dispatch } from "redux";
import {
  setCategoryNames,
  setSelectedBrand,
  setSelectedSubCategory,
} from "../redux/slices/searchSlice";

export const updateCategories = (
  categoryToRemove: string,
  categories: string[],
  dispatch: Dispatch,
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
) => {
  if (categoryToRemove === "Clear All") {
    dispatch(setCategoryNames([]));
    dispatch(setSelectedSubCategory(""));
    dispatch(setSelectedBrand(""));
    setSearchParams(new URLSearchParams());
    return;
  }

  const updatedCategories = categories.filter(
    (category) => category !== categoryToRemove,
  );

  // Определяем, какой тип категории был удален
  const isBrandCategory = searchParams.get("brand") === categoryToRemove;
  const isSubCategory = searchParams.get("category") === categoryToRemove;
  const isSearchCategory = categoryToRemove.startsWith('Search: "');

  const newSearchParams = new URLSearchParams(searchParams);

  if (isSearchCategory) {
    newSearchParams.delete("s");
    setSearchParams(newSearchParams);
  } else if (isSubCategory) {
    newSearchParams.delete("category");
    setSearchParams(newSearchParams);
    dispatch(setSelectedSubCategory(""));
  } else if (isBrandCategory) {
    newSearchParams.delete("brand");
    setSearchParams(newSearchParams);
    dispatch(setSelectedBrand(""));
  }

  if (updatedCategories.length === 1) {
    return dispatch(setCategoryNames([]));
  }

  dispatch(setCategoryNames(updatedCategories));
};
