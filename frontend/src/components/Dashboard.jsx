import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuildStatus from './BuildStatus';

function Dashboard({ darkMode, buildHistory, onUpdateTags, onUpdateNotes, onExportCSV }) {
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

    return (
        <div className="space-y-6">
            {/* Header with Action Buttons */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Dashboard
                </h2>
                <div className="flex flex-wrap gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                            darkMode
                                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        } ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
                        {refreshing ? 'Refreshing...' : 'Refresh'}
                    </button>
                    <button
                        onClick={onExportCSV}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                        📥 Export CSV
                    </button>
                    <button
                        onClick={() => navigate('/analytics')}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2"
                    >
                        📊 Analytics
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`rounded-xl p-6 border transition-all duration-200 ${
                    darkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                        : 'bg-white border-gray-200 hover:shadow-lg'
                }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>Total Builds</p>
                            <p className={`text-3xl font-bold mt-1 ${
                                darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{buildHistory.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className={`rounded-xl p-6 border transition-all duration-200 ${
                    darkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                        : 'bg-white border-gray-200 hover:shadow-lg'
                }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>Successful</p>
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
                </div>

                <div className={`rounded-xl p-6 border transition-all duration-200 ${
                    darkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70' 
                        : 'bg-white border-gray-200 hover:shadow-lg'
                }`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className={`text-sm font-medium ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>Failed</p>
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
                </div>
            </div>

            {/* Search and Filter */}
            {buildHistory.length > 0 && (
                <div className={`rounded-xl p-4 border ${
                    darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'
                }`}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="🔍 Search by repository URL..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                                    darkMode 
                                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                            />
                        </div>
                        <div className="flex gap-2">
                            {['ALL', 'SUCCESS', 'FAILED', 'RUNNING'].map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setStatusFilter(filter)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                                        statusFilter === filter
                                            ? 'bg-blue-600 text-white'
                                            : darkMode
                                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Build History */}
            {filteredBuilds.length > 0 ? (
                <div className={`rounded-xl p-6 border transition-all duration-200 ${
                    darkMode 
                        ? 'bg-gray-800/50 border-gray-700' 
                        : 'bg-white border-gray-200 shadow-xl'
                }`}>
                    <h2 className={`text-xl font-bold mb-6 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Build History</h2>
                    <div className="space-y-3">
                        {filteredBuilds.map((build) => (
                            <BuildStatus 
                                key={build.id} 
                                initialInfo={build} 
                                darkMode={darkMode}
                                onUpdateTags={onUpdateTags}
                                onUpdateNotes={onUpdateNotes}
                            />
                        ))}
                    </div>
                </div>
            ) : buildHistory.length > 0 ? (
                <div className={`rounded-xl p-12 border-2 border-dashed text-center ${
                    darkMode 
                        ? 'border-gray-700 bg-gray-800/30' 
                        : 'border-gray-300 bg-gray-50'
                }`}>
                    <div className="text-6xl mb-4">🔍</div>
                    <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No builds match your search criteria
                    </p>
                </div>
            ) : (
                <div className={`rounded-xl p-12 border-2 border-dashed text-center ${
                    darkMode 
                        ? 'border-gray-700 bg-gray-800/30' 
                        : 'border-gray-300 bg-gray-50'
                }`}>
                    <div className="text-6xl mb-4 animate-bounce">🚀</div>
                    <h3 className={`text-2xl font-bold mb-2 ${
                        darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        No Builds Yet
                    </h3>
                    <p className={`text-lg mb-6 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Trigger your first build to get started!
                    </p>
                    <button
                        onClick={() => navigate('/trigger')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all inline-flex items-center gap-2"
                    >
                        <span>🚀</span> Trigger New Build
                    </button>
                </div>
            )}
                <div className={`rounded-xl p-12 border-2 border-dashed text-center ${
                    darkMode 
                        ? 'border-gray-700 bg-gray-800/30' 
                        : 'border-gray-300 bg-gray-50'
                }`}>
                    <svg className={`w-16 h-16 mx-auto mb-4 ${
                        darkMode ? 'text-gray-600' : 'text-gray-400'
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className={`text-lg font-semibold mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>No builds yet</h3>
                    <p className={`text-sm ${
                        darkMode ? 'text-gray-500' : 'text-gray-600'
                    }`}>Trigger your first build to get started</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
