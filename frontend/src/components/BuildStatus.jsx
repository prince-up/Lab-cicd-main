import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuildStatus({ initialInfo, darkMode, onUpdateTags, onUpdateNotes, onUpdateStatus }) {
    const [status, setStatus] = useState(initialInfo.status);
    const [buildNumber, setBuildNumber] = useState(null);
    const [message, setMessage] = useState(initialInfo.message);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(initialInfo.duration || 0);
    const [tags, setTags] = useState(initialInfo.tags || []);
    const [notes, setNotes] = useState(initialInfo.notes || '');
    const [isEditingTags, setIsEditingTags] = useState(false);
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (!initialInfo.jobName) return;

        const interval = setInterval(async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/status/${initialInfo.jobName}`);
                const { status: currentStatus, buildNumber: bn } = res.data;

                setStatus(currentStatus);
                setBuildNumber(bn);

                // Calculate duration for running builds
                if (currentStatus === 'RUNNING' && initialInfo.startTime) {
                    setDuration(Date.now() - initialInfo.startTime);
                }

                if (currentStatus === 'SUCCESS' || currentStatus === 'FAILED' || currentStatus === 'ABORTED') {
                    clearInterval(interval);
                    setProgress(100);
                    // Update global state
                    if (onUpdateStatus && initialInfo.status !== currentStatus) {
                        onUpdateStatus(initialInfo.id, currentStatus, initialInfo.startTime ? Date.now() - initialInfo.startTime : 0);
                    }
                } else if (currentStatus === 'RUNNING') {
                    setProgress(prev => (prev < 90 ? prev + 5 : prev)); // Slower progress for smoother feel
                }
            } catch (err) {
                console.error('Error polling status:', err);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [initialInfo]);

    const getStatusIcon = (s) => {
        if (s === 'SUCCESS') {
            return (
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            );
        }
        if (s === 'FAILED') {
            return (
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            );
        }
        if (s === 'RUNNING') {
            return (
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            );
        }
        return (
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        );
    };

    const getStatusColor = (s) => {
        if (s === 'SUCCESS') return 'bg-green-500/10 border-green-500/30';
        if (s === 'FAILED') return 'bg-red-500/10 border-red-500/30';
        if (s === 'RUNNING') return 'bg-blue-500/10 border-blue-500/30';
        return 'bg-yellow-500/10 border-yellow-500/30';
    };

    const getStatusText = (s) => {
        if (s === 'SUCCESS') return { text: 'Build Successful', color: 'text-green-500' };
        if (s === 'FAILED') return { text: 'Build Failed', color: 'text-red-500' };
        if (s === 'RUNNING') return { text: 'Building...', color: 'text-blue-500' };
        if (s === 'QUEUED') return { text: 'Queued', color: 'text-yellow-500' };
        return { text: status, color: 'text-gray-300' };
    };

    const statusInfo = getStatusText(status);
    const timeAgo = new Date(initialInfo.timestamp).toLocaleTimeString();

    return (
        <div className={`border rounded-xl p-5 transition-all duration-300 hover:shadow-lg ${getStatusColor(status)}`}>
            <div className="flex items-start space-x-4">
                {/* Status Icon */}
                <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(status)}
                </div>

                {/* Build Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={`font-bold text-lg ${statusInfo.color}`}>
                            {statusInfo.text}
                        </h3>
                        {buildNumber && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/20 text-gray-300 border border-white/10">
                                #{buildNumber}
                            </span>
                        )}
                    </div>

                    <div className="text-sm mb-3 text-gray-300">
                        <p className="truncate mb-1">
                            <span className="font-medium">Repository:</span> {initialInfo.repoUrl}
                        </p>
                        <div className="flex items-center space-x-4">
                            <p className="flex items-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{timeAgo}</span>
                            </p>
                            {duration > 0 && (
                                <p className="flex items-center space-x-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <span className="font-medium">{Math.round(duration / 1000)}s</span>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-3">
                        <div className="flex flex-wrap gap-2 items-center">
                            {tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className={`px-2 py-1 rounded text-xs font-medium ${tag === 'hotfix' ? 'bg-red-600/20 text-red-400 border border-red-600/30' :
                                        tag === 'release' ? 'bg-green-600/20 text-green-400 border border-green-600/30' :
                                            tag === 'experimental' ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30' :
                                                'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                                        }`}
                                >
                                    {tag}
                                    {isEditingTags && (
                                        <button
                                            onClick={() => {
                                                const newTags = tags.filter((_, i) => i !== idx);
                                                setTags(newTags);
                                                onUpdateTags?.(initialInfo.id, newTags);
                                            }}
                                            className="ml-1 hover:text-white"
                                        >
                                            ×
                                        </button>
                                    )}
                                </span>
                            ))}
                            {isEditingTags ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newTag}
                                        onChange={(e) => setNewTag(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && newTag.trim()) {
                                                const newTags = [...tags, newTag.trim()];
                                                setTags(newTags);
                                                onUpdateTags?.(initialInfo.id, newTags);
                                                setNewTag('');
                                            }
                                        }}
                                        placeholder="Add tag..."
                                        className="px-2 py-1 text-xs rounded border bg-black/20 border-white/10 text-white placeholder-gray-400"
                                    />
                                    <button
                                        onClick={() => setIsEditingTags(false)}
                                        className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setIsEditingTags(true)}
                                    className={`text-xs px-2 py-1 rounded border border-dashed border-gray-500 text-gray-300 hover:border-gray-400`}
                                >
                                    + Add Tag
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Notes */}
                    {(notes || isEditingNotes) && (
                        <div className="mb-3 p-2 rounded text-sm bg-black/20 text-gray-300">
                            {isEditingNotes ? (
                                <div>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className={`w-full px-2 py-1 text-sm rounded border bg-black/20 border-white/10 text-white placeholder-gray-400`}
                                        rows={2}
                                        placeholder="Add notes..."
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => {
                                                onUpdateNotes?.(initialInfo.id, notes);
                                                setIsEditingNotes(false);
                                            }}
                                            className="text-xs px-3 py-1 bg-blue-600 text-white rounded"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setNotes(initialInfo.notes || '');
                                                setIsEditingNotes(false);
                                            }}
                                            className="text-xs px-3 py-1 rounded bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setIsEditingNotes(true)}
                                    className="cursor-pointer hover:opacity-80"
                                >
                                    📝 {notes}
                                </div>
                            )}
                        </div>
                    )}
                    {!notes && !isEditingNotes && (
                        <button
                            onClick={() => setIsEditingNotes(true)}
                            className="text-xs mb-3 text-gray-400 hover:text-gray-300"
                        >
                            + Add notes
                        </button>
                    )}

                    {/* Progress Bar for Running Builds */}
                    {status === 'RUNNING' && (
                        <div className="w-full h-2 rounded-full overflow-hidden bg-gray-700">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}

                    {/* Jenkins Link */}
                    <div className="mt-3 flex gap-3">
                        <a
                            href={`http://localhost:8082/job/${initialInfo.jobName}/${buildNumber || 'lastBuild'}/console`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center space-x-2 text-sm text-blue-400 hover:text-blue-300`}
                        >
                            <span>View Console Output</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                        {buildNumber && (
                            <a
                                href={`/logs/${initialInfo.jobName}/${buildNumber}`}
                                className={`inline-flex items-center space-x-2 text-sm text-purple-400 hover:text-purple-300`}
                            >
                                <span>📄 View Logs</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuildStatus;
