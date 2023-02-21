import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./web/pages/homepage";
import Listings from "./web/pages/listings";
import Product from "./web/pages/product";
import AdminLogin from "./admin/pages/login";
import AgencyLogin from "./hotel/pages/login";
import NotFound from "./notFound";
import UserLogin from "./web/pages/login";
import UserProfile from "./web/pages/profile";
import AgencyRegister from "./hotel/pages/signUp";
import AgencyDashboard from "./hotel/pages/dashboard";
import loader from "./assets/images/loading.svg"

import { useDispatch } from "react-redux";
import { useAppSelector } from "./store/hook";
import { agencyLoggedIn, agencyLoggedOut } from "./store/slices/userSlice";
import { setAuth, removeAuth } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const isLoading = useAppSelector((state)=> state.loading.loading)
  useEffect(()=>{
    if(localStorage.getItem("agencyAuthToken")){
      dispatch(agencyLoggedIn());
      const authData: any = localStorage.getItem("agencyAuthToken")
      dispatch(setAuth(JSON.parse(authData)));
    } else {
      dispatch(agencyLoggedOut());
      dispatch(removeAuth());
    }
  },[])

  return (
    <>
    {isLoading && 
      <div className="loadingBox">
        <img src={loader} alt="" />
      </div>
    }
      <Routes>
          {/* website */}
          <Route index element={<Homepage />} />
          <Route path="listings" element={<Listings />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<UserLogin />} />
          <Route path="profile" element={<UserProfile />} />

          {/* admin */}
          <Route path="admin" element={<AdminLogin />} />

          {/* hotel */}
          <Route path="agency" element={<AgencyLogin />} />
          <Route path="register" element={<AgencyRegister />} />
          <Route path="dashboard" element={<AgencyDashboard />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
