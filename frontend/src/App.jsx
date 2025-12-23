import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TriggerBuild from './pages/TriggerBuild';
import Dashboard from './components/Dashboard';
import LogsViewer from './pages/LogsViewer';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [buildHistory, setBuildHistory] = useState(() => {
    const saved = localStorage.getItem('buildHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : {
      jenkinsUrl: 'http://localhost:8082',
      pollingInterval: 5000,
      apiUrl: 'http://localhost:5000'
    };
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('buildHistory', JSON.stringify(buildHistory));
  }, [buildHistory]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        window.location.href = '/trigger';
      }
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        window.location.href = '/dashboard';
      }
      if (e.ctrlKey && e.key === ',') {
        e.preventDefault();
        window.location.href = '/settings';
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleBuildTriggered = (newBuild) => {
    const buildWithMetadata = {
      ...newBuild,
      tags: [],
      notes: '',
      startTime: Date.now(),
      duration: 0
    };
    setBuildHistory([buildWithMetadata, ...buildHistory]);
  };

  const updateBuildStatus = (id, status, duration = 0) => {
    setBuildHistory(buildHistory.map(build => 
      build.id === id ? { ...build, status, duration } : build
    ));
  };

  const updateBuildTags = (id, tags) => {
    setBuildHistory(buildHistory.map(build =>
      build.id === id ? { ...build, tags } : build
    ));
  };

  const updateBuildNotes = (id, notes) => {
    setBuildHistory(buildHistory.map(build =>
      build.id === id ? { ...build, notes } : build
    ));
  };

  const exportToCSV = () => {
    const headers = ['Build Number', 'Status', 'Repository', 'Duration (s)', 'Tags', 'Notes', 'Timestamp'];
    const rows = buildHistory.map(build => [
      build.buildNumber || 'N/A',
      build.status,
      build.repoUrl,
      Math.round(build.duration / 1000),
      (build.tags || []).join(', '),
      build.notes || '',
      new Date(build.timestamp).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `build-history-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BrowserRouter>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50'
      }`}>
        {/* Animated Background Pattern */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<Home darkMode={darkMode} recentBuilds={buildHistory} />} />
              <Route path="/trigger" element={<TriggerBuild darkMode={darkMode} onBuildTriggered={handleBuildTriggered} settings={settings} />} />
              <Route path="/dashboard" element={
                <Dashboard 
                  darkMode={darkMode} 
                  buildHistory={buildHistory} 
                  onUpdateTags={updateBuildTags}
                  onUpdateNotes={updateBuildNotes}
                  onExportCSV={exportToCSV}
                />
              } />
              <Route path="/logs/:jobName/:buildNumber" element={<LogsViewer />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings darkMode={darkMode} settings={settings} onUpdateSettings={setSettings} />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className={`mt-16 py-6 text-center text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            <p>Powered by Jenkins, Spring Boot & React</p>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
