import React, { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";
import { useDispatch, useSelector } from "react-redux";
import icons from "../utils/icons";
import { getCurrent } from "../stores/actions/userAction";
import { logout } from "../stores/actions/authAction";

const { BiLogOutCircle } = icons;
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { currentData } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 500);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn ? (
          <div className="flex gap-4 text-sm items-center">
            {/* ${currentData.lastname} $ {currentData.firstname} */}
            <span>{`Welcome, ${currentData?.first_name} ${currentData?.last_name}   `}</span>
            <span>
              <BiLogOutCircle
                onClick={() => dispatch(logout())}
                size={24}
                className="hover:rounded-full hover:bg-gray-200 cursor-pointer"
              />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-700" to={`/${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
