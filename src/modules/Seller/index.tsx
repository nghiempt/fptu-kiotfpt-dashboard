import { useEffect, useState } from "react";
import TableStatistical from "./components/statistical/statistical";
import TableCategory from "./components/category";
import { SemanticToastContainer } from "react-semantic-toasts";
import { Button, Icon } from "semantic-ui-react";
import Cookie from "js-cookie";
import { AuthService } from "../../services/auth";
import TableOrder from "./components/order";
import TableProduct from "./components/product";
import TableVoucher from "./components/voucher";
import TableShop from "./components/shop";
import TableAnalysis from "./components/analysis/analysis";

const SellerContainer: React.FC = () => {

    const [tab, setTab] = useState(0);

    const handleChangeTab = (tab: number) => {
        setTab(tab);
    }

    const renderTabData = () => {
        switch (tab) {
            case 0:
                return <TableStatistical />
            case 1:
                return <TableAnalysis />
            case 2:
                return <TableOrder />
            case 3:
                return <TableProduct />
            case 4:
                return <TableCategory />
            case 5:
                return <TableVoucher />
            case 6:
                return <TableShop />
            default:
                return <TableStatistical />
        }
    }

    const signOut = () => {
        Cookie.remove('auth');
        window.location.href = "/";
    }

    useEffect(() => {
        if (AuthService.getRole() !== 'shop') {
            window.location.href = "/";
        }
    }, [])

    return (
        <div>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="https://res.cloudinary.com/kiotfpt/image/upload/v1722159749/kiotfpt/logo_jniyaz.png" className="h-8 me-3" alt="FlowBite Logo" />
                                <span className="text-gray-700 self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">KIOTFPT DASHBOARD</span>
                            </a>
                        </div>
                        <div className="flex items-center gap-2 m-0">
                            <div className="flex items-center ms-3">
                                <div>
                                    <Button
                                        className="!m-0"
                                        icon='fork'
                                        label={{ as: 'a', basic: true, content: 'Seller' }}
                                        labelPosition='left'
                                    />
                                </div>
                            </div>
                            <Button icon onClick={signOut}>
                                <Icon name='sign-out' />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
            <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-4 pb-4 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium text-xl">
                        <li>
                            <a onClick={(e) => handleChangeTab(0)} className={`${tab === 0 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Statistical</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(1)} className={`${tab === 1 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M11 1v10H1c0-5.523 4.477-10 10-10zM21 11H11v10c5.523 0 10-4.477 10-10zM7 7H5v7h2V7zm3 3H8v4h2v-4zm3-3h-2v7h2V7zm3 3h-2v4h2v-4z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Analysis</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(2)} className={`${tab === 2 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0a2 2 0 0 0-2 2v4H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8v4a2 2 0 0 0 4 0v-4h8a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8V2a2 2 0 0 0-2-2zM4 8h16v8H4V8zm4-6h8v4H8V2zm8 20H8v-4h8v4z" />
                                </svg>

                                <span className="flex-1 ms-3 whitespace-nowrap">Order</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(3)} className={`${tab === 3 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Product</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(4)} className={`${tab === 4 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Category</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(5)} className={`${tab === 5 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 2H4C2.9 2 2 2.9 2 4v3.22c0 0.52 0.4 0.98 0.92 1.05 0.98 0.14 1.86 0.72 2.44 1.58 0.29 0.44 0.86 0.63 1.36 0.44s0.86-0.63 0.97-1.15c0.17-0.81 0.78-1.5 1.6-1.82 0.52-0.21 1.1-0.31 1.67-0.31 0.57 0 1.15 0.1 1.67 0.31 0.82 0.32 1.43 1.01 1.6 1.82 0.11 0.52 0.4 0.95 0.97 1.15 0.5 0.19 1.07 0 1.36-0.44 0.58-0.86 1.46-1.44 2.44-1.58 0.52-0.07 0.92-0.53 0.92-1.05V4c0-1.1-0.9-2-2-2zM4 8.22V20c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V8.22c-0.67 0.34-1.32 0.83-1.88 1.42-0.35 0.37-0.95 0.48-1.42 0.27-0.61-0.25-1.06-0.76-1.24-1.39-0.2-0.76-0.72-1.37-1.44-1.68-0.37-0.15-0.76-0.22-1.16-0.22s-0.79 0.07-1.16 0.22c-0.72 0.31-1.24 0.92-1.44 1.68-0.18 0.63-0.63 1.14-1.24 1.39-0.47 0.2-1.07 0.1-1.42-0.27-0.56-0.59-1.21-1.08-1.88-1.42zM15 13c-0.55 0-1 0.45-1 1s0.45 1 1 1 1-0.45 1-1-0.45-1-1-1zM12 16c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Voucher</span>
                            </a>
                        </li>
                        <li>
                            <a onClick={(e) => handleChangeTab(6)} className={`${tab === 6 ? 'bg-gray-200' : ''} cursor-pointer px-4 flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 hover:text-gray-700 hover:font-semibold group`}>
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Shop Profile</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="p-4 sm:ml-64">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg mt-16">
                    <div className="w-full flex justify-center items-center relative">
                        <SemanticToastContainer className="w-1/3 absolute top-0" />
                    </div>
                    {renderTabData()}
                </div>
            </div>
        </div>
    )
}

export default SellerContainer;
