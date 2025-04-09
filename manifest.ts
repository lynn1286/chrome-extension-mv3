import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';

// 将版本转换为 chrome 扩展格式
const { version } = packageJson;
const [major, minor, patch, label = '0'] = version
  .replace(/[^\d.-]+/g, '')
  .split(/[.-]/);

export default defineManifest({
  manifest_version: 3,
  name: '我的Chrome扩展',
  description: '使用 TypeScript, TailwindCSS 和 Vite 构建的 Chrome 扩展',
  version: `${major}.${minor}.${patch}.${label}`,
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  action: {
    default_popup: 'index.html',
    default_icon: {
      '16': 'src/assets/favicon-16x16.png',
      '32': 'src/assets/favicon-32x32.png',
      '48': 'src/assets/android-chrome-192x192.png',
      '128': 'src/assets/android-chrome-512x512.png',
    },
  },
  icons: {
    '16': 'src/assets/favicon-16x16.png',
    '32': 'src/assets/favicon-32x32.png',
    '48': 'src/assets/android-chrome-192x192.png',
    '128': 'src/assets/android-chrome-512x512.png',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['src/content/index.tsx'],
    },
  ],
  permissions: ['storage', 'activeTab'],
});
