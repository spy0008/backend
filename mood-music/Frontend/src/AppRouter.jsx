import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./features/auth/pages/LoginForm";
import RegisterForm from "./features/auth/pages/RegisterForm";
import Protected from "./features/auth/components/Protected";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/"
          element={
            <Protected>
              <h1>home</h1>
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
