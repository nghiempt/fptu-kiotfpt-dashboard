import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../routes/constant";

const BeginShop: React.FC = () => {
  const navigate = useNavigate();
  const goToSeller = () => {
    navigate(ROUTE.SELLER);
  };
  return (
    <div className="w-full flex flex-col justify-center items-centerp p-20">
      <h1 className="text-center">welcome begin shop</h1>
      <button onClick={goToSeller} className="hover:underline">
        <h1 className="text-green-600 text-[40px]">Click dô đây!</h1>
      </button>
    </div>
  );
};
export default BeginShop;
