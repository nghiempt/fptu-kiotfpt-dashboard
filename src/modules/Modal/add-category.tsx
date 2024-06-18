import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { CategoryService } from "../../services/category";

export default function AddCategoryModal({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: any;
  data: any;
}) {

  const [categoryName, setCategoryName] = React.useState('');
  const [categoryImage, setCategoryImage] = React.useState(null as any);

  const handleUpload = (e: any) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setCategoryImage(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const handleSubmit = async () => {
    const payload = {
      name: categoryName,
      shop_id: "10",
      thumbnail: "https://cdn-icons-png.flaticon.com/128/595/595067.png"
    }
    const fetch = await CategoryService.createCategory(payload);
    window.location.reload();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full relative bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleClose}
              >
                <CloseIcon />
              </div>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-[20px] font-bold leading-tight tracking-tight text-gray-900">
                  Create Category
                </h1>
                {
                  categoryImage === null
                    ?
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                        onChange={handleUpload}
                      />
                    </label>
                    :
                    <div className="flex flex-col justify-center items-center">
                      <img src={categoryImage} alt="qr" />
                      <button className="mt-10 px-10 py-1 border border-[rgb(var(--quaternary-rgb))] text-[rgb(var(--quaternary-rgb))] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Clear</button>
                    </div>
                }
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="w-full border px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />
                </div>
                <div className="flex gap-x-2">
                  <button
                    onClick={handleClose}
                    className="w-full text-white bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full text-white bg-[rgb(var(--quaternary-rgb))] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}
