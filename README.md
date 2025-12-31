Gentle Life OS 🌿

一個不追求完美，只追求「溫柔陪伴」的生活整合系統。

關於這個專案 (About)

Gentle Life OS 不是另一個讓你焦慮的待辦清單 (To-do List)。
這是一個結合 「情緒追蹤 × 微習慣養成 × 生活美學」 的個人化系統，設計給需要一點溫柔提醒、希望在忙碌生活中找回自己的人。

核心特色 (Core Features)

☀️ Morning Check-in：每天一秒鐘的情緒點選，無壓力的自我覺察。

💧 Gentle Habits：喝水、呼吸、運動。沒有失敗懲罰，只有完成的慶祝。

✨ Daily Whispers：每日一句溫柔提醒，取代冷冰冰的系統通知。

👗 Outfit Log：結合穿搭與心情紀錄，將生活變成一本雜誌。

技術棧 (Tech Stack)

本專案使用現代前端技術構建，輕量且易於維護：

React (Hooks, Functional Components)

Tailwind CSS (Styling, Design System)

Lucide React (Beautiful, consistent icons)

快速開始 (Getting Started)

如果你想在本地端運行這個專案，請跟隨以下步驟：

1. 建立專案環境

我們推薦使用 Vite 來快速啟動：

npm create vite@latest gentle-life-os -- --template react
cd gentle-life-os
npm install


2. 安裝依賴套件

安裝此專案需要的 Icons 與樣式工具：

# 安裝 Icons
npm install lucide-react

# 安裝 Tailwind CSS (若尚未設定)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p


3. 設定 Tailwind CSS

確保你的 tailwind.config.js 包含所有文件路徑：

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}


4. 貼上程式碼

將本專案提供的 App.jsx 內容複製並覆蓋你專案中的 src/App.jsx。

5. 啟動！

npm run dev


未來規劃 (Roadmap)

[ ] 資料持久化：整合 Firebase 或 LocalStorage 保存日記與習慣。

[ ] 情緒分析圖表：將心情數據轉化為溫柔的曲線圖。

[ ] 深色模式 (Dark Mode)：適合深夜反思的深藍色主題。

授權 (License)

MIT License. 歡迎自由修改與分享，保持溫柔。
