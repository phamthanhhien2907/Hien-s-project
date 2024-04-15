import React, { useEffect, useState } from "react";
import { useLocatiton } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  Banner,
  Sidebar,
  BestSeller,
  FeatureProduct,
  CustomSlider,
  DealDaily,
} from "../../components";
import icons from "../../utils/icons";
import {
  apiGetCategoryAction,
  apiGetProductAction,
} from "../../stores/actions/prodAction";
import { apiGetCategory } from "../../services/productService";
import { apiUpdateUser } from "../../services/userService";
const { MdKeyboardArrowRight } = icons;
const Home = (props) => {
  // console.log(props.location.state.value);
  const dispatch = useDispatch();
  const { newData } = useSelector((state) => state.product);
  const { data } = useSelector((state) => state.product);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const selectCate = [];
  newData?.map((el) => {
    data?.map((cate) => {
      if (el?.category_id === cate?.id) {
        el.slug = cate.slug;
        selectCate.push(cate?.slug);
        // console.log(cate?.slug);
      }
    });
  });
  const getInfo = JSON.parse(localStorage.getItem("info"));
  if (isLoggedIn && getInfo) {
    setTimeout(() => {
      apiUpdateUser({
        address: getInfo.address,
        first_name: getInfo.first_name,
        last_name: getInfo.last_name,
        email: getInfo.email,
        phone: getInfo.phone,
      });
    }, 200);
    localStorage.removeItem("info");
  }
  useEffect(() => {
    dispatch(apiGetProductAction()) && dispatch(apiGetCategoryAction());
  }, []);

  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <Sidebar data={data} product={newData} />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller newData={newData} />
        </div>
      </div>
      <div className="my-8">
        <FeatureProduct newData={newData} />
      </div>
      <div className="my-8 w-full ">
        <h3 className="text-[20px]  font-semibold py-[15px] border-b-2 border-main">
          NEW ARRIVALS
        </h3>
        <div className="mt-4 mx-[-10px]  ">
          <CustomSlider data={data} product={newData} />
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
        <div className="flex flex-wrap gap-4 mt-4 ">
          {data?.map((el) => (
            <div key={el.id} className="w-[396px] ">
              <div className="w-full border flex p-4 gap-4 min-h-[190px] [&>*:first-child]:w-[149px]">
                <img
                  src={el?.icon_url}
                  alt=""
                  className="h-[129px] object-contain "
                />
                <div className="flex-1 text-gray-700">
                  <h4 className="font-semibold uppercase">{el.name}</h4>
                  <ul className="text-sm">
                    {/* {el?.brand?.map((item) => (
                        <span key={item} className="flex items-center gap-2">
                          <MdKeyboardArrowRight size={14} />
                          <li>{item}</li>
                        </span>
                      ))} */}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="my-8 w-full">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          BLOG POSTS
        </h3>
      </div>
    </>
  );
};

export default Home;
