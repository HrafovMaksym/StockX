import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  setCategoryNames,
  setSelectedBrand,
  setSelectedColor,
  setSelectedGender,
  setSelectedSubCategory,
} from "../../../redux/slices/searchSlice";
import { useSearchParams } from "react-router-dom";
import ChosenCategoryItem from "./ChosenCaregoryItem";
import clsx from "clsx";
import ChosenCategorySkeleton from "./ChosenCategoryItemSkeleton";
import { color } from "framer-motion";

interface ChosenCategoryListProps {
  isLoading: boolean;
}

const ChosenCategoryList: React.FC<ChosenCategoryListProps> = React.memo(
  ({ isLoading }) => {
    const categoryNames = useAppSelector(
      (state) => state.searchSlice.categoryNames,
    );
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const selectedColor = useAppSelector(
      (state) => state.searchSlice.selectedColor,
    );
    useEffect(() => {
      const searchTerm = searchParams.get("s");
      const categoryTerm = searchParams.get("category");
      const brandTerm = searchParams.get("brand");
      const genderTerm = searchParams.get("gender");
      const trendingTerm = searchParams.get("trending");
      const colorTerm = searchParams.get("color");
      const defaultCategories = [];

      if (
        searchTerm ||
        categoryTerm ||
        brandTerm ||
        genderTerm ||
        trendingTerm ||
        colorTerm
      ) {
        defaultCategories.push("Clear All");
      }

      if (searchTerm) {
        defaultCategories.push(`Search: "${searchTerm}"`);
      }

      if (categoryTerm) {
        dispatch(setSelectedSubCategory(categoryTerm));
        defaultCategories.push(categoryTerm);
      }
      if (brandTerm) {
        dispatch(setSelectedBrand(brandTerm));
        defaultCategories.push(brandTerm);
      }
      if (genderTerm) {
        dispatch(setSelectedGender(genderTerm));
        defaultCategories.push(genderTerm);
      }
      if (trendingTerm) {
        defaultCategories.push(trendingTerm);
      }
      if (colorTerm) {
        dispatch(setSelectedColor(colorTerm));

        defaultCategories.push(colorTerm);
      }

      dispatch(setCategoryNames(defaultCategories));
    }, [dispatch, searchParams]);

    if (!isLoading && categoryNames.length === 0) {
      return null;
    }

    return (
      <div
        className={clsx("transition-all duration-200", {
          "flex h-10 w-full flex-wrap items-center gap-1": true,
        })}
      >
        {isLoading
          ? Array(2)
              .fill(null)
              .map((_, index) => (
                <ChosenCategorySkeleton
                  key={`skeleton-${index}`}
                  categoryName={index === 0 ? "Clear All" : ""}
                />
              ))
          : categoryNames.map((category) => (
              <ChosenCategoryItem
                selectedColor={selectedColor}
                key={`category-${category}`}
                categoryName={category}
              />
            ))}
      </div>
    );
  },
);

ChosenCategoryList.displayName = "ChosenCategoryList";

export default ChosenCategoryList;
