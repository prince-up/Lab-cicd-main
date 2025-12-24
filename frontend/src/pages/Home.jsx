import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home({ darkMode, recentBuilds }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Hero Section */}
            <motion.div
                variants={itemVariants}
                className={`rounded-2xl p-12 border text-center backdrop-blur-md shadow-2xl relative overflow-hidden group ${'bg-black/40 border-white/10'
                    }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-purple-200">
                    Welcome to CI/CD Pipeline Manager
                </h1>
                <p className="text-xl mb-8 font-light max-w-2xl mx-auto text-gray-300">
                    Automate your builds with Jenkins integration. Experience the future of DevOps management.
                </p>
                <div className="flex justify-center gap-4">
                    <Link
                        to="/trigger"
                        className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 ring-1 ring-white/20"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Start Building Now</span>
                    </Link>
                </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={containerVariants} className="grid md:grid-cols-3 gap-6">
                {[
                    {
                        title: "Multi-Language Support",
                        desc: "Automatically detects and builds Maven, Gradle, NPM, Python, Go, and static HTML projects",
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        ),
                        color: "blue"
                    },
                    {
                        title: "Real-Time Updates",
                        desc: "Watch your builds progress in real-time with live status updates and console output",
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        ),
                        color: "green"
                    },
                    {
                        title: "Build Analytics",
                        desc: "Track success rates, build times, and get insights into your CI/CD performance",
                        icon: (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        ),
                        color: "purple"
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        className={`rounded-2xl p-6 border backdrop-blur-md transition-all duration-300 bg-black/40 border-white/10 hover:bg-black/60 hover:border-blue-500/30 shadow-lg`}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/5`}>
                            <svg className={`w-6 h-6 text-${feature.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {feature.icon}
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                        <p className="text-sm leading-relaxed text-gray-300">
                            {feature.desc}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Pipeline Stages Explanation */}
            <motion.div
                variants={itemVariants}
                className="rounded-2xl p-8 border backdrop-blur-md bg-black/40 border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white">Pipeline Stages</h2>

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
                                <h3 className="font-bold text-white">{stage.name}</h3>
                                <p className="text-sm text-gray-300">{stage.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Recent Builds */}
            {recentBuilds && recentBuilds.length > 0 && (
                <motion.div
                    variants={itemVariants}
                    className="rounded-2xl p-8 border backdrop-blur-md bg-black/40 border-white/10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Recent Builds</h2>
                        <Link
                            to="/dashboard"
                            className="text-sm font-medium text-blue-400 hover:text-blue-300"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentBuilds.slice(0, 3).map((build) => (
                            <div key={build.id} className="p-4 rounded-xl border transition-colors border-white/10 bg-white/5 hover:bg-white/10">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-white">{build.buildName}</p>
                                        <p className="text-sm text-gray-300">{build.repoUrl}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${build.status === 'SUCCESS' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                        build.status === 'FAILED' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                            build.status === 'RUNNING' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                        }`}>
                                        {build.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Quick Start Guide */}
            <motion.div
                variants={itemVariants}
                className="rounded-2xl p-8 border backdrop-blur-md bg-black/40 border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white">Quick Start Guide</h2>

                <ol className="space-y-4">
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">1</span>
                        <div>
                            <h3 className="font-bold text-white">
                                Navigate to Trigger Build
                            </h3>
                            <p className="text-sm text-gray-300">
                                Click "Trigger Build" in the navigation menu
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">2</span>
                        <div>
                            <h3 className="font-bold text-white">
                                Enter Build Details
                            </h3>
                            <p className="text-sm text-gray-300">
                                Provide a build name, GitHub repository URL, and branch
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start space-x-4">
                        <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">3</span>
                        <div>
                            <h3 className="font-bold text-white">
                                Monitor Progress
                            </h3>
                            <p className="text-sm text-gray-300">
                                Watch real-time updates as your build progresses through each stage
                            </p>
                        </div>
                    </li>
                </ol>
            </motion.div>
        </motion.div>
    );
}

export default Home;
