import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button } from "../../components";
import logo from "../../assets/images/logo.png";
// import {
//   apiRegister,
//   apiLogin,
//   apiForgotPassword,
//   apiFinalRegister,
// } from "../../apis/";
import icons from "../../utils/icons";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import path from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "../../utils/helpers";
import { toast } from "react-toastify";
import Home from "./Home";
import { loginSuccessAction } from "../../stores/actions/authAction";
import { apiLoginSuccess, apiRegister } from "../../services/authService";
import { BsCheckLg } from "react-icons/bs";
import { apiUpdateUser } from "../../services/userService";
const { BiArrowBack } = icons;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [payload, setPayload] = useState({
  //   email: "",
  //   password: "",
  // });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [valuePayload, setValuePayload] = useState("");
  const [payload, setPayload] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
  });
  const { email, password, first_name, last_name, phone, address, username } =
    payload;

  const [isRegister, setIsRegister] = useState(false);
  const onChange = (e) =>
    setPayload({ ...payload, [e.target.name]: e.target.value });
  const { isLoggedIn, typeLogin } = useSelector((state) => state.auth);

  // }, [isLoggedIn]);
  useEffect(() => {
    setTimeout(() => {
      if (isLoggedIn && typeLogin === "Success") {
        setPayload({});
        navigate("/");
      }
    }, 200);
  }, [isLoggedIn, typeLogin]);
  const onSubmit = async () => {
    // const response = await apiLoginSuccess(payload);
    // console.log(response);
    try {
      dispatch(loginSuccessAction(payload));
      if (!isLoggedIn) {
        console.log("Sai mat khau");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const apiUpdateUser = () => {
  //   const updateUsers = apiUpdateUser({
  //     address,
  //     email,
  //     first_name,
  //     last_name,
  //     phone,
  //   });

  //   console.log(updateUsers);
  //   // setPayload({
  //   //   username: "",
  //   //   password: "",
  //   //   address: "",
  //   //   email: "",
  //   //   first_name: "",
  //   //   last_name: "",
  //   //   phone: "",
  //   // });
  // };
  // useEffect(() => {
  //   if (isRegister) {
  //     apiUpdateUser();
  //   }
  // }, [isRegister]);

  const onRegister = async () => {
    const response = await apiRegister(payload);
    if (response.status === 201 || response?.status === 200) {
      localStorage.setItem(
        "info",
        JSON.stringify({ address, first_name, last_name, phone, email })
      );
      setPayload({
        username: "",
        password: "",
        address: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
      });

      setTimeout(() => {
        setIsRegister(false);
      }, 200);
      // navigate({ pathname: `/${path.LOGIN}` });
    }
  };
  console.log(payload);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [isForgotPassword, setIsForgotPassword] = useState(false);
  // const [invalidFields, setInvalidFields] = useState([]);
  // const resetPayload = () => {
  //   setPayload({
  //     email: "",
  //     password: "",
  //     firstname: "",
  //     lastname: "",
  //     mobile: "",
  //   });
  // };
  // const [email, setEmail] = useState("");
  // const [token, setToken] = useState("");
  // const handleForgotPassword = async () => {
  //   const response = await apiForgotPassword({ email });
  //   if (response.success) {
  //     toast.success(response.mess, { theme: "colored" });
  //   } else {
  //     toast.info(response.mess, { theme: "colored", hideProgressBar: true });
  //   }
  // };
  // useEffect(() => {
  //   resetPayload();
  // }, [isRegister]);

  // const handleSubmit = useCallback(async () => {
  //   const { firstname, lastname, mobile, ...data } = payload;
  //   const invalids = isRegister
  //     ? validate(payload, setInvalidFields)
  //     : validate(data, setInvalidFields);
  //   console.log(invalids);
  //   if (invalids === 0) {
  //     if (isRegister) {
  //       const response = await apiRegister(payload);
  //       if (response.success) {
  //         setIsVerifiedEmail(true);
  //         // Swal.fire("Congratulations!", response.mes, "success").then(() => {
  //         //   setIsRegister(false);
  //         //   resetPayload();
  //         // });
  //       } else {
  //         Swal.fire(" Oops!", response.mess, "error");
  //       }
  //       console.log(response);
  //     } else {
  //       const rs = await apiLogin(data);
  //       if (rs.success) {
  //         dispatch(
  //           login({
  //             isLoggedIn: true,
  //             token: rs.accessToken,
  //             userData: rs.userData,
  //           })
  //         );
  //         navigate(`/${path.HOME}`);
  //       } else {
  //         Swal.fire(" Oops!", rs.mess, "error");
  //       }
  //     }
  //   }
  // }, [payload, isRegister]);
  // const finalRegister = async () => {
  //   const response = await apiFinalRegister(token);
  //   if (response.success) {
  //     Swal.fire("Congratulations!", response.mes, "success").then(() => {
  //       setIsRegister(false);
  //       resetPayload();
  //     });
  //   } else {
  //     Swal.fire(" Oops!", response.mes, "error");
  //   }
  //   setIsVerifiedEmail(false);
  //   setToken("");

  return (
    <div className="w-screen h-screen relative">
      {/* {isVerifiedEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-95 z-50 flex flex-col  justify-center items-center">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4>
              We sent a code to your email. Please, Check your email and enter
              your code:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border rounded-md outline-none mt-2 mr-2"
              placeholder="Enter your code...."
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 font-semibold text-white rounded-md"
              onClick={finalRegister}
            >
              Submit
            </button>
          </div>
        </div>
      )} */}
      {/* {isForgotPassword && (
        <div className="absolute animate-slide-right top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center py-8 z-50 ">
          <div className="text-[35px] font-semibold">
            <h3>FORGOT YOUR PASSWORD</h3>
          </div>
          <div className="flex flex-col gap-4 mt-28 ">
            <label htmlFor="email">Enter your email</label>
            <input
              type="text"
              id="email"
              placeholder="Ex: abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[800px] pb-2  border-b outline-none placeholder:text-sm"
            />
            <div className="flex items-center justify-end mt-4 w-full gap-4">
              <Button name="Submit" handleOnclick={handleForgotPassword} />
              <Button
                name="Back to Login"
                handleOnclick={() => setIsForgotPassword(false)}
              />
            </div>
          </div>
        </div>
      )} */}
      <img
        src="https://il2.picdn.net/shutterstock/videos/3235987/thumb/12.jpg"
        alt="shopping_cart"
        className="w-full h-full object-cover "
      />
      <div className="absolute top-0 left-0 bottom-0 right-0 opacity-90 flex items-center justify-center ">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col">
          <div className="flex justify-between">
            <Link to={`/${path.HOME}`}>
              <span className="flex items-center mt-[14px] font-bold text-main">
                {/* <img src={logo} alt="logo" className="w-[129px] h-[21px] mt-4" /> */}
                <BiArrowBack className="mr-2" />
                Go Home?
              </span>
            </Link>

            <h1 className="text-[32px] text-main font-bold mb-8 ">
              {isRegister ? "REGISTER" : "LOGIN"}
            </h1>
            <h4 className="mt-[14px] text-main text-sm">
              <Link to={`/${path.FAQ}`}>Need you help?</Link>
            </h4>
          </div>
          {isRegister && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="First Name"
                name="first_name"
                value={first_name}
                onChange={(e) => onChange(e)}
                required
                className={
                  "px-4 py-2 rounded-md border w-[50%]  placeholder:text-sm  outline-none"
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                name="last_name"
                value={last_name}
                onChange={(e) => onChange(e)}
                required
                className={
                  "px-4 py-2 rounded-md border w-[50%]  ml-4 placeholder:text-sm  outline-none"
                }
              />
            </div>
          )}
          {isRegister && (
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={(e) => onChange(e)}
              required
              className={
                "px-4 py-2 rounded-md border  placeholder:text-sm  outline-none"
              }
            />
          )}
          {isRegister && (
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
              required
              className={
                "px-4 py-2 rounded-md border  placeholder:text-sm  outline-none"
              }
            />
          )}
          {isRegister && (
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => onChange(e)}
              required
              className={
                "px-4 py-2 rounded-md border  placeholder:text-sm  outline-none"
              }
            />
          )}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
            required
            className={
              "px-4 py-2 rounded-md border  placeholder:text-sm  outline-none"
            }
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
            className={
              "px-4 py-2 rounded-md border  placeholder:text-sm  outline-none"
            }
          />
          <Button
            fw="w-full"
            name={isRegister ? "SIGN UP" : "SIGN IN"}
            // handleOnclick={() => onSubmit(isRegister ? "SIGN UP" : "SIGN IN")}
            handleOnclick={isRegister ? onRegister : onSubmit}
          />
          <div className="flex items-start justify-between my-2 w-full text-sm cursor-pointer">
            {/* {!isRegister && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:underline"
              >
                Forgot your account?
              </span>
            )} */}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline"
                onClick={() => {
                  setIsRegister(true);
                }}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline w-full text-center mt-4"
                onClick={() => {
                  setIsRegister(false);
                }}
              >
                BACK TO SIGN IN
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
