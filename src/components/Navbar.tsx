import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  ShieldCheck, 
  Radio, 
  Lock, 
  UserCheck, 
  HardDrive, 
  Code, 
  TrendingUp, 
  BookOpen, 
  Menu, 
  X, 
  Send, 
  Copy, 
  Check, 
  Layers,
  Globe,
  Download,
  Smartphone,
  KeyRound,
  Gamepad2,
  Settings
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { CATEGORIES_LIST } from '../data/servicesData';
import { CATEGORIES_LIST_EN } from '../data/servicesDataEn';
import { ARTICLES_DATA } from '../data/articlesData';
import { ARTICLES_DATA_EN } from '../data/articlesDataEn';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface NavbarProps {
  activeCategory: ServiceCategory;
  onSelectCategory: (cat: ServiceCategory) => void;
  onSelectArticle: (articleId: string) => void;
  onOpenOrderModal: (serviceTitle?: string) => void;
  phone: string;
  lang: Language;
  onToggleLanguage: () => void;
  onOpenDownloadModal: () => void;
  onOpenPinModal: () => void;
  isAppUnlocked: boolean;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectCategory,
  onSelectArticle,
  onOpenOrderModal,
  phone,
  lang,
  onToggleLanguage,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked,
  onOpenAdminLogin,
  isAdminLoggedIn = false,
  onOpenAdminDashboard
}) => {

  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const categories = isAr ? CATEGORIES_LIST : CATEGORIES_LIST_EN;
  const articles = isAr ? ARTICLES_DATA : ARTICLES_DATA_EN;

  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [articlesDropdownOpen, setArticlesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // 10-clicks secret trigger on the logo
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogoSecretClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextCount = logoClicks + 1;
    setLogoClicks(nextCount);

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setLogoClicks(0);
    }, 4000);

    if (nextCount >= 10) {
      setLogoClicks(0);
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (isAdminLoggedIn && onOpenAdminDashboard) {
        onOpenAdminDashboard();
      } else {
        onOpenAdminLogin();
      }
    }
  };

  const servicesRef = useRef<HTMLDivElement>(null);
  const articlesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (articlesRef.current && !articlesRef.current.contains(event.target as Node)) {
        setArticlesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCategoryIcon = (id: ServiceCategory) => {
    switch (id) {
      case 'unlocking': return <Radio className="w-4 h-4 text-cyan-400" />;
      case 'screen_locks': return <Lock className="w-4 h-4 text-amber-400" />;
      case 'account_recovery': return <UserCheck className="w-4 h-4 text-emerald-400" />;
      case 'data_recovery': return <HardDrive className="w-4 h-4 text-rose-400" />;
      case 'programming': return <Code className="w-4 h-4 text-blue-400" />;
      case 'marketing': return <TrendingUp className="w-4 h-4 text-purple-400" />;
      default: return <Layers className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      
      {/* Top mini contact ribbon - Fully responsive */}
      <div className="bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border-b border-cyan-900/30 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-slate-300">
          
          {/* Guarantee / Title Badge */}
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold truncate">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
              <span className="text-[11px] sm:text-xs truncate">{t.topRibbon}</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-400 text-xs">
              {t.guaranteeShort}
            </span>
          </div>

          {/* Quick Actions in Ribbon */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Android App Download Button in top ribbon */}
            <button
              onClick={onOpenDownloadModal}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-950/80 hover:bg-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-emerald-300 font-bold text-[11px] transition cursor-pointer"
              title={isAr ? 'تحميل تطبيق الأندرويد APK' : 'Download Android App APK'}
            >
              <Smartphone className="w-3 h-3 text-emerald-400" />
              <span>{t.downloadAppBtn}</span>
            </button>

            {/* Language Switcher Button in top ribbon */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 bg-slate-900 hover:bg-slate-800 px-2 sm:px-2.5 py-0.5 rounded-full border border-slate-700 text-cyan-300 font-bold text-[11px] transition cursor-pointer"
              title={isAr ? 'Switch to English' : 'التحويل للغة العربية'}
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{isAr ? 'English 🇬🇧' : 'العربية 🇾🇪'}</span>
            </button>

            {/* Direct Phone ribbon */}
            <div className="flex items-center gap-1.5 bg-cyan-950/60 hover:bg-cyan-900/60 px-2 sm:px-2.5 py-0.5 rounded-full border border-cyan-800/40 text-cyan-300 font-bold transition">
              <Phone className="w-3 h-3 text-cyan-400" />
              <a href={`tel:${phone}`} dir="ltr" className="hover:underline font-mono text-[11px] sm:text-xs">
                {phone}
              </a>
              <button 
                onClick={handleCopyPhone} 
                title={t.copyNumber}
                className="hover:text-white transition p-0.5 cursor-pointer"
                aria-label={t.copyNumber}
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Direct WhatsApp - hidden on ultra-small mobile to prevent ribbon overflow, visible on sm+ */}
            <a 
              href={`https://wa.me/967${phone}`} 
              target="_blank" 
              rel="noreferrer"
              className="hidden xs:flex items-center gap-1 bg-emerald-950/80 hover:bg-emerald-900 px-2 sm:px-2.5 py-0.5 rounded-full border border-emerald-700/50 text-emerald-300 font-bold text-[11px] transition"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{t.whatsapp}</span>
            </a>

            {/* 4-Digit Activation PIN Quick Button */}
            <button
              onClick={onOpenPinModal}
              id="navbar-pin-ribbon-btn"
              className={`flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-full border text-[10px] sm:text-[11px] font-bold transition cursor-pointer ${
                isAppUnlocked
                  ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-700/50 text-emerald-300'
                  : 'bg-cyan-950/80 hover:bg-cyan-900 border-cyan-700/50 text-cyan-300'
              }`}
            >
              <KeyRound className="w-3 h-3 text-cyan-400" />
              <span>{isAppUnlocked ? (isAr ? 'مفعل ✅' : 'Unlocked ✅') : (isAr ? 'كود التفعيل (4 أرقام)' : 'PIN (4 Digits)')}</span>
            </button>

            {/* Quick Admin Access Button if already logged in */}
            {isAdminLoggedIn && onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] shadow-md transition cursor-pointer"
              >
                <Settings className="w-3 h-3 text-slate-950" />
                <span>{isAr ? 'لوحة التحكم ⚙️' : 'Admin'}</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo with 10-Clicks Secret Admin Trigger */}
          <div className="relative flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={handleLogoSecretClick}
              type="button"
              className="flex items-center gap-2.5 sm:gap-3 group text-right cursor-pointer select-none bg-transparent border-none p-0 focus:outline-none"
              title={isAr ? 'اضغط 10 مرات متتالية لفتح لوحة التحكم السرية للمالك' : 'Click 10 times to open secret admin login'}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:scale-110 transition duration-300" />
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-cyan-400 transition truncate">
                    {t.brandName}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                    {t.brandBadge}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium truncate hidden xs:block">
                  {t.brandSub}
                </span>
              </div>
            </button>

            {/* Discreet countdown badge when user taps 4 or more times */}
            {logoClicks >= 4 && (
              <div className="absolute -bottom-8 right-0 z-50 bg-slate-900 border border-cyan-400 text-cyan-300 px-3 py-1 rounded-full text-[10px] font-bold shadow-xl animate-bounce flex items-center gap-1.5 whitespace-nowrap">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>{isAr ? `متبقي ${10 - logoClicks} ضغطات لفتح لوحة التحكم` : `${10 - logoClicks} clicks left for Admin`}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links & Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1">
            <a 
              href="#home" 
              className="px-3 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition"
            >
              {t.home}
            </a>

            {/* APK Apps & Games Store Navigation Link */}
            <a 
              href="#apk-store-section" 
              className="px-3 py-2 text-sm font-bold text-cyan-300 hover:text-cyan-200 rounded-lg hover:bg-cyan-950/40 transition flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'متجر تطبيقات وألعاب APK' : 'APK Store'}</span>
              <span className="text-[9px] bg-cyan-900/90 text-cyan-200 px-1.5 py-0.5 rounded-full font-bold">APK</span>
            </a>

            {/* Dropdown 1: Categories & Services */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => {
                  setServicesDropdownOpen(!servicesDropdownOpen);
                  setArticlesDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition group cursor-pointer"
              >
                <span>{t.serviceCategories}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {servicesDropdownOpen && (
                <div className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-cyan-950/50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 border-b border-slate-800">
                    {t.serviceCategories}
                  </div>
                  <div className="mt-1 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          onSelectCategory(cat.id);
                          setServicesDropdownOpen(false);
                          const el = document.getElementById('services-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800/90 rounded-lg transition group ${isAr ? 'text-right' : 'text-left'}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-md bg-slate-800 group-hover:bg-slate-700 transition">
                            {getCategoryIcon(cat.id)}
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-cyan-300">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown 2: Articles & Guides */}
            <div className="relative" ref={articlesRef}>
              <button
                onClick={() => {
                  setArticlesDropdownOpen(!articlesDropdownOpen);
                  setServicesDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition group cursor-pointer"
              >
                <span>{t.articlesAndGuides}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${articlesDropdownOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>

              {articlesDropdownOpen && (
                <div className={`absolute top-full ${isAr ? 'right-0' : 'left-0'} mt-2 w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-cyan-950/50 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
                  <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
                    <span>{t.articlesTitle}</span>
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <div className="mt-1 space-y-1 max-h-80 overflow-y-auto scrollbar-thin">
                    {articles.map((article) => (
                      <button
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article.id);
                          setArticlesDropdownOpen(false);
                          const el = document.getElementById('articles-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`w-full ${isAr ? 'text-right' : 'text-left'} p-2.5 rounded-lg hover:bg-slate-800/90 transition text-xs group block cursor-pointer`}
                      >
                        <div className="font-bold text-slate-200 group-hover:text-cyan-300 line-clamp-1">
                          {article.title}
                        </div>
                        <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {article.summary}
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500">
                          <span>{article.categoryName}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <a 
              href="#process-section" 
              className="px-3 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition"
            >
              {t.howWeWork}
            </a>

            <a 
              href="#download-app" 
              className="px-3 py-2 text-sm font-bold text-emerald-300 hover:text-emerald-200 rounded-lg hover:bg-emerald-950/40 transition flex items-center gap-1.5"
            >
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'تطبيق الأندرويد' : 'Android App'}</span>
              <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-1.5 py-0.5 rounded-full font-mono">v2.2</span>
            </a>

            <a 
              href="#contact-section" 
              className="px-3 py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-slate-900 transition"
            >
              {t.contactUs}
            </a>
          </nav>

          {/* Desktop Actions & Call buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* 4-Digit Activation PIN Button */}
            <button
              onClick={onOpenPinModal}
              id="header-pin-btn"
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-bold transition shadow-sm cursor-pointer ${
                isAppUnlocked 
                  ? 'bg-emerald-950/70 hover:bg-emerald-900 border-emerald-600/50 text-emerald-300' 
                  : 'bg-slate-900 hover:bg-slate-800 border-cyan-800/60 text-cyan-300 hover:border-cyan-400'
              }`}
              title={isAr ? 'إدخال رمز التفعيل المكون من 4 أرقام لتشغيل التطبيق' : 'Enter 4-Digit Activation PIN'}
            >
              <KeyRound className={`w-4 h-4 ${isAppUnlocked ? 'text-emerald-400' : 'text-cyan-400 animate-pulse'}`} />
              <span>{isAppUnlocked ? (isAr ? 'مفعل برمز PIN ✅' : 'PIN Verified ✅') : (isAr ? 'كود التفعيل (4 أرقام)' : 'Activation PIN')}</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${phone}`}
              id="header-call-btn"
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-sm font-bold transition shadow-sm"
              title={t.callNow}
            >
              <Phone className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span dir="ltr" className="font-mono">{phone}</span>
            </a>

            {/* Instant Order Button */}
            <button
              onClick={() => onOpenOrderModal()}
              id="header-order-btn"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition transform active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.quickOrder}</span>
            </button>
          </div>

          {/* Mobile buttons: Call & Hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:text-cyan-300 flex items-center justify-center cursor-pointer min-h-[44px] min-w-[44px]"
              aria-label={t.callNow}
              title={phone}
            >
              <Phone className="w-5 h-5 text-cyan-400" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isAr ? 'فتح القائمة' : 'Toggle Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Overlay Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] bottom-0 bg-slate-950/98 backdrop-blur-xl border-t border-slate-800 overflow-y-auto p-5 space-y-5 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          
          {/* Quick primary actions in drawer */}
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={`https://wa.me/967${phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.whatsapp}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t.quickOrder}</span>
            </button>
          </div>

          {/* 4-Digit Activation PIN button in mobile menu */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPinModal();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
              isAppUnlocked 
                ? 'bg-emerald-950/70 border-emerald-600/50 text-emerald-300' 
                : 'bg-cyan-950/70 border-cyan-700/50 text-cyan-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>{isAppUnlocked ? (isAr ? 'التطبيق مفعل برمز PIN معتمد' : 'App Active with PIN') : (isAr ? 'أدخل كود التفعيل (4 أرقام) لتشغيل التطبيق' : 'Enter 4-Digit PIN to Unlock App')}</span>
            </div>
            <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded-full border border-slate-700">
              {isAppUnlocked ? '✅' : '🔑'}
            </span>
          </button>

          {/* Android App Download Card in mobile menu */}
          <div className="p-3 bg-emerald-950/60 border border-emerald-800/60 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تطبيق رقيب للأندرويد' : 'Raqeeb Android App'}</span>
              </div>
              <span className="text-[10px] bg-emerald-900/90 text-emerald-200 px-2 py-0.5 rounded-full font-mono font-bold">
                v2.2 APK
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-black text-center shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تحميل APK الآن' : 'Download APK'}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDownloadModal();
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-bold border border-emerald-800/50 hover:bg-slate-800 cursor-pointer"
              >
                {isAr ? 'التفاصيل والباركود' : 'Details'}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 border-t border-slate-800/80 pt-4">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-slate-200 hover:bg-slate-900 rounded-xl transition flex items-center justify-between"
            >
              <span>{t.home}</span>
              <span className="text-cyan-400">›</span>
            </a>

            {/* Mobile APK Apps & Games Store Link */}
            <a
              href="#apk-store-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-cyan-300 hover:bg-cyan-950/60 rounded-xl transition flex items-center justify-between border border-cyan-800/40 bg-cyan-950/20"
            >
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>{isAr ? 'متجر تطبيقات وألعاب APK' : 'APK Apps & Games Store'}</span>
              </div>
              <span className="text-[10px] bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded-full font-bold">APK</span>
            </a>

            {/* Mobile Admin Access Button */}
            {isAdminLoggedIn && onOpenAdminDashboard && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full p-3 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl transition flex items-center justify-between shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span>{isAr ? 'لوحة تحكم النظام الشاملة' : 'Admin Control Panel'}</span>
                </div>
                <span>⚙️</span>
              </button>
            )}

            <a
              href="#services-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-slate-200 hover:bg-slate-900 rounded-xl transition flex items-center justify-between"
            >
              <span>{t.servicesDirectory}</span>
              <span className="text-cyan-400">›</span>
            </a>

            <a
              href="#process-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-slate-200 hover:bg-slate-900 rounded-xl transition flex items-center justify-between"
            >
              <span>{t.howWeWork}</span>
              <span className="text-cyan-400">›</span>
            </a>

            <a
              href="#articles-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-slate-200 hover:bg-slate-900 rounded-xl transition flex items-center justify-between"
            >
              <span>{t.articlesAndGuides}</span>
              <span className="text-cyan-400">›</span>
            </a>

            <a
              href="#contact-section"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 text-sm font-bold text-slate-200 hover:bg-slate-900 rounded-xl transition flex items-center justify-between"
            >
              <span>{t.contactUs}</span>
              <span className="text-cyan-400">›</span>
            </a>
          </div>

          {/* Mobile Categories Quick Grid */}
          <div className="border border-slate-800 rounded-2xl p-4 bg-slate-900/60 space-y-3">
            <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>{t.serviceCategories}:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('services-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`p-2.5 text-xs font-semibold rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 flex items-center justify-between border border-slate-800/80 cursor-pointer ${isAr ? 'text-right' : 'text-left'}`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-cyan-400 font-mono shrink-0 font-bold mr-1">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Tel Card at bottom of drawer */}
          <div className="pt-2 pb-6">
            <a
              href={`tel:${phone}`}
              className="w-full py-3.5 rounded-xl bg-slate-900 border border-cyan-800/50 text-cyan-300 font-bold text-center text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{t.callDirectWithNum} <strong dir="ltr" className="font-mono">{phone}</strong></span>
            </a>
          </div>

        </div>
      )}

    </header>
  );
};
