import React, { useState, useEffect } from 'react';
import { generateItinerary } from './services/geminiService';
import { Itinerary } from './types';
import DaySection from './components/DaySection';
import { Plane, Map as MapIcon, Loader2, Sparkles, Navigation } from 'lucide-react';

const App: React.FC = () => {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState<boolean>(false);

  // Auto-load the request on "Plan My Trip" click
  const handlePlanTrip = async () => {
    setStarted(true);
    setLoading(true);
    setError(null);
    try {
      // Specifically target Japan Fukuoka for 5 days
      const result = await generateItinerary("日本福岡 (Fukuoka)", 5);
      setItinerary(result);
    } catch (err) {
      console.error(err);
      setError("無法生成行程。請檢查您的 API 金鑰或重試。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Section */}
      {!started ? (
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Image Placeholder using Picsum with a seed for consistency */}
          <div className="absolute inset-0 z-0">
             <img 
               src="https://picsum.photos/seed/fukuoka/1920/1080" 
               alt="Japan Vibe" 
               className="w-full h-full object-cover opacity-90 grayscale-[20%]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/30"></div>
          </div>

          <div className="z-10 text-center px-4 max-w-3xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/50 backdrop-blur-md text-indigo-100 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>AI 智慧旅遊規劃</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              探索 <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-indigo-400">日本福岡</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              體驗博多拉麵文化、太宰府古老神社與現代都市的完美融合。準備好您的 5 天冒險了嗎？
            </p>
            <button
              onClick={handlePlanTrip}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 shadow-xl shadow-indigo-900/20"
            >
              <Plane className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
              生成五日行程表
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-12 min-h-screen">
          
          {/* Header (Sticky) */}
          <header className="flex items-center justify-between mb-12 sticky top-4 z-40 bg-white/80 backdrop-blur-lg p-4 rounded-2xl shadow-sm border border-gray-100">
             <div className="flex items-center gap-3">
               <div className="bg-indigo-600 p-2 rounded-lg text-white">
                 <Navigation className="w-6 h-6" />
               </div>
               <div>
                 <h2 className="text-xl font-bold text-slate-900">福岡探索之旅</h2>
                 <p className="text-xs text-slate-500">5 天 • 4 夜</p>
               </div>
             </div>
             <button onClick={() => setStarted(false)} className="text-sm text-slate-500 hover:text-indigo-600 font-medium">
               重置
             </button>
          </header>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mb-6" />
              <h3 className="text-2xl font-semibold text-slate-700">正在規劃您的完美旅程...</h3>
              <p className="text-slate-500 mt-2">正在搜尋最佳的拉麵店與觀光景點。</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <button 
                onClick={handlePlanTrip}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                重試
              </button>
            </div>
          )}

          {/* Itinerary Display */}
          {itinerary && !loading && (
            <div className="animate-fade-in space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-indigo-100 text-center mb-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{itinerary.tripTitle}</h2>
                <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                  {itinerary.overview}
                </p>
              </div>

              <div className="grid gap-8">
                {itinerary.days.map((day) => (
                  <DaySection key={day.dayNumber} day={day} />
                ))}
              </div>

              <footer className="text-center pt-12 pb-6 text-slate-400 text-sm">
                <p>AI 協助設計 • 旅途愉快！</p>
              </footer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;