import React from "react";
import { useSelector } from "react-redux";

const LoadingFullScreen = () => {
  const { isLoading } = useSelector((state) => state.commonFeature);
  if (!isLoading) return null;
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black opacity-40 z-[999]"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <div className="border-t-4 border-solid w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingFullScreen;
