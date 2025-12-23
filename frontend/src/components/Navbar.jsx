import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ darkMode, setDarkMode }) {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <header className={`border-b transition-colors ${
            darkMode ? 'bg-gray-900/50 border-gray-800 backdrop-blur-xl' : 'bg-white/50 border-gray-200 backdrop-blur-xl'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className={`text-xl font-bold ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>CI/CD Pipeline Manager</h1>
                                <p className={`text-xs ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Jenkins Build Automation</p>
                            </div>
                        </Link>

                        <nav className="hidden md:flex space-x-1">
                            <Link
                                to="/"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive('/') 
                                        ? darkMode 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/trigger"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive('/trigger') 
                                        ? darkMode 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Trigger Build
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive('/dashboard') 
                                        ? darkMode 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/analytics"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive('/analytics') 
                                        ? darkMode 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Analytics
                            </Link>
                            <Link
                                to="/settings"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive('/settings') 
                                        ? darkMode 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-blue-600 text-white'
                                        : darkMode
                                            ? 'text-gray-300 hover:bg-gray-800'
                                            : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                ⚙️ Settings
                            </Link>
                        </nav>
                    </div>
                    
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                            darkMode 
                                ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {darkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
