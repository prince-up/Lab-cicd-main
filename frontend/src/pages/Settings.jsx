import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ darkMode, settings, onUpdateSettings }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-400 hover:text-blue-300 mb-4 flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
          <h1 className={`text-4xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            ⚙️ Settings
          </h1>
          <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Configure your CI/CD Manager preferences
          </p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Jenkins Configuration */}
          <div className={`rounded-xl p-6 border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Jenkins Configuration
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Jenkins URL
                </label>
                <input
                  type="url"
                  name="jenkinsUrl"
                  value={formData.jenkinsUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="http://localhost:8082"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Backend API URL
                </label>
                <input
                  type="url"
                  name="apiUrl"
                  value={formData.apiUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="http://localhost:5000"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Polling Interval (ms)
                </label>
                <input
                  type="number"
                  name="pollingInterval"
                  value={formData.pollingInterval}
                  onChange={handleChange}
                  min="1000"
                  step="1000"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <p className={`mt-1 text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-600'
                }`}>
                  How often to check build status (default: 5000ms)
                </p>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className={`rounded-xl p-6 border ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ⌨️ Keyboard Shortcuts
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  New Build
                </span>
                <kbd className={`px-3 py-1 rounded font-mono text-sm ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  Ctrl + N
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Dashboard
                </span>
                <kbd className={`px-3 py-1 rounded font-mono text-sm ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  Ctrl + D
                </kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Settings
                </span>
                <kbd className={`px-3 py-1 rounded font-mono text-sm ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}>
                  Ctrl + ,
                </kbd>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
            >
              💾 Save Settings
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
          </div>

          {/* Success Message */}
          {saved && (
            <div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg text-green-400 text-center animate-pulse">
              ✓ Settings saved successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
