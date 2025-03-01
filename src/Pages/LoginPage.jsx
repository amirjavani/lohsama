/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./LoginPage.scss";
import logo from "../assets/Sama-App-Logo.webp";
import authPagePic from "../assets/authenticate_image.webp";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState("LOGIN");

  const login = async () => {
    const formData = { username: name, password: pass };

    const fetchLogin = fetch("http://localhost:5000/api/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (res) => {
      if (!res.ok) {
        let errorMessage = "مشکلی پیش آمده است";

        if (res.status === 404) errorMessage = "موردی یافت نشد!";
        else if (res.status === 401) errorMessage = "رمز عبور اشتباه است!";
        else if (res.status === 500)
          errorMessage = "خطای سرور! لطفا بعدا تلاش کنید.";

        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
      return res.json();
    });

    toast.promise(fetchLogin, {
      pending: "در حال ورود...",
    });

    try {
      const data = await fetchLogin;
      console.log("Login Successful:", data);
      toast.success("ورود موفقیت‌آمیز بود! 🎉");
      localStorage.setItem('token',data.token)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page flex flex-row h-screen bg-yellow-500 md:bg-white">
      <div className="w-full md:w-1/2    px-10 xl:px-32 my-auto">
        <div className=" gap-1 border flex flex-col py-5 px-10 md:p-8 lg:px-15 lg:py-4 rounded-3xl border-orange-400 bg-white">
          <img className="w-[100px] mx-auto mb-4" src={logo} />
          <div className="bg-gray-200 flex flex-row rounded-2xl">
            <p
              onClick={() => setShow("LOGIN")}
              className={`text-[18px] cursor-pointer w-1/2 text-center m-1 p-2 rounded-2xl ${
                show === "REGISTER" ? "" : "show"
              }`}>
              ورود
            </p>
            <p
              onClick={() => setShow("REGISTER")}
              className={`text-[18px] cursor-pointer w-1/2 text-center m-1 p-2 rounded-2xl ${
                show === "REGISTER" ? "show" : ""
              }`}>
              ثبت نام
            </p>
          </div>
          {show === "LOGIN" ? (
            <div className="form-container gap-3 flex flex-col">
              <p className="text-[14px]">
                لطفا برای ادامه یا ورود، شماره همراه و رمز عبور خود را وارد کنید
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="شماره همراه"
              />
              <input
                onChange={(e) => setPass(e.target.value)}
                placeholder="کلمه عبور"
              />
              <button onClick={login}>ورود</button>
              <p
                onClick={() => setShow("FORGOTPASSWORD")}
                className="forgotpass cursor-pointer text-center mb-2">
                رمزم را فراموش کردم
              </p>
            </div>
          ) : show === "REGISTER" ? (
            <div className="form-container gap-3 flex flex-col">
              <p className="text-[12px] my-2 font-bold">
                لطفا برای ثبت نام اطلاعات زیر را وارد کنید و منتظر ارسال کد
                تایید بمانید.
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="نام"
              />
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="نام خانوادگی"
              />
              <input
                onChange={(e) => setPass(e.target.value)}
                placeholder="شماره همراه"
              />
              <input
                onChange={(e) => setPass(e.target.value)}
                placeholder="کلمه عبور"
              />
              <button onClick={login}>ثبت نام</button>
            </div>
          ) : (
            <div className="form-container gap-3 flex flex-col">
              <p className="text-[12px] my-2 font-bold">
                لطفا برای ثبت نام اطلاعات زیر را وارد کنید و منتظر ارسال کد
                تایید بمانید.
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                placeholder="شماره همراه"
              />
              <button onClick={login}>درخواست تغییر رمز</button>
            </div>
          )}
        </div>
      </div>
      <div className="w-1/2 hidden  bg-yellow-500 md:flex flex-col justify-between">
        <div className="flex flex-col p-4 justify-between mt-20">
          <p className="hidden md:text-2xl md:block font-bold text-center">
            تو لوح سما همه بچه‌ها می‌تونن درس‌های خوبی یاد بگیرن
          </p>
          <p className="text-center mt-10 text-[1.1rem]">
            همین حالا عضوی از لوح سما شو و بهترین آموزش‌ها رو تجربه کن
          </p>
        </div>
        <img className="" src={authPagePic} />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={true}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
