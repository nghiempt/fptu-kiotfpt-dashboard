import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../routes/constant";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategories((prev) =>
      prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value]
    );
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColors((prev) =>
      prev.includes(value)
        ? prev.filter((Color) => Color !== value)
        : [...prev, value]
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFeaturedImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({
      productTitle,
      productDescription,
      minPrice,
      maxPrice,
      categories,
      colors,
      featuredImage,
    });
  };

  const goToProduct = () => {
    navigate(ROUTE.SELLER_PRODUCT);
  };

  return (
    <div className="w-full py-10 flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add new product</h2>
        <div className="mb-4">
          <label
            htmlFor="productTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Product Title
          </label>
          <input
            type="text"
            id="productTitle"
            placeholder="Enter product title"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Product description
          </label>
          <textarea
            id="productDescription"
            placeholder="Enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex gap-x-4 py-4">
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              <h1>Best-seller</h1>
            </label>
          </div>
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              <h1>Popular</h1>
            </label>
          </div>
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              <h1>Top deal</h1>
            </label>
          </div>
          <div className="flex gap-x-2 items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              <h1>Offical</h1>
            </label>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product categories
            </label>
            <div className="mt-1 space-y-2">
              {[1, 2, 3, 4].map((item: any, index: any) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={handleCategoryChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    <h1>Phone</h1>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Colors:
            </label>
            <div className="mt-1 space-y-2">
              {[1, 2, 3, 4].map((item: any, index: any) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={handleColorChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    <h1>Red</h1>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="featuredImage"
            className="block text-sm font-medium text-gray-700"
          >
            Featured Image
          </label>
          <input
            type="file"
            id="featuredImage"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md rounded-l cursor-pointer focus:outline-none"
          />
        </div>
        <button
          onClick={goToProduct}
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
