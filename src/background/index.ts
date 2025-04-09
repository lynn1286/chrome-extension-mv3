// 背景脚本 - 在扩展的生命周期内持续运行
console.log('背景脚本已加载');

// 监听扩展安装事件
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('扩展已安装');

    // 初始化存储数据
    chrome.storage.local.set({
      settings: {
        enabled: true,
        theme: 'light',
      },
    });
  }
});

// 监听来自弹出窗口或内容脚本的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('收到消息:', message);

  if (message.type === 'GET_SETTINGS') {
    chrome.storage.local.get('settings', (data) => {
      sendResponse(data.settings || {});
    });
    return true; // 异步响应需要返回 true
  }

  if (message.type === 'UPDATE_SETTINGS') {
    chrome.storage.local.set({ settings: message.data }, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

export {};
