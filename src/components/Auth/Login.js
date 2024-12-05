import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { Brand_logo } from "../../assets/image";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login({ email, password }));
    navigate("/topics");
  };

  return (

    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white shadow-sm rounded-[16px] pt-10 pb-12 px-[70px] max-w-[445px] w-full">
     <div className="text-center mb-8">
            <img
              src={Brand_logo}
              alt="Braen Stone Logo"
              className="mx-auto h-16"
            />
          </div>
          <h2 className="text-3xl font-normal text-login-grey text-center mb-6">
            Log in to your account
          </h2>
      <form onSubmit={handleLogin}>
      <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-login-grey">
                EMAIL <span className="text-error-red font-black">*</span>
              </label>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 rounded-lg bg-grey-light focus:ring-2 focus:ring-green-500 outline-none "/>
       
       </div>
       <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-login-grey ">
                  PASSWORD <span className="text-error-red font-black">*</span>
                </label>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 rounded-lg bg-grey-light focus:ring-2 focus:ring-green-500 outline-none"/>
        </div>
        <button
  type="submit"
  className="w-full bg-brand-green py-2 mt-3 rounded-lg hover:bg-brand-green-dark transition-colors text-login-grey"
>
  Login
</button>
 </form>
      <div className="text-center mt-6 text-[12px] text-gray-500 cursor-pointer">
            <hr className="pt-1 pb-2"></hr>
            Don't have an account? <a href="/register">Register</a>
          </div>
    </div>
    </div>
    <Footer />
    </>
   
  );
};

export default Login;
