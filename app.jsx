/**
 * Gentle Life OS
 * * 一個專注於「溫柔陪伴」與「自我照顧」的生活整合 App。
 * * Tech Stack: React, Tailwind CSS
 * Dependencies: lucide-react
 * * @author [Your Name/Handle]
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, Sun, Cloud, Moon, Droplets, Camera, Sparkles, 
  Coffee, Smile, Wind, Check 
} from 'lucide-react';

// --- Constants & Data ---

// 模擬 GENAE 風格的溫柔提醒語錄
const GENTLE_REMINDERS = [
  "親愛的，今天不需要完美，只需要是你自己。",
  "慢慢來，時間會給你答案。",
  "記得深呼吸，你的感受很重要。",
  "今天的你，像花一樣自在綻放。",
  "不管天氣如何，把陽光帶在心裡。",
  "休息不是偷懶，是為了走更長遠的路。",
  "你的存在本身就是一種美好。",
];

// 心情主題配色 (Tailwind classes)
const MOOD_THEMES = {
  happy:   { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', icon: <Sun size={28} /> },
  calm:    { bg: 'bg-emerald-100', text: 'text-emerald-600', border: 'border-emerald-200', icon: <Coffee size={28} /> },
  anxious: { bg: 'bg-stone-200',  text: 'text-stone-600',  border: 'border-stone-300',   icon: <Wind size={28} /> },
  tired:   { bg: 'bg-slate-200',  text: 'text-slate-600',  border: 'border-slate-300',   icon: <Moon size={28} /> },
  sad:     { bg: 'bg-blue-100',   text: 'text-blue-600',   border: 'border-blue-200',    icon: <Cloud size={28} /> },
};

// 初始習慣設定
const INITIAL_HABITS = [
  { id: 'water',    icon: <Droplets size={18} />, label: '喝水保濕', completed: false, count: 0, target: 8 },
  { id: 'move',     icon: <Wind size={18} />,     label: '輕量運動', completed: false },
  { id: 'meditate', icon: <Coffee size={18} />,   label: '靜心呼吸', completed: false },
];

// --- Sub-Components ---

const MoodIcon = ({ type, label, onClick, isSelected }) => {
  const theme = MOOD_THEMES[type];
  
  return (
    <button 
      onClick={() => onClick(type)}
      className={`
        flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300
        ${isSelected 
          ? 'scale-110 ring-2 ring-stone-400 bg-white shadow-md' 
          : 'hover:bg-white/50'
        }
      `}
    >
      <div className={`mb-2 transition-colors ${isSelected ? 'text-stone-800' : 'text-stone-500'}`}>
        {theme.icon}
      </div>
      <span className="text-xs text-stone-600 font-medium tracking-wide">{label}</span>
    </button>
  );
};

// --- Main Application ---

const GentleLifeOS = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mood, setMood] = useState(null);
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [journalEntry, setJournalEntry] = useState('');
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [outfitLog, setOutfitLog] = useState(null);
  const [todayQuote, setTodayQuote] = useState('');

  // 初始化：隨機選取一句語錄
  useEffect(() => {
    setTodayQuote(GENTLE_REMINDERS[Math.floor(Math.random() * GENTLE_REMINDERS.length)]);
  }, []);

  const handleHabitClick = (id) => {
    setHabits(prevHabits => prevHabits.map(habit => {
      if (habit.id !== id) return habit;

      // 特殊邏輯：喝水需要計數
      if (habit.id === 'water') {
         const newCount = habit.count + 1;
         // 如果超過目標就不再增加視覺上的負擔，但邏輯上還是完成
         return { ...habit, count: newCount, completed: newCount >= habit.target };
      }
      // 一般開關型習慣
      return { ...habit, completed: !habit.completed };
    }));
  };

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    // 給予一點延遲讓使用者看到選取效果
    setTimeout(() => setShowMoodSelector(false), 600);
  };

  // 渲染：早安簽到頁面 (Morning Check-in)
  if (showMoodSelector && !mood) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* 背景裝飾光暈 */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-rose-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 bg-stone-100 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="z-10 text-center max-w-md w-full animate-fade-in">
          <span className="inline-block px-3 py-1 bg-white/80 rounded-full text-stone-500 text-xs mb-6 tracking-widest uppercase shadow-sm border border-stone-100">
            Morning Check-in
          </span>
          <h1 className="text-3xl font-serif text-stone-800 mb-2">早安。</h1>
          <p className="text-stone-500 mb-12 font-light">現在的感覺如何？誠實面對自己就好。</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <MoodIcon type="happy"   label="充滿活力" onClick={handleMoodSelect} />
            <MoodIcon type="calm"    label="平靜自在" onClick={handleMoodSelect} />
            <MoodIcon type="anxious" label="有點焦慮" onClick={handleMoodSelect} />
            <MoodIcon type="tired"   label="疲憊"     onClick={handleMoodSelect} />
            <MoodIcon type="sad"     label="低落"     onClick={handleMoodSelect} />
            <MoodIcon type="calm"    label="還可以"   onClick={(t) => handleMoodSelect(t)} /> {/* 使用 calm 作為 fallback */}
          </div>
        </div>
      </div>
    );
  }

  // 渲染：主儀表板 (Main Dashboard)
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-rose-100 pb-24">
      
      {/* 頂部導航與狀態列 */}
      <header className="px-6 pt-12 pb-4 flex justify-between items-center bg-gradient-to-b from-[#FDFBF7] to-[#FDFBF7]/90 sticky top-0 z-20 backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-serif font-medium text-stone-800">Hello, Dear</h2>
          <p className="text-xs text-stone-500 tracking-wide uppercase">
            {new Date().toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>
        <div 
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500
            ${mood ? MOOD_THEMES[mood].bg : 'bg-stone-100'}
            ${mood ? MOOD_THEMES[mood].text : 'text-stone-400'}
          `}
        >
          {mood ? (
             // 縮小 icon 以適應頂部欄
             React.cloneElement(MOOD_THEMES[mood].icon, { size: 20 })
          ) : <Smile size={20} />}
        </div>
      </header>

      <main className="px-6 space-y-8 animate-fade-in">
        
        {/* 區塊 1: 今日溫柔提醒 */}
        <section className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] border border-stone-100/50">
          <div className="flex items-start gap-3">
            <Sparkles className="text-amber-300 shrink-0 mt-1" size={20} />
            <div>
              <p className="text-stone-600 font-medium leading-relaxed italic font-serif">
                "{todayQuote}"
              </p>
            </div>
          </div>
        </section>

        {/* 區塊 2: 身體照顧 (Self Care) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-medium text-stone-700">Self Care</h3>
            <span className="text-xs text-stone-400 bg-white px-2 py-1 rounded-full border border-stone-100">
              不求完美，有做就很棒
            </span>
          </div>
          
          <div className="grid gap-3">
            {habits.map((habit) => (
              <div 
                key={habit.id}
                onClick={() => handleHabitClick(habit.id)}
                className={`
                  p-4 rounded-2xl flex items-center justify-between transition-all duration-300 cursor-pointer border
                  ${habit.completed 
                    ? 'bg-stone-800 text-white border-stone-800 shadow-lg shadow-stone-200 transform scale-[1.02]' 
                    : 'bg-white text-stone-600 border-stone-100 hover:border-stone-200'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${habit.completed ? 'bg-white/20' : 'bg-stone-50'}`}>
                    {habit.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{habit.label}</h4>
                    {habit.id === 'water' && (
                       <p className={`text-xs mt-0.5 ${habit.completed ? 'text-stone-300' : 'text-stone-400'}`}>
                         已喝 {habit.count} 杯 / 目標 {habit.target}
                       </p>
                    )}
                  </div>
                </div>
                <div 
                  className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                    ${habit.completed ? 'border-white bg-white text-stone-800' : 'border-stone-200'}
                  `}
                >
                  {habit.completed && <Check size={14} strokeWidth={3} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 區塊 3: 穿搭紀錄 (OOTD) */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-medium text-stone-700">Today's Vibe</h3>
            <span className="text-xs text-stone-400">穿搭 × 心情</span>
          </div>
          
          {!outfitLog ? (
            <button 
              onClick={() => setOutfitLog({ time: new Date().toLocaleTimeString(), tags: ['舒適', '米色系'] })}
              className="w-full aspect-[4/3] bg-stone-100 rounded-[2rem] border-2 border-dashed border-stone-200 flex flex-col items-center justify-center gap-3 text-stone-400 hover:bg-stone-50 hover:border-stone-300 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <Camera size={20} className="text-stone-400" />
              </div>
              <span className="text-sm font-medium">記錄今天的穿搭</span>
            </button>
          ) : (
             <div className="w-full aspect-[4/3] bg-white p-4 rounded-[2rem] shadow-sm border border-stone-100 relative overflow-hidden group">
                {/* 模擬照片區域 */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-stone-100 flex items-center justify-center">
                   <span className="text-stone-300 font-serif italic text-2xl">OOTD Photo</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl flex justify-between items-center shadow-sm">
                   <div className="flex gap-2">
                      {outfitLog.tags.map(tag => (
                        <span key={tag} className="text-xs bg-stone-100 px-2 py-1 rounded-md text-stone-600">#{tag}</span>
                      ))}
                   </div>
                   <Heart size={16} className="text-rose-400 fill-rose-400" />
                </div>
             </div>
          )}
        </section>

        {/* 區塊 4: 一行日記 (One Line Journal) */}
        <section>
           <h3 className="text-lg font-medium text-stone-700 mb-4">One Line Journal</h3>
           <div className="bg-white rounded-[2rem] p-1 shadow-sm border border-stone-100 group focus-within:ring-2 focus-within:ring-stone-200 transition-all">
             <textarea 
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder="今天發生了什麼小事..."
                className="w-full h-32 p-5 rounded-[1.8rem] resize-none focus:outline-none focus:bg-stone-50 transition-colors text-stone-600 placeholder:text-stone-300 leading-relaxed"
             ></textarea>
             <div className="flex justify-end p-2">
                <button 
                  className="bg-stone-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-stone-700 active:scale-95 transition-all disabled:opacity-50"
                  disabled={!journalEntry.trim()}
                >
                  紀錄
                </button>
             </div>
           </div>
        </section>
      </main>

      {/* 底部導航欄 */}
      <nav className="fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 p-2 flex justify-between items-center z-50 max-w-md mx-auto">
        {[
          { id: 'home', icon: <Sun size={20} /> },
          { id: 'calendar', icon: <Check size={20} /> },
          { id: 'stats', icon: <Heart size={20} /> },
          { id: 'profile', icon: <Sparkles size={20} /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              p-3 rounded-full transition-all duration-300
              ${activeTab === tab.id 
                ? 'bg-stone-800 text-white shadow-md transform -translate-y-1' 
                : 'text-stone-400 hover:text-stone-600'
              }
            `}
          >
            {tab.icon}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default GentleLifeOS;
