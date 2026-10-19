import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  Zap, 
  Award, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Send, 
  Radio, 
  HardDrive, 
  Lock, 
  TrendingUp, 
  ChevronRight,
  Sparkles,
  Users,
  Smartphone,
  Download,
  KeyRound
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface HeroProps {
  phone: string;
  searchQuery: string;
  onSearchChange: (term: string) => void;
  onSelectCategory: (cat: ServiceCategory) => void;
  onOpenOrderModal: () => void;
  lang: Language;
  onOpenDownloadModal?: () => void;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  phone,
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onOpenOrderModal,
  lang,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const servicesEl = document.getElementById('services-section');
    if (servicesEl) {
      servicesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickTags = isAr ? [
    { label: 'فك شفرات الشبكات', cat: 'unlocking' as ServiceCategory },
    { label: 'فك أقفال الشاشة وFRP', cat: 'screen_locks' as ServiceCategory },
    { label: 'استرجاع صور وملفات محذوفة', cat: 'data_recovery' as ServiceCategory },
    { label: 'استرداد حسابات واتساب وفيسبوك', cat: 'account_recovery' as ServiceCategory },
    { label: 'حملات تسويق ممولة', cat: 'marketing' as ServiceCategory },
  ] : [
    { label: 'Carrier Network Unlocking', cat: 'unlocking' as ServiceCategory },
    { label: 'Screen & FRP Bypass', cat: 'screen_locks' as ServiceCategory },
    { label: 'Deleted Data & Photo Recovery', cat: 'data_recovery' as ServiceCategory },
    { label: 'Account Restoration', cat: 'account_recovery' as ServiceCategory },
    { label: 'Digital Ads & Marketing', cat: 'marketing' as ServiceCategory },
  ];

  const stats = [
    { value: '+9,850', label: t.stat1 },
    { value: '99.4%', label: t.stat2 },
    { value: '24/7', label: t.stat3 },
    { value: '100%', label: t.stat4 },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-28">
      
      {/* Ambient background glow effects - scoped with overflow-hidden */}
      <div className="absolute top-1/4 -right-24 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] sm:w-[600px] lg:w-[700px] h-[250px] sm:h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Left/Right Text Column */}
          <div className={`lg:col-span-7 space-y-5 sm:space-y-6 ${isAr ? 'text-right' : 'text-left'}`}>
            
            {/* Top Verified Chip */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold shadow-lg shadow-cyan-950/40">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="truncate">{t.heroBadge}</span>
              <span className="text-slate-600 hidden xs:inline">•</span>
              <span className="text-slate-400 font-mono hidden xs:inline" dir="ltr">{phone}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.15]">
              {t.heroTitlePrefix}{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                {t.heroTitleHighlight}
              </span>{' '}
              {t.heroTitleSuffix}
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {t.heroDesc}
            </p>

            {/* Interactive Search Bar for all services */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-2xl w-full">
              <div className="relative flex items-center shadow-2xl shadow-cyan-950/40 rounded-2xl overflow-hidden border border-cyan-800/60 focus-within:border-cyan-400 bg-slate-900/90 transition">
                <div className={`absolute ${isAr ? 'right-3.5' : 'left-3.5'} text-slate-400 pointer-events-none`}>
                  <Search className="w-5 h-5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full py-3.5 sm:py-4 bg-transparent text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none ${
                    isAr ? 'pr-11 pl-24 sm:pl-28' : 'pl-11 pr-24 sm:pr-28'
                  }`}
                />
                <button
                  type="submit"
                  className={`absolute ${
                    isAr ? 'left-1.5' : 'right-1.5'
                  } px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-md`}
                >
                  {t.searchBtn}
                </button>
              </div>
            </form>

            {/* Quick Filter Tags */}
            <div className="space-y-2 pt-1">
              <div className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.popularQuickSearch}:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickTags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCategory(tag.cat);
                      const el = document.getElementById('services-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-[11px] sm:text-xs font-semibold border border-slate-800 hover:border-cyan-500/40 transition cursor-pointer"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons - Mobile friendly full width stacking & desktop inline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-2">
              
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/967${phone}?text=${encodeURIComponent(isAr ? 'السلام عليكم مركز رقيب، أود الاستفسار وطلب إحدى خدمات البرمجة أو التسويق' : 'Hello Raqeeb Tech, I would like to inquire about your programming and marketing services.')}`}
                target="_blank"
                rel="noreferrer"
                id="hero-whatsapp-btn"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950/40 hover:shadow-emerald-900/60 transition active:scale-95 cursor-pointer min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>{t.whatsappOrderNow}</span>
              </a>

              {/* Direct Call CTA */}
              <a
                href={`tel:${phone}`}
                id="hero-phone-btn"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-cyan-800/80 text-cyan-300 font-bold text-sm transition active:scale-95 cursor-pointer min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{t.directCallWithNum}</span>
                <span dir="ltr" className="font-mono text-xs font-extrabold text-white">({phone})</span>
              </a>

              {/* Custom Order Request Button */}
              <button
                onClick={onOpenOrderModal}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-bold text-xs sm:text-sm transition cursor-pointer min-h-[48px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{t.requestCustomOrder}</span>
              </button>
            </div>

            {/* Official Android App APK v2.2 Access Card & 4-Digit PIN Button */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-download-app-btn"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600/90 to-teal-700/90 hover:from-emerald-500 hover:to-teal-600 border border-emerald-500/50 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-950/50 transition cursor-pointer group"
              >
                <Smartphone className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition" />
                <span>{isAr ? 'حمّل تطبيق رقيب للأندرويد' : 'Download Raqeeb Android App'}</span>
                <span className="text-[10px] bg-emerald-950/90 text-emerald-200 border border-emerald-600/60 px-2 py-0.5 rounded-md font-mono font-bold">
                  v2.2 APK
                </span>
                <Download className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* 4-Digit PIN entry button */}
              {onOpenPinModal && (
                <button
                  onClick={onOpenPinModal}
                  id="hero-pin-activation-btn"
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer ${
                    isAppUnlocked
                      ? 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300 hover:bg-emerald-900'
                      : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 hover:border-cyan-400'
                  }`}
                  title={isAr ? 'إدخال رمز التفعيل المكون من 4 أرقام' : 'Enter 4-Digit Activation PIN'}
                >
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>{isAppUnlocked ? (isAr ? 'التطبيق مفعل برمز PIN ✅' : 'App Active (PIN) ✅') : (isAr ? 'أدخل كود التفعيل (4 أرقام) 🔑' : 'Enter 4-Digit PIN 🔑')}</span>
                </button>
              )}

              {onOpenDownloadModal && (
                <button
                  onClick={onOpenDownloadModal}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer font-bold"
                >
                  {isAr ? 'خطوات التثبيت والباركود' : 'Install Guide & QR'}
                </button>
              )}
            </div>

          </div>

          {/* Hero Visual Card / Tech Showcase - Responsive on mobile & desktop */}
          <div className="lg:col-span-5 w-full max-w-lg mx-auto lg:max-w-none">
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-cyan-500/30 via-slate-800 to-indigo-600/30 shadow-2xl shadow-cyan-950/60">
              
              <div className="relative rounded-[22px] bg-slate-900/95 border border-slate-800 p-5 sm:p-6 space-y-5 backdrop-blur-xl">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 mr-2">RAQEEB-SECURE-TERMINAL</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 text-[10px] font-bold">
                    ONLINE 24/7
                  </span>
                </div>

                {/* Hero Feature Graphic / Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-video w-full bg-slate-950 border border-slate-800 group">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                    alt="Raqeeb Tech Lab"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className={`absolute bottom-3 ${isAr ? 'right-3' : 'left-3'} left-3 text-right`}>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md text-cyan-300 text-xs font-bold border border-cyan-500/30">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{isAr ? 'مختبر رقيب الهندسي المتطور' : 'Raqeeb Advanced Engineering Lab'}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Pills Matrix */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold">
                      <Radio className="w-3.5 h-3.5" />
                      <span>{isAr ? 'فك شفرات فورية' : 'Instant Unlocking'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'سيرفرات رسمية بدون روت' : 'Official Servers, No Root'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تخطي حماية FRP' : 'FRP Bypass'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'كافة موديلات الأندرويد والآيفون' : 'All Android & iOS Models'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>{isAr ? 'استرجاع البيانات' : 'Data Recovery'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'ذواكر محروقة وفورمات' : 'Formatted & Corrupted Storage'}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{isAr ? 'تسويق رقمي وإعلانات' : 'Digital Ads & Growth'}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isAr ? 'حملات ممولة واستهداف ذكي' : 'Paid Targeted Campaigns'}
                    </div>
                  </div>
                </div>

                {/* Instant Live Status */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-semibold">{isAr ? 'فريق المهندسين متاح حالياً لاستقبال الأجهزة' : 'Engineers team is online now'}</span>
                  </div>
                  <a
                    href={`https://wa.me/967${phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold underline text-cyan-300 hover:text-white"
                  >
                    {isAr ? 'تواصل الآن' : 'Connect'}
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Counters & Credibility Metrics Ribbon */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-cyan-500/40 transition group shadow-sm"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-black font-mono text-cyan-400 group-hover:scale-105 transition duration-200">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
