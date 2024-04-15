import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import icons from "../utils/icons";
import { Link, NavLink } from "react-router-dom";
import path from "../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../stores/actions/userAction";
import {
  apiGetOrderDetailByOidDetal,
  apiGetOrderProduct,
} from "../services/productService";
const Header = () => {
  const { BsFillTelephoneFill, BiLogoGmail, FaUserCircle, BsHandbagFill } =
    icons;
  const dispath = useDispatch();
  const [product, setProduct] = useState("");
  const [orders, setOrders] = useState("");
  const { currentData } = useSelector((state) => state.user);
  const { isLoggedIn, token, current } = useSelector((state) => state.auth);
  const [isHovering, setIsHovering] = useState(false);
  const [order, setOrder] = useState("");
  const apiGetOrderAll = async () => {
    const response = await apiGetOrderProduct();
    if (response.status === "Success") {
      response?.data?.map(async (el) => {
        if (el?.user_id === currentData?.id) {
          const getOrderAll = await apiGetOrderDetailByOidDetal(el?.id);
          if (getOrderAll?.status === "Success") {
            setOrder(getOrderAll?.data);
          }
        }
      });
    }
  };
  useEffect(() => {
    isLoggedIn && apiGetOrderAll();
  }, []);
  return (
    <div className=" w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[12px]  ">
        <div className="flex flex-col items-center px-4">
          <span className="flex gap-4 items-center">
            <BsFillTelephoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>

        <div className="flex flex-col items-centerp px-4 border-l-[1px]">
          <span className="flex gap-4 items-center">
            <BiLogoGmail color="red" />
            <span className="font-semibold"> SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <NavLink to={`/${path.CART}`}>
          <div className="cursor-pointer flex items-center justify-center gap-2 px-4 border-l-[1px]">
            <BsHandbagFill color="red" size={20} />
            <span>{isLoggedIn && order ? order?.length : 0} item(s)</span>
          </div>
        </NavLink>
        <div className="cursor-pointer flex items-center justify-center px-4 pb-4 border-l-[1px] gap-2">
          <FaUserCircle color="red" size={24} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
