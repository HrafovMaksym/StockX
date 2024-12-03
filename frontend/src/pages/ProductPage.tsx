import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs/BreadCrumbs";
import { useParams } from "react-router-dom";
import axios from "axios";
import { userCardProps } from "../@types/userCardTypes";
import { Rocket } from "lucide-react";
import PriceBlock from "../components/FullProduct/PriceBlock";
import SizePopUp from "../components/FullProduct/SizePopUp";

const FullProduct = () => {
  const { title } = useParams();
  const [product, setProduct] = useState<userCardProps | null>(null);
  const originalTitle = localStorage.getItem("title");
  console.log("local storage:", originalTitle);
  useEffect(() => {
    async function fetchFullProduct() {
      console.log(title);

      const res = await axios.get(
        `https://api.sneakersapi.dev/search?query=${originalTitle}`,
      );
      const data = res.data.hits.find(
        (el: userCardProps) => el.title === originalTitle,
      );

      setProduct(data);
      console.log(data);
    }
    fetchFullProduct();
    return () => {
      localStorage.removeItem("title");
    };
  }, []);
  return (
    <div className="w-[1120px]">
      {product && (
        <>
          <BreadCrumbs
            label={product.labels}
            brand={product.brand}
            title={product.title}
            slug={product.slug}
          />
          <div className="flex gap-2">
            <div className="w-[636px]">
              <h1 className="text-3xl font-bold">{product.brand}</h1>
              <h3 className="text-sm opacity-70">{product.title}</h3>
              <div className="flex justify-center">
                <img
                  className="mt-2 h-[404px] w-[546px]"
                  src={product.image}
                  alt={product.title}
                />
              </div>
            </div>
            <div className="flex w-[480px] flex-col gap-2">
              <div className="flex items-center gap-2">
                <Rocket size={16} />
                <p className="text-sm">
                  <span className="font-bold">Xpress Ship </span>
                  3-day shipping available in select sizes
                </p>
              </div>
              <SizePopUp />
              <PriceBlock
                price={product.base_price}
                max_price={product.max_price}
                min_price={product.min_price}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FullProduct;
