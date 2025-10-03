import type React from "react";
import { useEffect } from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-neutral-100">
      {children}
    </div>
  );
};

export default DefaultLayout;
