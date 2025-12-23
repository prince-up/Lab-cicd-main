import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TriggerBuild({ darkMode, onBuildTriggered }) {
    const [buildName, setBuildName] = useState('');
    const [repoUrl, setRepoUrl] = useState('');
    const [branch, setBranch] = useState('main');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const navigate = useNavigate();

    const handleTrigger = async (e) => {
        e.preventDefault();
        
        if (!buildName || !repoUrl) {
            setError('Please fill in all required fields');
            return;
        }
        
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/build', { repoUrl });
            const { jobName, message } = response.data;

            const newBuild = {
                id: Date.now(),
                buildName: buildName,
                status: 'QUEUED',
                jobName: jobName,
                message: message,
                repoUrl: repoUrl,
                branch: branch,
                timestamp: new Date().toISOString()
            };

            onBuildTriggered(newBuild);
            setSuccess('Build triggered successfully! Redirecting to dashboard...');
            
            // Reset form
            setBuildName('');
            setRepoUrl('');
            setBranch('main');
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || 'Failed to trigger build');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className={`rounded-xl p-8 border ${
                darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200 shadow-xl'
            }`}>
                <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className={`text-2xl font-bold ${
                            darkMode ? 'text-white' : 'text-gray-900'
                        }`}>Trigger New Build</h1>
                        <p className={`text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Start a new CI/CD pipeline</p>
                    </div>
                </div>

                <form onSubmit={handleTrigger} className="space-y-6">
                    {/* Build Name */}
                    <div>
                        <label htmlFor="buildName" className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Build Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="buildName"
                            required
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                                darkMode 
                                    ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                            } focus:outline-none`}
                            placeholder="e.g., My Awesome Project Build"
                            value={buildName}
                            onChange={(e) => setBuildName(e.target.value)}
                        />
                    </div>

                    {/* Repository URL */}
                    <div>
                        <label htmlFor="repoUrl" className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            GitHub Repository URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className={`w-5 h-5 ${
                                    darkMode ? 'text-gray-500' : 'text-gray-400'
                                }`} fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="url"
                                id="repoUrl"
                                required
                                className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 ${
                                    darkMode 
                                        ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                                        : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                                } focus:outline-none`}
                                placeholder="https://github.com/username/repository.git"
                                value={repoUrl}
                                onChange={(e) => setRepoUrl(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Branch */}
                    <div>
                        <label htmlFor="branch" className={`block text-sm font-medium mb-2 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                            Branch
                        </label>
                        <input
                            type="text"
                            id="branch"
                            className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                                darkMode 
                                    ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20' 
                                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                            } focus:outline-none`}
                            placeholder="main"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        />
                        <p className={`text-xs mt-1 ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>Default: main</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className="text-red-500 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="flex items-center space-x-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-500 text-sm font-medium">{success}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:transform-none ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed text-white' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span>Triggering Build...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Trigger Build</span>
                            </div>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TriggerBuild;
