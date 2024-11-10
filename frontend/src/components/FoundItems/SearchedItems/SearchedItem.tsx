type SearchedItemProps = {
  image: string;
  brand: string;
  name: string;
  color: string;
};
const SearchedItem: React.FC<SearchedItemProps> = ({
  image,
  brand,
  name,
  color,
}) => {
  return (
    <div className="flex w-full cursor-pointer items-center border-b-2 border-b-lightGray transition-all duration-100 hover:border-r-8 hover:border-r-green-900">
      <img className="m-5 h-28 w-32" src={image} />
      <div className="flex flex-col">
        <div className="text-[12px] uppercase leading-3">{brand}</div>
        <div className="text-lg font-bold uppercase leading-5 text-black">
          {name}
        </div>
        <div className="m-0 text-[13px] font-bold uppercase leading-5">
          {color}
        </div>
      </div>
    </div>
  );
};

export default SearchedItem;
