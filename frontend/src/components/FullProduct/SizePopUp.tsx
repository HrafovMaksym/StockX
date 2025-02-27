import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SizeVariants } from "../../utils/SizeVariants";

export type variants = {
  id: string;
  price: number;
  product_id: string;
  size: string;
};
interface SizePopUpType {
  price: number;
  sellVisible: boolean;
  variants: variants[];
  setIsPrice?: (value: number) => void;
}
const SizePopUp: React.FC<SizePopUpType> = ({
  price,
  sellVisible,
  variants,
  setIsPrice,
}) => {
  const [searchParams, setSearhParams] = useSearchParams();
  const sizeQuery = searchParams.get("size");
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const sizeSystem = "US";
  const mainPrice = Math.round(price);
  const [sortedVariants, setSortedVariants] = useState<variants[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isValue, setIsValue] = useState("All");
  const onClickPopUp = () => {
    setIsOpen(!isOpen);
  };
  const onClickAllSizes = () => {
    setIsOpen(false);
    setIsValue("All");
    if (setIsPrice) setIsPrice(mainPrice);
  };
  const onClickSize = (value: string, price?: number) => {
    setIsOpen(false);
    setIsValue(`${sizeSystem + " " + value}`);
    if (setIsPrice && price) setIsPrice(price);
  };

  useEffect(() => {
    variants.sort(
      (a, b) => sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size),
    );
    const sortedVariants = variants.find((el) => el.size.includes("Y"))
      ? variants.sort(
          (big, small) =>
            Number(big.size.split("Y")[0]) - Number(small.size.split("Y")[0]),
        )
      : variants.sort((big, small) => Number(big.size) - Number(small.size));
    setSortedVariants(sortedVariants);
  }, []);

  useEffect(() => {
    const sizeQueryValue = isValue.split(" ")[1];
    if (isValue !== "All") {
      const updatedsearchParams = new URLSearchParams(searchParams);
      updatedsearchParams.set("size", sizeQueryValue);
      setSearhParams(updatedsearchParams, { replace: true });
    }
    if (isValue === "All" && searchParams.get("size")) {
      const updatedsearchParams = new URLSearchParams(searchParams);
      updatedsearchParams.delete("size");
      setSearhParams(updatedsearchParams, { replace: true });
    }
  }, [isValue]);
  useEffect(() => {
    if (sizeQuery) {
      setIsValue(`${sizeSystem + " " + sizeQuery}`);
      const priceByQuery = sortedVariants.find((el: variants) =>
        el.size.includes(sizeQuery),
      )?.price;

      if (setIsPrice && priceByQuery) setIsPrice(priceByQuery);
    } else {
      if (setIsPrice) setIsPrice(mainPrice);
    }
  }, []);

  const sellVariants = SizeVariants(variants);
  return (
    <div className="relative">
      <div
        onClick={onClickPopUp}
        className={`cursor-pointer rounded-lg border border-[#a4a4a4] px-3 py-2 ${isOpen ? "rounded-b-none" : ""}`}
      >
        <b className="text-md flex justify-between">
          Size:
          <span className="flex items-center gap-1">
            {isValue}
            {isOpen ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </span>
        </b>
      </div>
      {isOpen && (
        <div className="absolute flex h-[315px] w-full flex-col overflow-hidden rounded-lg rounded-t-none border border-t-0 border-[#a4a4a4] bg-white px-4 pb-4 pt-1">
          <b className="py-1 text-sm font-semibold">Size and Conversions</b>
          <button className="w-[80px] rounded-xl border border-white bg-black py-2 text-sm font-semibold text-white">
            {sizeSystem}
          </button>

          <div
            className={`${sortedVariants.length > 9 && "custom-0-scroll h-[227px] overflow-y-scroll"}`}
          >
            <button
              onClick={onClickAllSizes}
              className="mt-3 flex w-full flex-col items-center justify-center gap-[1px] rounded-lg border-2 border-[#006340] bg-[#f4f3f1] py-1 text-sm font-semibold"
            >
              All
              <span className="font-bold text-[#006340]">€{mainPrice}</span>
            </button>
            <ul className={`mt-3 grid grid-cols-3 gap-3`}>
              {sellVisible ? (
                <>
                  {sellVariants.map((el, id: number) => (
                    <li className="max-h-[45px] text-center" key={id}>
                      <button
                        onClick={() => onClickSize(String(el))}
                        className="flex w-[136px] flex-col items-center justify-center gap-[1px] rounded-md border border-[#a4a4a4] py-[12px] text-sm"
                      >
                        {el}
                      </button>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {sortedVariants.map((obj: variants, id: number) => (
                    <li className="max-h-[45px]" key={id}>
                      <button
                        onClick={() => onClickSize(obj.size, obj.price)}
                        className="flex w-[136px] flex-col items-center justify-center gap-[1px] rounded-md border border-[#a4a4a4] py-[1px] text-sm"
                      >
                        {obj.size}
                        <span className="font-bold text-[#006340]">
                          €{obj.price}
                        </span>
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SizePopUp;
