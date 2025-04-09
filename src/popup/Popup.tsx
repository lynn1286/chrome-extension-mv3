import React, { useEffect, useState } from 'react';

type Settings = {
  enabled: boolean;
  theme: 'light' | 'dark';
};

const Popup: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    enabled: true,
    theme: 'light',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取设置
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (response) => {
      if (response) {
        setSettings(response);
      }
      setLoading(false);
    });
  }, []);

  const handleToggleEnabled = () => {
    const newSettings = { ...settings, enabled: !settings.enabled };
    updateSettings(newSettings);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    const newSettings = { ...settings, theme };
    updateSettings(newSettings);
  };

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    chrome.runtime.sendMessage({
      type: 'UPDATE_SETTINGS',
      data: newSettings,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`w-80 p-4 ${
        settings.theme === 'dark'
          ? 'bg-gray-800 text-white'
          : 'bg-white text-gray-800'
      }`}
    >
      <header className="mb-4">
        <h1 className="text-xl font-bold">我的Chrome扩展</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          使用TypeScript和TailwindCSS构建
        </p>
      </header>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>启用扩展</span>
          <button
            onClick={handleToggleEnabled}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${settings.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`}
            aria-label={settings.enabled ? '禁用扩展' : '启用扩展'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.enabled ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>

        <div>
          <span className="mb-2 block">主题</span>
          <div className="flex space-x-2">
            <button
              onClick={() => handleThemeChange('light')}
              className={`rounded-md px-3 py-2 ${
                settings.theme === 'light'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
              }`}
              aria-label="切换到浅色主题"
            >
              浅色
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`rounded-md px-3 py-2 ${
                settings.theme === 'dark'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
              }`}
              aria-label="切换到深色主题"
            >
              深色
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            chrome.tabs.create({ url: 'https://github.com' });
          }}
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          aria-label="访问GitHub"
        >
          访问项目主页
        </button>
      </div>
    </div>
  );
};

export default Popup;
