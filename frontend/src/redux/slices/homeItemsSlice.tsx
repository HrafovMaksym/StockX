import { createSlice } from "@reduxjs/toolkit";
import { userCardProps } from "../../@types/userCardTypes";

interface IitemsProps {
  title: string;
  data: userCardProps[];
  description: string;
}
interface IHomeItems {
  addidasItems: IitemsProps;
  nikeItems: IitemsProps;
  balenciagaItems: IitemsProps;
  accessories: IitemsProps;
  supremeItems: IitemsProps;
  timberlandItems: IitemsProps;
  rickOwensItems: IitemsProps;
  instagramSectionItems: { data: userCardProps[]; image: "" }[];
}

const initialState: IHomeItems = {
  addidasItems: { title: "", data: [], description: "" },
  nikeItems: { title: "", data: [], description: "" },
  balenciagaItems: { title: "", data: [], description: "" },
  accessories: { title: "", data: [], description: "" },
  supremeItems: { title: "", data: [], description: "" },
  timberlandItems: { title: "", data: [], description: "" },
  rickOwensItems: { title: "", data: [], description: "" },
  instagramSectionItems: [{ data: [], image: "" }],
};
const homeItems = createSlice({
  name: "homeItems",
  initialState,
  reducers: {
    setAddidasItems: (state, action) => {
      state.addidasItems = action.payload;
    },
    setNikeItems: (state, action) => {
      state.nikeItems = action.payload;
    },
    setBalenciagaItems: (state, action) => {
      state.balenciagaItems = action.payload;
    },
    setAccessories: (state, action) => {
      state.accessories = action.payload;
    },
    setSupremeItems: (state, action) => {
      state.supremeItems = action.payload;
    },
    setInstagramItems: (state, action) => {
      state.instagramSectionItems = action.payload;
    },
    setTimberlandItems: (state, action) => {
      state.timberlandItems = action.payload;
    },
    setRickOwensItems: (state, action) => {
      state.rickOwensItems = action.payload;
    },
  },
});

export const {
  setAddidasItems,
  setNikeItems,
  setBalenciagaItems,
  setAccessories,
  setSupremeItems,
  setInstagramItems,
  setTimberlandItems,
  setRickOwensItems,
} = homeItems.actions;
export default homeItems.reducer;
