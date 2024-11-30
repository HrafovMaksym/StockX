import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { Link } from "react-router-dom";

import { SearchItem } from "../../../types/searchTypes";

const SearchedItem: React.FC<SearchItem> = ({ image, title, base_price }) => {
  const onClickFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };
  if (!image) {
    console.log("NO IMAGe ");
  }
  return (
    <>
      <Link
        to={`/${title}`}
        className="relative flex h-full w-[200px] cursor-pointer flex-col items-center"
      >
        <button onClick={onClickFavorite} className="absolute right-5">
          <FavoriteBorderIcon />
        </button>
        <img
          className="h-[140px] min-h-[140px] w-full object-contain p-4"
          src={
            image
              ? image
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
          }
          alt=""
        />
        <div className="px-4 py-0">
          <h4 className="mb-1">{title}</h4>
          <p className="text-sm text-gray-400">Lowest Ask</p>
          <b className="f font-mono text-[23px]">€{base_price}</b>
        </div>
      </Link>
    </>
  );
};

export default SearchedItem;
