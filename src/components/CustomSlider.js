import React, { memo, useEffect, useState } from "react";
import Slider from "react-slick";
import { Product } from "./";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const CustomSlider = ({ product, activedTab, normal, data }) => {
  // console.log(activedTab);
  // console.log(normal);
  const [category, setCategory] = useState([]);
  // console.log(product);

  return (
    <>
      {product && (
        <Slider className="custom-slider" {...settings}>
          {product?.map((el) => (
            <Product
              key={el.id}
              // pid={el.id}
              productData={el}
              isNew={activedTab === 1 ? true : false}
              normal={normal}
              category={data}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

export default memo(CustomSlider);
