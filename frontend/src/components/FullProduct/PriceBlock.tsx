import React, { useMemo } from "react";
import { getRandomEvery30Seconds } from "../../utils/updateSoldItems";
import model from "../../assets/images/soldModel.gif";
interface PriceBlockProps {
  price: number;
  lastSale: number;
}
const PriceBlock: React.FC<PriceBlockProps> = ({ price, lastSale }) => {
  const totalPrice = Math.round(price);
  const lastSalePrice = Math.round(lastSale);
  const generateUniqueNumber = (productId: any, currentSeed: number) => {
    const randomSeed = Math.floor(totalPrice * currentSeed);

    return Math.abs(randomSeed % 1001); // Возвращаем значение от 0 до 1000
  };

  const RandomNumberComponent = ({ productId }: any) => {
    const currentSeed = useMemo(() => {
      const THREE_DAYS_IN_MS = 3 * 10000;

      return Math.floor(Date.now() / THREE_DAYS_IN_MS);
    }, []);
    console.log("CURENT", currentSeed);
    const randomNumber = useMemo(
      () => generateUniqueNumber(productId, currentSeed),
      [productId, currentSeed],
    );
    console.log(randomNumber);

    return randomNumber;
  };

  return (
    <div className="rounded-xl border border-[#a4a4a4] p-4">
      <div className="flex items-center justify-between">
        <div className="w-[98px]">
          <p className="text-md font-medium">
            Buy Now For{" "}
            <span className="text-2xl font-bold">€{totalPrice}</span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <img className="w-10" src={model} alt="sold model" />
          <p className="font-semibold">
            <span>{RandomNumberComponent(totalPrice)}</span> Sold in Last 3
            Days!
          </p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <button className="w-[212px] rounded-full border border-black px-8 py-[10px] font-bold transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
          Place Bid
        </button>
        <button className="w-[212px] rounded-full border bg-[#006340] px-8 py-[10px] font-bold text-white transition-all duration-300 ease-in-out hover:opacity-80">
          Buy Now
        </button>
      </div>
      <div className="mt-5 flex items-center justify-between border-t pb-1 pt-3">
        <span className="font-semibold">Last Sale: €{lastSalePrice}</span>
        <span className="cursor-pointer border-b-2 border-[#006340] font-bold text-[#006340]">
          View Market Data
        </span>
      </div>
    </div>
  );
};

export default PriceBlock;
