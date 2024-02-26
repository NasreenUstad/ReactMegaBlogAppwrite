import { useDispatch } from "react-redux";
import "./App.css";
import { useState, useEffect } from "react";
import authService from "./appwrite/auth";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(authService.login({ userData }));
        } else {
          dispatch(authService.logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        Todo: <Outlet />
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
