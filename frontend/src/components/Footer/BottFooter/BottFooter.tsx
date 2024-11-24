import React from "react";
import {
  bottFooterArray,
  bottFooterSecondArray,
  bottFooterMidArray,
} from "../../../assets/Footer/Footer";
import { Link } from "react-router-dom";

const BottFooter = () => {
  return (
    <div className="bg-[#0f0f0f]">
      <div className="container px-[32px] py-[24px]">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-[402px] text-white">Slovakia|English|Usd</div>
          <div className="flex items-center gap-5">
            {bottFooterMidArray.map((obj, id) => (
              <Link className="fill-white text-white" to={obj.link} key={id}>
                {obj.img}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {bottFooterSecondArray.map((el, id) => (
              <span
                className="cursor-pointer text-xs text-white hover:underline"
                key={id}
              >
                {el}
              </span>
            ))}
          </div>
        </div>
        <div className="flex justify-center gap-3">
          {bottFooterArray.map((el, id) => (
            <span
              className="cursor-pointer text-xs text-white hover:underline"
              key={id}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottFooter;
