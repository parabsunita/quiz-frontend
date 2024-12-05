import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { Brand_logo } from "../../assets/image";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await dispatch(register(formData));
    if (success) navigate("/login");
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white shadow-sm rounded-[16px] pt-10 pb-12 px-[70px] max-w-[445px] w-full" >
    <div className="text-center mb-8">
            <img
              src={Brand_logo}
              alt="Braen Stone Logo"
              className="mx-auto h-16"
            />
          </div>
    <h2 className="text-3xl font-normal text-login-grey text-center mb-6">Register</h2>
      <form onSubmit={handleRegister}>
      <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-login-grey">
                NAME <span className="text-error-red font-black">*</span>
              </label>
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-4 py-2 rounded-lg bg-grey-light focus:ring-2 focus:ring-green-500 outline-none "/>
        
        </div>
        <div className="mb-4">
              <label className="block text-sm font-semibold mb-1 text-login-grey">
                EMAIL <span className="text-error-red font-black">*</span>
              </label>
        <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-4 py-2 rounded-lg bg-grey-light focus:ring-2 focus:ring-green-500 outline-none "/>
        
        </div>
        <div className="mb-4">
        <label className="block text-sm font-semibold mb-1 text-login-grey ">
                  PASSWORD <span className="text-error-red font-black">*</span>
                </label>
        <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required className="w-full px-4 py-2 rounded-lg bg-grey-light focus:ring-2 focus:ring-green-500 outline-none "/>
        </div>
        <button type="submit" className="w-full bg-brand-green py-2 mt-3 rounded-lg hover:bg-brand-green-dark transition-colors text-login-grey">Register</button>
      </form>
    </div>








    </div>
    <Footer />
    </>
  );
};

export default Register;
