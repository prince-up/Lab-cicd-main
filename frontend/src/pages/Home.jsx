import React from 'react';
import { Link } from 'react-router-dom';

function Home({ darkMode, recentBuilds }) {
    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className={`rounded-xl p-12 border text-center ${
                darkMode 
                    ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-gray-700' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
            }`}>
                <h1 className={`text-5xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Welcome to CI/CD Pipeline Manager
                </h1>
                <p className={`text-xl mb-8 ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                    Automate your builds with Jenkins integration
                </p>
                <Link
                    to="/trigger"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Start Building Now</span>
                </Link>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className={`rounded-xl p-6 border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Multi-Language Support</h3>
                    <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Automatically detects and builds Maven, Gradle, NPM, Python, Go, and static HTML projects
                    </p>
                </div>

                <div className={`rounded-xl p-6 border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Real-Time Updates</h3>
                    <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Watch your builds progress in real-time with live status updates and console output
                    </p>
                </div>

                <div className={`rounded-xl p-6 border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                        <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Build Analytics</h3>
                    <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Track success rates, build times, and get insights into your CI/CD performance
                    </p>
                </div>
            </div>

            {/* Pipeline Stages Explanation */}
            <div className={`rounded-xl p-8 border ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
            }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>Pipeline Stages</h2>
                
                <div className="space-y-4">
                    {[
                        { icon: '📥', name: 'Checkout', desc: 'Clone your repository from GitHub' },
                        { icon: '🔍', name: 'Detect Project Type', desc: 'Automatically identify your project framework' },
                        { icon: '🔨', name: 'Build', desc: 'Compile and build your application' },
                        { icon: '✅', name: 'Test', desc: 'Run automated tests' },
                        { icon: '📊', name: 'Summary', desc: 'Generate build report and status' }
                    ].map((stage, idx) => (
                        <div key={idx} className="flex items-start space-x-4">
                            <span className="text-3xl">{stage.icon}</span>
                            <div>
                                <h3 className={`font-bold ${
                                    darkMode ? 'text-white' : 'text-gray-900'
                                }`}>{stage.name}</h3>
                                <p className={`text-sm ${
                                    darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>{stage.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Builds */}
            {recentBuilds && recentBuilds.length > 0 && (
                <div className={`rounded-xl p-8 border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-2xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Recent Builds</h2>
                        <Link
                            to="/dashboard"
                            className={`text-sm font-medium ${
                                darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                            }`}
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentBuilds.slice(0, 3).map((build) => (
                            <div key={build.id} className={`p-4 rounded-lg border ${
                                darkMode ? 'border-gray-700 bg-gray-900/30' : 'border-gray-200 bg-gray-50'
                            }`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className={`font-medium ${
                                            darkMode ? 'text-white' : 'text-gray-900'
                                        }`}>{build.buildName}</p>
                                        <p className={`text-sm ${
                                            darkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>{build.repoUrl}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        build.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500' :
                                        build.status === 'FAILED' ? 'bg-red-500/10 text-red-500' :
                                        build.status === 'RUNNING' ? 'bg-blue-500/10 text-blue-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                        {build.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Start Guide */}
            <div className={`rounded-xl p-8 border ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
            }`}>
                <h2 className={`text-2xl font-bold mb-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                }`}>Quick Start Guide</h2>
                
                <ol className="space-y-4">
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                        <div>
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Navigate to Trigger Build
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Click "Trigger Build" in the navigation menu
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                        <div>
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Enter Build Details
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Provide a build name, GitHub repository URL, and branch
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                        <div>
                            <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Monitor Progress
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Watch real-time updates as your build progresses through each stage
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    );
}

export default Home;
