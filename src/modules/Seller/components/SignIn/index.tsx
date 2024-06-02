import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        // Handle form submission
        console.log({ username, password, confirmPassword });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-1/4">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">User name</label>
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
                </div>
                <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            {showConfirmPassword ? <VisibilityIcon className='text-gray-400' style={{width:"80%"}}/> : <VisibilityOffIcon className='text-gray-400' style={{width:"80%"}}/>}
                        </button>
                    </div>
                </div>
                <div className="mb-4 flex items-center">
                    <input type="checkbox" required className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                    <label className="ml-2 block text-sm text-gray-900">
                        By creating an account, you agree to our <a href="/terms" className="text-indigo-600 hover:text-indigo-500">Terms of use</a> and <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>.
                    </label>
                </div>
                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Create an account
                </button>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Log in</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
