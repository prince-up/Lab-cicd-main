import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BuildStatus from './BuildStatus';

function Dashboard({ darkMode, buildHistory, onUpdateTags, onUpdateNotes, onUpdateStatus, onExportCSV }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        // Trigger re-render and force status update
        await new Promise(resolve => setTimeout(resolve, 500));
        setRefreshing(false);
        window.location.reload();
    };

    const filteredBuilds = buildHistory.filter(build => {
        const matchesSearch = build.repoUrl?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || build.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
        >
            {/* Header with Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Dashboard
                </h2>
                <div className="flex flex-wrap gap-3">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 bg-black/20 hover:bg-black/40 text-white border border-white/10 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onExportCSV}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                        <span>📥</span> Export CSV
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/analytics')}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                        <span>📊</span> Analytics
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl p-6 border transition-all duration-200 backdrop-blur-md bg-black/30 border-white/10 hover:bg-black/40">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Total Builds</p>
                            <p className="text-3xl font-bold mt-1 text-white">{buildHistory.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl p-6 border transition-all duration-200 backdrop-blur-md bg-black/30 border-white/10 hover:bg-black/40">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Successful</p>
                            <p className={`text-3xl font-bold mt-1 text-green-500`}>
                                {buildHistory.filter(b => b.status === 'SUCCESS').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="rounded-xl p-6 border transition-all duration-200 backdrop-blur-md bg-black/30 border-white/10 hover:bg-black/40">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Failed</p>
                            <p className={`text-3xl font-bold mt-1 text-red-500`}>
                                {buildHistory.filter(b => b.status === 'FAILED').length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Search and Filter */}
            {buildHistory.length > 0 && (
                <motion.div variants={itemVariants} className="rounded-xl p-4 border backdrop-blur-md bg-black/30 border-white/10">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="🔍 Search by repository URL..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border transition-colors bg-black/20 border-white/10 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['ALL', 'SUCCESS', 'FAILED', 'RUNNING'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setStatusFilter(filter)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${statusFilter === filter
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-black/20 text-gray-300 hover:bg-black/40 border border-white/10'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Build History */}
            {filteredBuilds.length > 0 ? (
                <motion.div variants={itemVariants} className="rounded-xl p-6 border transition-all duration-200 backdrop-blur-md bg-black/30 border-white/10">
                    <h2 className="text-xl font-bold mb-6 text-white">Build History</h2>
                    <div className="space-y-3">
                        {filteredBuilds.map((build) => (
                            <BuildStatus
                                key={build.id}
                                initialInfo={build}
                                darkMode={darkMode}
                                onUpdateTags={onUpdateTags}
                                onUpdateNotes={onUpdateNotes}
                                onUpdateStatus={onUpdateStatus}
                            />
                        ))}
                    </div>
                </motion.div>
            ) : buildHistory.length > 0 ? (
                <motion.div variants={itemVariants} className={`rounded-xl p-12 border-2 border-dashed text-center ${darkMode
                    ? 'border-gray-700 bg-gray-800/30'
                    : 'border-gray-300 bg-gray-50'
                    }`}>
                    <div className="text-6xl mb-4">🔍</div>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No builds match your search criteria
                    </p>
                </motion.div>
            ) : (
                <motion.div variants={itemVariants} className={`rounded-xl p-12 border-2 border-dashed text-center ${darkMode
                    ? 'border-gray-700 bg-gray-800/30'
                    : 'border-gray-300 bg-gray-50'
                    }`}>
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                        No Builds Yet
                    </h3>
                    <p className={`text-lg mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Trigger your first build to get started!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/trigger')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all inline-flex items-center gap-2"
                    >
                        <span>🚀</span> Trigger New Build
                    </motion.button>
                </motion.div>
            )}
        </motion.div>
    );
}

export default Dashboard;
