import React, { useEffect, useState } from "react";
import { fomatMoney } from "../utils/helpers";
import lable from "../assets/images/new.png";
import lableBlue from "../assets/images/trending.png";
import { renderStartFromNumber } from "../utils/helpers";
import { SelectOption } from "./";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import path from "../utils/path";
import { apiGetCategory, apiGetCategoryById } from "../services/productService";
import { apiGetCategoryAction } from "../stores/actions/prodAction";
const { BsFillHeartFill, AiFillEye, BiMenu } = icons;
const Product = ({ productData, isNew, normal, category, selectCate }) => {
  const [isShowOption, setIsNewOption] = useState(false);

  return (
    <div className="w-full text-base px-[10px]">
      <Link
        to={`/${productData?.slug ? productData?.slug : category}/${
          productData?.id
        }/${productData?.name}`}
        className="w-full border p-[15px] flex fex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsNewOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsNewOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 animate-slide-top">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<BiMenu />} />
              <SelectOption icon={<BsFillHeartFill />} />
            </div>
          )}
          <img
            src={productData?.thumbnail || ""}
            alt=""
            className="w-[243px] h-[243px] object-cover "
          />
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full">
          <span className="line-clamp-1">{productData?.name}</span>

          <span>{`${fomatMoney(productData?.price)} VND`}</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
