import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegisterForm from "./features/auth/pages/RegisterForm";
import Feed from "./features/post/pages/Feed";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
