import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import bgimg from '../assets/loginimage.jpg';
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";

const LoginPage= () => {
    const {login}=useAuthStore();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const navigate=useNavigate()
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit:async (values) => {
      try {
    
        const res=await axiosInstance.post('/user/login',values);
        if(res.data?.status==="success"){
          const {user,accessToken}=res?.data;
          localStorage.setItem('user',user.id)
          localStorage.setItem('name',user.name)
          localStorage.setItem('email',user.email)
          localStorage.setItem('token',accessToken)
          login();
          toast.success("Login Successfull");
          setTimeout(()=>{

            navigate('/')
          },1000)
        }
      return res.data

      } catch (error) {
         const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    'Incorrect username or password';

  toast.error(message);
      }

    },
  });
  


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgimg})`,
      }}
    >
      <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
           
            <Link to="/signup" className="text-blue-500 hover:underline font-bold">
              Dont have an account?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;