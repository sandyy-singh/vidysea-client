
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AuthContext.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import DashboardLayout from "./pages/CustomerLayout.jsx";
import NoteCRUD from "./pages/NoteCRUD.jsx";


import Home from "./components/Home.jsx";
import ContactUs from "./components/ContactUs.jsx";
import About from "./components/About.jsx";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/dashboard/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate to="NoteCRUD" replace />} />
              <Route path="NoteCRUD" element={<NoteCRUD />} />
              <Route path="Home" element={<Home />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="About" element={<About />} />

            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
            <Route path="/dashboard/user" element={<DashboardLayout />}>
              <Route index element={<Navigate to="NoteCRUD" replace />} />
              <Route path="NoteCRUD" element={<NoteCRUD />} />
              <Route path="Home" element={<Home />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="About" element={<About />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
