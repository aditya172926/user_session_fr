import { useEffect, useState } from 'react';
import { createUser, loginUser } from '../services/server';
import { io } from 'socket.io-client';
import { WEBSOCKET_URL } from '../constants';
import { useRouter } from 'next/navigation';

const AuthForm = () => {
    const socket = io(WEBSOCKET_URL);

    const [isLogin, setIsLogin] = useState(true);
    const [mobileNumber, setMobileNumber] = useState('');
    const [username, setUsername] = useState('');
    const [activeSessionId, setActiveSessionId] = useState(null);

    const router = useRouter();

    useEffect(() => {
        if (activeSessionId) {
            socket.on(activeSessionId, (data) => {
                console.log("Received data", data);
                if (!data.valid) {
                    // if (window.onfocus)
                    alert("Logout and Login again");
                    router.push('/');
                }
            })
        }
    }, [activeSessionId]);

    const handleSubmit = async(event: any) => {
        event.preventDefault();
        console.log("Mobile number" , mobileNumber);
        if (isLogin) {
            const response = await loginUser(mobileNumber);
            localStorage.setItem('sessionId', response);
            setActiveSessionId(response);
        } else {
            const response = await createUser(mobileNumber, username);
            localStorage.setItem('sessionId', response);
            setActiveSessionId(response);
        }
        router.push(`/user?mobile=${mobileNumber}`);

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    {isLogin ? 'Login' : 'Register'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-600">
                            Mobile Number
                        </label>
                        <input
                            type="text"
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                        />
                    </div>
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required={!isLogin}
                                className="w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                </form>
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full px-4 py-2 text-sm text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};

export default AuthForm;
