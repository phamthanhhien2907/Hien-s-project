import React, { useCallback, useEffect, useState } from "react";
import {
  Breadcrumbs,
  Button,
  SelectQuantity,
  ExtraProduct,
  ProductInformation,
  CustomSlider,
  FeatureProduct,
} from "../../components";
import { productExtrainformation } from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import {
  formatPrice,
  fomatMoney,
  renderStartFromNumber,
} from "../../utils/helpers";
import ReactImageMagnify from "react-image-magnify";
import {
  apiCreateOrderDetailByPidAndOid,
  apiGetCategory,
  apiGetOrderDetailByOidDetal,
  apiGetOrderProduct,
  apiGetProduct,
  apiGetProductById,
  apiOrdersProduct,
  apiUpdateOrderDetailByPidAndOid,
} from "../../services/productService";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../../stores/actions/userAction";
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProducts = () => {
  const { pid, title, category } = useParams();
  const [product, setProduct] = useState(null);
  const [category_id, setCategory_id] = useState(null);
  const [productCate, setProductCate] = useState(null);
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orders, setOrders] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { currentData } = useSelector((state) => state.user);
  const getProductById = async (id) => {
    const response = await apiGetProductById(id);
    if (response.status === "Success") setProduct(response.data);
  };

  const getCategoryById = async (id) => {
    const response = await apiGetCategory();
    if (response.status === "Success") {
      response?.data?.map((el) => {
        if (el?.slug === category) {
          setCategory_id(el);
        }
      });
    }
  };

  // const fetchApiProduct = async () => {
  //   const response = await apiGetProduct({
  //     // page: Math.floor(Math.random(10) * 10) + 1,
  //     // page: Math.floor(Math.random(10) * 10) + 1,
  //     limit: 8,
  //     sort: "-prices",
  //     type: category,
  //   });
  //   if (response?.success) {
  //     setProductCate(response?.products);
  //   }
  // };

  // const convertCategory = () => {
  //   let categoryConvert;
  //   categories.map((el) => {
  //     if (createSlug(el.categoryName) === category) {
  //       categoryConvert = el.categoryName;
  //     }
  //   });

  //   return categoryConvert;
  // };
  // const categoryName = convertCategory();
  // const { currentData } = useSelector((state) => state.user);
  const apiGetOrder = async () => {
    const response = await apiGetOrderProduct();
    if (response?.status === "Success") {
      const findEl = response.data.filter(
        (el) => el.user_id === currentData?.id
      );
      setAccount(findEl[0]);
      if (findEl.length === 0) {
        await apiOrdersProduct({
          receiver_name: "",
          receiver_phone: "",
          receiver_address: "",
          description: "",
          is_ordered: true,
          is_paid: false,
          user_id: currentData?.id,
        });
      }

      // response.data?.map((el) => {
      //   console.log(el.includes(currentData?.  id));
      // });

      // const response = apiOrdersProduct({
      //   receiver_name: "",
      //   receiver_phone: "",
      //   receiver_address: "",
      //   description: "",
      //   is_ordered: true,
      //   is_paid: false,
      //   user_id: currentData?.id,
      // });
      // console.log(response);
    }
  };

  useEffect(() => {
    setLoading(true);
    apiGetOrder() && dispatch(getCurrent());
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const handleClickOptions = async (flag) => {
    if (flag === "CART") {
      if (currentData) {
        const getIdByOrder = await apiGetOrderDetailByOidDetal(account?.id);
        const selectEl = getIdByOrder?.data?.filter(
          (el) => el.product_id === product?.id
        );

        if (selectEl.length > 0) {
          selectEl?.map(async (el) => {
            const currentQuantity = JSON.parse(
              localStorage.getItem(el?.product_id)
            );
            if (el?.product_id === product?.id) {
              if (currentQuantity) {
                const updatedQuantity = Number(currentQuantity) + quantity;
                const response = await apiUpdateOrderDetailByPidAndOid(
                  account?.id,
                  el?.id,
                  {
                    amount: updatedQuantity,
                    price: product?.price,
                    discount: "10",
                    order_id: account?.id,
                    product_id: product?.id,
                  }
                );
                console.log(response);

                localStorage.setItem(
                  el?.product_id,
                  JSON.stringify(updatedQuantity)
                );
              }
              // const response = await apiUpdateOrderDetailByPidAndOid(account?.id, product?.id, {
              //   amount : quantity
              // })
            }
          });
        } else {
          const updatedQuantity = quantity;
          const response = await apiCreateOrderDetailByPidAndOid(account?.id, {
            amount: updatedQuantity,
            price: product?.price,
            discount: "10",
            order_id: account?.id,
            product_id: product?.id,
          });
          console.log(response);
          if (response?.status === "Success") {
            localStorage.setItem(
              response?.data?.product_id,
              JSON.stringify(updatedQuantity)
            );
          }
        }

        // const response = await apiGetOrderProduct();
        // if (response) {
        //   response?.data?.map(async (el) => {
        //     if (el?.user_id === currentData?.id) {
        //       console.log(el);
        //     } else {
        //       await apiOrdersProduct({
        //         receiver_name: currentData?.first_name + currentData?.last_name,
        //         receiver_phone: currentData?.phone,
        //         receiver_address: currentData?.address,
        //         description: "",
        //         user_id: currentData?.id,
        //       });
        //     }
        //   });
        // }
        // console.log(response);
      }
      // const response = await apiOrdersProduct({
      //   receiver_name: currentData?.first_name,
      //   receiver_phone: currentData?.phone,
      //   receiver_address: currentData?.address,
      //   description: "",
      //   user_id: currentData?.id,
      // });

      // if (response.status === "Success") {
      //   dispatch(getProductByPidAndOid(response?.data?.id, product?.id));
      // }
      // dispatch(getProductByPidAndOid())
      //   // if (!currentData) throw new Error("Please login first");
      //   const response = await apiUpdateCart({
      //     pid: product?._id,
      //     quantity,
      //     color: product?.color[0] ? product?.color[0] : "Không có",
      //     type: "increase",
      //   });
      //   if (response?.success) {
      //     dispatch(getCurrent());
      //     const currentQuantity = JSON.parse(localStorage.getItem(product?._id));
      //     if (currentQuantity) {
      //       const updatedQuantity = Number(currentQuantity) + quantity;
      //       localStorage.setItem(product?._id, JSON.stringify(updatedQuantity));
      //     } else {
      //       const updatedQuantity = quantity;
      //       localStorage.setItem(product?._id, JSON.stringify(updatedQuantity));
      //     }
      //   }
    }
  };
  // useEffect(() => {
  //   apiGetOrder();
  // }, []);
  useEffect(() => {
    setLoading(true);
    getProductById(pid) && getCategoryById();

    setTimeout(() => {
      setLoading(false);
    }, 1000);
    window.scrollTo(0, 0);
  }, [category, pid]);
  // const handleQuantity = (type) => {
  //   if (type === "increase") {
  //     setQuantity(quantity + 1);
  //   } else {
  //     if (quantity === 1) {
  //       return;
  //     } else {
  //       setQuantity(quantity - 1);
  //     }
  //   }
  // };
  const handleQuantity = (type) => {
    if (type === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  };
  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100 ">
        <div className="w-main flex flex-col">
          <h3 className="font-semibold text-[18px]"> {title}</h3>
          <Breadcrumbs title={title} category={category} />
        </div>
      </div>
      <div className="w-main m-auto mt-4 flex">
        <div className="w-2/5 flex flex-col gap-4">
          <div className="h-[458px] w-[458px] border ">
            {/* <img src={product?.thumbnail} alt="" /> */}
            <ReactImageMagnify
              {...{
                smallImage: {
                  alt: "",
                  isFluidWidth: true,
                  src: product?.thumbnail,
                },
                largeImage: {
                  src: product?.thumbnail,
                  width: 800,
                  height: 800,
                },
                isHintEnabled: true,
              }}
            />
          </div>

          {/* <div className="w-[458px] ">
            <Slider className="image-slider" {...settings}>
              {product?.imagescat?.map((el, index) => (
                <div className="flex w-full gap-2 " key={index}>
                  <img
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickImage(e, el);
                    }}
                    src={el}
                    alt="sub-product"
                    className=" h-[143px] w-[143px] object-cover border cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div> */}
        </div>
        <div className="w-2/5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[30px] font-semibold">
              {fomatMoney(formatPrice(product?.price))} VNĐ
            </h2>
            <span className="text-sm text-main pr-2">
              Sản phẩm còn lại: {product?.amount}
            </span>
          </div>
          {/* <div className="flex items-center  ">
            {renderStartFromNumber(product?.totalRatings)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
            <span className="text-sm text-main italic">
              {`Đã bán : ${product?.sold} cái`}
            </span>
          </div> */}
          <ul className="text-sm text-gray-500 list-square pl-4">
            {/* {product?.description?.map((el, index) => (
              <li className="leading-8 list-square" key={index}>
                 Technology: GSM / HSPA / LTE Dimensions: 144.6 x 69.2 x 7.3 mm
            Weight: 129 g Display: IPS LCD 5.15 inches Resolution: 1080 x 1920
            OS: Android OS, v6.0 (Marshmallow) Chipset: Snapdragon 820 CPU:
            Quad-core In...
              </li>
            ))} */}
            <li className="leading-8 list-square">
              Technology: GSM / HSPA / LTE Dimensions: 144.6 x 69.2 x 7.3 mm
              Weight: 129 g Display: IPS LCD 5.15 inches Resolution: 1080 x 1920
              OS: Android OS, v6.0 (Marshmallow) Chipset: Snapdragon 820 CPU:
              Quad-core In...
            </li>
          </ul>
          <div className="flex flex-col gap-6">
            <SelectQuantity
              quantity={quantity}
              handleQuantity={handleQuantity}
            />
            <Button
              handleOnclick={() => handleClickOptions("CART")}
              fw
              name="Add to Cart"
            ></Button>
          </div>
        </div>
        <div className="w-1/5">
          {productExtrainformation?.map((el) => (
            <ExtraProduct
              key={el.id}
              title={el.title}
              sub={el.sub}
              icons={el.icons}
            />
          ))}
        </div>
      </div>

      {/* <div className="w-main m-auto mt-8">
        <ProductInformation
          // totalRatings={product?.totalRatings}
          // ratings={product?.rating}
          nameProduct={product?.name}
          pid={product?.id}
          rerender={rerender}
        />
      </div> */}
      <div className="w-main m-auto my-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER CUSTOMERS ALSO BUY:
        </h3>
        {/* <CustomSlider normal product={relativedProducts} /> */}
      </div>
    </div>
  );
};

export default DetailProducts;
