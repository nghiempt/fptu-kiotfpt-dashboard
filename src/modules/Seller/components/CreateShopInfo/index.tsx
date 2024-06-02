import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../routes/constant";
import { AssetImages } from "../../../../utils/images";

const CreateShopInfo: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [keyProduct, setKeyProduct] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    alert("Shop info created successfully");
  };
  const goToSignIn = () => {
    navigate(ROUTE.SELLER_SIGN_IN);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create shop info
        </h1>
        <div className="flex gap-x-2">
          <div className="w-1/2 flex flex-col gap-4 text-[18px]">
            <i><div className="flex">
              <h1>Register to sell with&nbsp;</h1>
              <h1 className="font-bold">KiotFPT</h1>
            </div></i>
            
            <img src={AssetImages.LOGO} alt="" style={{ width: "80%" }} />
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="keyProduct"
                className="block text-sm font-medium text-gray-700"
              >
                Key product industry
              </label>
              <select
                className="mt-1 block font-medium w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="keyProduct"
                id="1"
                value={keyProduct}
                onChange={(e) => setKeyProduct(e.target.value)}
                required
              >
                <option value="1">Fashion</option>
                <option value="2">Technology</option>
                <option value="3">Food</option>
                <option value="4">Health</option>
                <option value="5">Cosmetic</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <VisibilityIcon
                      className="text-gray-400"
                      style={{ width: "80%" }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="text-gray-400"
                      style={{ width: "80%" }}
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm-password"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <VisibilityIcon
                      className="text-gray-400"
                      style={{ width: "80%" }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className="text-gray-400"
                      style={{ width: "80%" }}
                    />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Register now
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <button type='submit' onClick={goToSignIn} className="text-indigo-600 hover:text-indigo-500">Log in</button>
                </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateShopInfo;
