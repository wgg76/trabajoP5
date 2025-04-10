import React from "react";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col text-white relative">
      
      <header className="fixed top-0 w-full bg-gray-900 bg-opacity-80 z-30">
        <Header />
      </header>

      
      <main
        className={
          isHome
            ? "flex-grow pt-20 pb-16" 
            : "flex-grow container mx-auto p-4 mt-4"
        }
      >
        <AppRouter />
      </main>

      
      <footer className="fixed bottom-0 w-full bg-gray-900 bg-opacity-80 z-30">
        <Footer />
      </footer>

      <ToastContainer position="bottom-center" autoClose={3000} />

    </div>




  );
}

export default App;
