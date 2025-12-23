import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    success: 0,
    failed: 0,
    running: 0,
    avgDuration: 0,
    successRate: 0
  });

  const COLORS = ['#10B981', '#EF4444', '#3B82F6', '#F59E0B'];

  useEffect(() => {
    loadBuilds();
    // Poll every 10 seconds for updates
    const interval = setInterval(loadBuilds, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadBuilds = () => {
    // First try localStorage (from App.jsx build history)
    const savedBuilds = localStorage.getItem('buildHistory');
    if (savedBuilds) {
      const localBuilds = JSON.parse(savedBuilds);
      setBuilds(localBuilds);
      calculateStats(localBuilds);
      setLoading(false);
    } else {
      // Fallback to API
      fetchBuilds();
    }
  };

  const fetchBuilds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/builds/Universal-Builder');
      const buildsData = response.data.builds || [];
      setBuilds(buildsData);
      calculateStats(buildsData);
    } catch (error) {
      console.error('Error fetching builds:', error);
      // Use empty array if API fails
      setBuilds([]);
      calculateStats([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchBuilds();
  };

  const calculateStats = (buildsData) => {
    const total = buildsData.length;
    const success = buildsData.filter(b => b.result === 'SUCCESS').length;
    const failed = buildsData.filter(b => b.result === 'FAILURE').length;
    const running = buildsData.filter(b => b.building).length;
    const totalDuration = buildsData.reduce((sum, b) => sum + (b.duration || 0), 0);
    const avgDuration = total > 0 ? Math.round(totalDuration / total / 1000) : 0;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;

    setStats({ total, success, failed, running, avgDuration, successRate });
  };

  const getPieData = () => [
    { name: 'Success', value: stats.success },
    { name: 'Failed', value: stats.failed },
    { name: 'Running', value: stats.running },
  ].filter(item => item.value > 0);

  const getTrendData = () => {
    return builds.slice(0, 10).reverse().map(build => ({
      build: `#${build.number}`,
      duration: Math.round(build.duration / 1000),
      status: build.result === 'SUCCESS' ? 1 : 0
    }));
  };

  const getHourlyData = () => {
    const hourCounts = {};
    builds.forEach(build => {
      const hour = new Date(build.timestamp).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    return Object.entries(hourCounts).map(([hour, count]) => ({
      hour: `${hour}:00`,
      builds: count
    })).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                📊 Build Analytics
              </h1>
              <p className="text-gray-400 mt-2">Comprehensive insights into your CI/CD pipeline performance</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center gap-2 ${
                refreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold">{stats.total}</div>
            <div className="text-blue-200 mt-1">Total Builds</div>
          </div>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold">{stats.successRate}%</div>
            <div className="text-green-200 mt-1">Success Rate</div>
          </div>
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold">{stats.avgDuration}s</div>
            <div className="text-purple-200 mt-1">Avg Duration</div>
          </div>
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold">{stats.failed}</div>
            <div className="text-orange-200 mt-1">Failed Builds</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Build Status Distribution */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Build Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getPieData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getPieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Build Duration Trend */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Build Duration Trend (Last 10)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getTrendData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="build" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: 'Seconds', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Line type="monotone" dataKey="duration" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Builds by Hour */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Builds by Hour</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getHourlyData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151' }} />
                <Legend />
                <Bar dataKey="builds" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Builds Table */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Recent Builds</h3>
            <div className="overflow-auto max-h-[300px]">
              <table className="w-full">
                <thead className="sticky top-0 bg-gray-700">
                  <tr>
                    <th className="text-left p-2">Build</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {builds.slice(0, 10).map((build) => (
                    <tr key={build.number} className="border-t border-gray-700 hover:bg-gray-700/50">
                      <td className="p-2">#{build.number}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          build.result === 'SUCCESS' ? 'bg-green-600' :
                          build.result === 'FAILURE' ? 'bg-red-600' :
                          'bg-blue-600'
                        }`}>
                          {build.building ? 'RUNNING' : build.result}
                        </span>
                      </td>
                      <td className="p-2">{Math.round(build.duration / 1000)}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
