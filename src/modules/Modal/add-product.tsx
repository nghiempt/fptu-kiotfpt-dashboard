import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

export default function AddProductModal({ open, handleClose }: { open: boolean, handleClose: any }) {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <section className="">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full relative bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className='absolute top-4 right-4 cursor-pointer' onClick={handleClose}>
                                <CloseIcon />
                            </div>
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create Product
                                </h1>
                                <button type="submit" className="w-full text-white bg-[#0B2447] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal>
        </div>
    );
}