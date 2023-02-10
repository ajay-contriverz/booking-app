import { Routes, Route } from "react-router-dom";
import Homepage from "./web/pages/homepage";
import Listings from "./web/pages/listings";
import Product from "./web/pages/product";
import AdminLogin from "./admin/pages/login";
import HotelLogin from "./hotel/pages/login";
import NotFound from "./notFound";
import UserLogin from "./web/pages/login";
function App() {
  return (
    <>
      <Routes>
          {/* website */}
          <Route index element={<Homepage />} />
          <Route path="listings" element={<Listings />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<UserLogin />} />

          {/* admin */}
          <Route path="admin" element={<AdminLogin />} />

          {/* hotel */}
          <Route path="hotel" element={<HotelLogin />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
    </>
  )
}

export default App
