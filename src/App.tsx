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

import { useDispatch } from "react-redux";
import { agencyLoggedIn, agencyLoggedOut } from "./store/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    if(localStorage.getItem("agencyAuthToken")){
      dispatch(agencyLoggedIn());
    } else {
      dispatch(agencyLoggedOut());
    }
  },[])

  return (
    <>
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
