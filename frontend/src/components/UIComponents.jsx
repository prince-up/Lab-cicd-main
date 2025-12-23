export const LoadingSkeleton = ({ darkMode }) => {
  return (
    <div className={`border rounded-xl p-5 animate-pulse ${
      darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-100 border-gray-200'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`w-10 h-10 rounded-full ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`}></div>
        <div className="flex-1 space-y-3">
          <div className={`h-6 rounded w-1/3 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-4 rounded w-2/3 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
          <div className={`h-4 rounded w-1/2 ${
            darkMode ? 'bg-gray-700' : 'bg-gray-300'
          }`}></div>
        </div>
      </div>
    </div>
  );
};

export const EmptyState = ({ darkMode, icon, title, description, action }) => {
  return (
    <div className={`rounded-xl p-12 border-2 border-dashed text-center ${
      darkMode 
        ? 'border-gray-700 bg-gray-800/30' 
        : 'border-gray-300 bg-gray-50'
    }`}>
      <div className="text-6xl mb-4 animate-bounce">{icon || '📦'}</div>
      <h3 className={`text-2xl font-bold mb-2 ${
        darkMode ? 'text-white' : 'text-gray-900'
      }`}>
        {title || 'No Data Available'}
      </h3>
      <p className={`text-lg mb-6 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {description || 'Get started by creating your first build'}
      </p>
      {action}
    </div>
  );
};

export default { LoadingSkeleton, EmptyState };
