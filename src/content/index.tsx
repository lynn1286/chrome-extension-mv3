import clsx from 'clsx';
import React from 'react';
import ReactDOM from 'react-dom/client';

import '../index.css';

console.log('内容脚本已加载');

// 创建一个注入到页面的元素
const injectElement = () => {
  const app = document.createElement('div');
  app.id = 'crx-app';
  document.body.appendChild(app);

  // 获取设置
  chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (settings) => {
    if (!settings?.enabled) return;

    // 创建React应用
    const root = ReactDOM.createRoot(app);
    root.render(<ContentApp theme={settings.theme || 'light'} />);
  });
};

// 内容脚本的React组件
const ContentApp: React.FC<{ theme: string }> = ({ theme }) => {
  const [visible, setVisible] = React.useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 z-50 rounded-lg p-4 shadow-lg',
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">我的扩展</h2>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={handleClose}
          aria-label="关闭"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <p>这是一个内容脚本示例</p>
    </div>
  );
};

// 当页面完全加载后执行注入
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectElement);
} else {
  injectElement();
}
