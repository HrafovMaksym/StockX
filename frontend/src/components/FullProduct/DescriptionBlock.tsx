import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface DescriptionBlockProps {
  description: string;
  gender: string;
  color: string;
  sku: string;
  date: string | null;
}
const DescriptionBlock: React.FC<DescriptionBlockProps> = ({
  description,
  gender,
  color,
  date,
  sku,
}) => {
  console.log(date);

  const desArr = [
    {
      title: "Gender: ",
      subTitle: gender.charAt(0).toUpperCase() + gender.slice(1),
    },
    {
      title: "Color: ",
      subTitle: color,
    },
    {
      title: "SKU: ",
      subTitle: sku,
    },
    date
      ? {
          title: "Release Date: ",
          subTitle: date,
        }
      : null,
  ].filter((item) => item !== null);

  const [fullText, setFullText] = useState(false);
  const onClickFullText = () => {
    setFullText(!fullText);
  };

  return (
    <div className="border-{#a4a4a4} mb-5 border-b">
      <h1 className="mb-4 text-xl font-bold">Product Details</h1>
      <ul className={`relative flex justify-between`}>
        <div className="w-[350px]">
          {desArr.map((obj, id) => (
            <li className="mb-2 flex items-center justify-between" key={id}>
              <span className="font-bold">{obj.title}</span>
              {obj.subTitle}
            </li>
          ))}
        </div>
        <div className="max-w-[700px]">
          <span className="text-base font-bold">Product Description:</span>
          <div
            className={`mt-1 transition-[max-height] duration-[400ms] ease-in-out ${fullText ? "max-h-[500px] text-black" : "max-h-[110px] overflow-hidden text-[#5f5f5f]"}`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {!fullText && (
            <div className="absolute inset-x-0 bottom-0 h-[150px] bg-gradient-to-t from-white to-transparent"></div>
          )}
        </div>
      </ul>
      <div className="mb-2 mt-5 flex w-full justify-center">
        <button
          onClick={onClickFullText}
          className="flex items-center gap-1 font-bold text-[#006340]"
        >
          {fullText ? "Show Less" : "Show More"}
          {fullText ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
    </div>
  );
};

export default DescriptionBlock;
