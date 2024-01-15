import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/user/Home.jsx";
import Pay from "./pages/user/Pay.jsx";
import Tnx from "./pages/user/Tnx.jsx";
import GetUrCar from "./pages/user/GetUrCar.jsx"
import About from "./pages/user/About.jsx";
import Contact from "./pages/user/Contact.jsx";

import NoPage from "./pages/404.jsx";
import Register from "./pages/register.jsx"

import Admin from "./pages/admin/Home.jsx"
import SignIn from "./pages/signIn.jsx"
import History from "./pages/admin/History.jsx"
import Chart from "./pages/admin/Charts.jsx"
import About_admin from "./pages/admin/About.jsx";
import Contact_admin from "./pages/admin/Contact.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/user" element={<Home />} />
          <Route path="/user/pay" element={<Pay />} />
          <Route path="/user/tnx" element={<Tnx />} />
          <Route path="/user/getUrCar" element={<GetUrCar />} />
          <Route path="/user/contact" element={<Contact />} />
          <Route path="/user/about" element={<About />} />

          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/history" element={<History />} />
          <Route path="/admin/charts" element={<Chart />} />
          <Route path="/admin/contact" element={<Contact_admin/>} />
          <Route path="/admin/about" element={<About_admin />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

