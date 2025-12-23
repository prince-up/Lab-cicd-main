import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogsViewer = () => {
  const { jobName, buildNumber } = useParams();
  const navigate = useNavigate();
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, [jobName, buildNumber]);

  useEffect(() => {
    if (autoScroll && logs) {
      const logsContainer = document.getElementById('logs-container');
      if (logsContainer) {
        logsContainer.scrollTop = logsContainer.scrollHeight;
      }
    }
  }, [logs, autoScroll]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/logs/${jobName}/${buildNumber}`);
      setLogs(response.data.logs || 'No logs available');
    } catch (error) {
      setLogs('Error fetching logs: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadLogs = () => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${jobName}-build-${buildNumber}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Build Logs
            </h1>
            <p className="text-gray-400 mt-2">
              {jobName} - Build #{buildNumber}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                autoScroll
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {autoScroll ? '🔓 Auto-scroll ON' : '🔒 Auto-scroll OFF'}
            </button>
            <button
              onClick={fetchLogs}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-all"
            >
              🔄 Refresh
            </button>
            <button
              onClick={downloadLogs}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-all"
            >
              ⬇️ Download
            </button>
          </div>
        </div>

        {/* Logs Container */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div
              id="logs-container"
              className="p-6 overflow-auto h-[600px] font-mono text-sm bg-black/50"
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {logs.split('\n').map((line, index) => (
                <div
                  key={index}
                  className={`hover:bg-gray-700/30 px-2 -mx-2 ${
                    line.toLowerCase().includes('error') || line.toLowerCase().includes('failed')
                      ? 'text-red-400'
                      : line.toLowerCase().includes('success') || line.toLowerCase().includes('finished')
                      ? 'text-green-400'
                      : line.toLowerCase().includes('warning')
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  <span className="text-gray-600 mr-4 select-none">{index + 1}</span>
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogsViewer;
