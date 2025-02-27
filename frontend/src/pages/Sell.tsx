import React, { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FullProductProps } from "../@types/userCardTypes";
import axios from "axios";

import ProductPreview from "../components/Cart/ProductPreview";
import HeaderCart from "../components/Cart/HeaderCart";
import Loader from "../components/Cart/Loader";

import TotalPrice from "../components/Cart/TotalPrice";

import { useAppDispatch } from "../redux/hook";
import { setCartPrice } from "../redux/slices/cartSlice";
import ShipForm from "../components/Cart/ShipForm";
import ApprovePurchase from "../components/Cart/ApprovePurchase";
import EditSize from "../components/Cart/EditSize";
import SizeBlock from "../components/Sell/SizeBlock";

const Sell: React.FC = () => {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<FullProductProps | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [shipping, setShipping] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFullProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        document.body.style.overflow = "hidden";
        const apiUrl = `https://api.sneakersapi.dev/api/v2/products?search=${title}`;
        const { data } = await axios.get(apiUrl, {
          headers: { Authorization: import.meta.env.VITE_API_KEY },
        });
        setProduct(data.data[0]);
        dispatch(setCartPrice(Math.round(Number(data.data[0].avg_price))));
        console.log(data.data[0]);
      } catch (error) {
        console.error(error);
        setError("Info failed try again");
      } finally {
        document.body.style.overflow = "auto";
        setIsLoading(false);
      }
    };

    fetchFullProduct();
  }, []);

  useEffect(() => {
    if (error) {
      navigate("/not-found", { replace: true });
    }
  }, [error, navigate]);
  const sizeQuery = searchParams.get("size");
  const isPlace = searchParams.get("isPlace");
  const isConfirm = searchParams.get("isConfirm");

  return (
    <div>
      <HeaderCart />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex h-full min-h-[87vh] justify-between">
          <ProductPreview
            isConfirm={isConfirm}
            image={product?.image}
            title={product?.title}
          />

          <div className="flex h-full min-h-[87vh] min-w-[600px] flex-col bg-[#f4f3f1] pt-8">
            {isConfirm ? (
              <ApprovePurchase
                title={product?.title}
                size={sizeQuery}
                img={product?.image}
                brand={product?.brand}
                sku={product?.sku}
                variant={undefined}
              />
            ) : (
              <>
                {shipping ? (
                  <div className="px-7">
                    <ShipForm setShipping={() => setShipping(false)} />
                  </div>
                ) : (
                  <>
                    <div className="flex-1 px-7">
                      {sizeQuery ? (
                        <div className="flex h-[450px] flex-col gap-5">
                          <h1 className="mb-3 text-center text-lg font-bold">
                            {isPlace ? "Make An Offer" : "Sell Now"}
                          </h1>
                          <EditSize gender={product?.gender} sizeOrder={"Us"} />
                        </div>
                      ) : (
                        <>
                          <h1 className="mb-2 text-2xl font-bold">
                            Select Size
                          </h1>
                          <SizeBlock variants={product?.variants} />
                        </>
                      )}
                    </div>
                    {sizeQuery ? (
                      <TotalPrice setShipping={() => setShipping(true)} />
                    ) : (
                      <div className="border-l border-t border-l-[#cfcfcf] border-t-[#cfcfcf] bg-white px-7 py-5">
                        <button className="rounded-2xl border border-black px-5 py-2 font-bold text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white">
                          <Link
                            className="flex items-center gap-3"
                            to={`/${title}`}
                          >
                            Cancel
                          </Link>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sell;
