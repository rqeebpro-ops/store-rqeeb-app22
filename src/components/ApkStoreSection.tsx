import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Gamepad2, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Search, 
  Layers, 
  ExternalLink,
  Flame,
  KeyRound
} from 'lucide-react';
import { ApkItem, Language, ApkCategory } from '../types';
import { getStoredApks, incrementApkDownloads } from '../utils/adminStorage';

interface ApkStoreSectionProps {
  lang: Language;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const ApkStoreSection: React.FC<ApkStoreSectionProps> = ({
  lang,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const isAr = lang === 'ar';
  
  const [apks, setApks] = useState<ApkItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'apps' | 'games' | 'tools'>('all');
  const [search, setSearch] = useState('');

  const loadApks = () => {
    setApks(getStoredApks());
  };

  useEffect(() => {
    loadApks();
    // Listen for custom event or storage changes
    const handleStorageChange = () => loadApks();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDownloadClick = (item: ApkItem) => {
    incrementApkDownloads(item.id);
    loadApks();
  };

  const filteredApks = apks.filter(apk => {
    const matchesFilter = activeFilter === 'all' || apk.category === activeFilter;
    if (!search.trim()) return matchesFilter;
    const q = search.toLowerCase();
    return matchesFilter && (
      apk.title.toLowerCase().includes(q) ||
      apk.description.toLowerCase().includes(q) ||
      apk.categoryName.toLowerCase().includes(q)
    );
  });

  return (
    <section id="apk-store-section" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden border-t border-slate-800">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 bg-cyan-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" dir={isAr ? 'rtl' : 'ltr'}>
        
        {/* Section Header */}
        <div className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/40">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span>{isAr ? 'متجر تطبيقات وألعاب رقيب APK للأندرويد' : 'Raqeeb Android APK & Games Store'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            {isAr ? 'حمّل أحدث تطبيقات وألعاب الأندرويد بروابط مباشرة' : 'Download Android Apps & Games with Direct Links'}
          </h2>

          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            {isAr 
              ? 'تطبيقات فك الشفرات، أدوات الصيانة واسترداد الملفات، بالإضافة لألعاب الأندرويد الحصرية والمفحوصة أمنياً بنسبة 100%.' 
              : 'Download carrier unlocking tools, data recovery utilities, and exclusive tested Android games safely.'}
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 bg-slate-900/80 p-3 sm:p-4 rounded-3xl border border-slate-800 backdrop-blur-md">
          
          {/* Categories */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {isAr ? 'جميع الملفات' : 'All APKs'} ({apks.length})
            </button>

            <button
              onClick={() => setActiveFilter('apps')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'apps'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isAr ? 'التطبيقات' : 'Apps'}</span>
            </button>

            <button
              onClick={() => setActiveFilter('games')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'games'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'الألعاب (APK Games)' : 'Games'}</span>
            </button>

            <button
              onClick={() => setActiveFilter('tools')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                activeFilter === 'tools'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isAr ? 'أدوات الصيانة' : 'Tools'}</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isAr ? 'ابحث عن تطبيق أو لعبة...' : 'Search apps or games...'}
              className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-400 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 pr-10"
            />
            <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-3" />
          </div>

        </div>

        {/* APK Cards Grid */}
        {filteredApks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApks.map(apk => (
              <div 
                key={apk.id}
                className="group relative bg-slate-900/90 hover:bg-slate-900 rounded-3xl border border-slate-800 hover:border-cyan-500/50 p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-cyan-950/40"
              >
                <div className="space-y-4">
                  
                  {/* Top Bar: Icon + Title + Version Badge */}
                  <div className="flex items-start gap-4">
                    <img 
                      src={apk.icon} 
                      alt={apk.title} 
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-700 bg-slate-800 shadow-lg group-hover:scale-105 transition shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                          {apk.categoryName}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                          {apk.version}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition line-clamp-1">
                        {apk.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                        <span>📦 {apk.size}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 text-amber-400">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{apk.rating}</span>
                        </span>
                        <span>•</span>
                        <span>⬇️ {apk.downloadsCount.toLocaleString()} {isAr ? 'تحميل' : 'dl'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {apk.description}
                  </p>

                  {/* Key Features Pill List */}
                  {apk.features && apk.features.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {apk.features.slice(0, 3).map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* Bottom Download & Info Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? 'آمن ومفحوص 100%' : '100% Safe APK'}</span>
                  </div>

                  <a
                    href={apk.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => handleDownloadClick(apk)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-500/25 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isAr ? 'تحميل APK' : 'Download APK'}</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 p-8 max-w-md mx-auto space-y-3">
            <Smartphone className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-sm font-bold text-white">{isAr ? 'لم يتم العثور على نتائج' : 'No APKs found'}</h4>
            <p className="text-xs text-slate-400">{isAr ? 'جرب البحث بكلمات أخرى أو اختر تصنيفاً مختلفاً' : 'Try searching for different terms'}</p>
          </div>
        )}

        {/* PIN Activation Notice in Store */}
        {onOpenPinModal && (
          <div className="mt-12 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-right">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950 border border-cyan-600/60 flex items-center justify-center shrink-0">
                <KeyRound className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {isAr ? 'هل تحتاج إلى كود تفعيل (4 أرقام) بعد تثبيت التطبيقات؟' : 'Need 4-digit PIN activation after install?'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isAr ? 'أدخل الرمز السري المصرح لفتح كامل ميزات التطبيق على جهازك' : 'Enter your 4-digit activation code to unlock features'}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenPinModal}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition shrink-0 cursor-pointer ${
                isAppUnlocked
                  ? 'bg-emerald-950 border border-emerald-600 text-emerald-300'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              }`}
            >
              {isAppUnlocked ? (isAr ? 'مفعل ومصرح ✅' : 'Unlocked ✅') : (isAr ? 'إدخال رمز التفعيل (PIN) 🔑' : 'Enter PIN 🔑')}
            </button>
          </div>
        )}

      </div>

    </section>
  );
};
