import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../../routes/constant';
import ForgotPasswordPopupModal from '../../Modal/ForgotPasswordPopup/ForgotPasswordPopup';

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
    };

    const goToSignUp = () => {
        navigate(ROUTE.SELLER_SIGN_UP);
      };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/4">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            {showPassword ? <VisibilityIcon className='text-gray-400' style={{width:"80%"}}/> : <VisibilityOffIcon className='text-gray-400' style={{width:"80%"}}/>}
                        </button>
                    </div>
                    <div className='flex justify-end'>
                        <ForgotPasswordPopupModal>
                        <button className='cursor-pointer'>
                            <h1><u>Forgot password</u></h1>
                        </button>
                        </ForgotPasswordPopupModal>
                </div>
                </div>
                
                
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign In
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                Don’t have an account? <button type="submit" onClick={goToSignUp} className="text-indigo-600 hover:text-indigo-500">Sign up</button>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
