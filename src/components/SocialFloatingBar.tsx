import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Send, 
  Share2, 
  Copy, 
  Check, 
  X,
  Smartphone,
  Download,
  KeyRound,
  Settings
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface SocialFloatingBarProps {
  phone: string;
  lang: Language;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
  isAdminLoggedIn?: boolean;
  onOpenAdminDashboard?: () => void;
}

export const SocialFloatingBar: React.FC<SocialFloatingBarProps> = ({ 
  phone, 
  lang,
  onOpenPinModal,
  isAppUnlocked = false,
  isAdminLoggedIn = false,
  onOpenAdminDashboard
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const isAr = lang === 'ar';
  const t = UI_TRANSLATIONS[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`fixed bottom-4 sm:bottom-6 ${isAr ? 'left-3 sm:left-6' : 'right-3 sm:right-6'} z-40 flex flex-col items-start gap-2.5 sm:gap-3`}>
      {/* Expanded quick social popup - Responsive width */}
      {isOpen && (
        <div 
          className={`bg-slate-900 border border-slate-700 p-4 rounded-2xl shadow-2xl shadow-cyan-950/80 w-[calc(100vw-2rem)] max-w-xs sm:w-64 ${isAr ? 'text-right' : 'text-left'} space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200`} 
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-bold text-cyan-400">
              {isAr ? 'تواصل مباشر مع رقيب' : 'Direct Contact with Raqeeb'}
            </span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-white cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close social panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Direct Phone copy/call */}
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <a href={`tel:${phone}`} dir="ltr" className="text-xs font-mono font-bold text-white hover:text-cyan-300">
                {phone}
              </a>
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title={t.copyNumber}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Social & App Quick Links */}
          <div className="space-y-1.5 text-xs">
            {/* Raqeeb Android App APK link */}
            <a
              href={APK_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-emerald-950/90 to-teal-950/90 hover:from-emerald-900/90 hover:to-teal-900/90 text-emerald-300 border border-emerald-700/60 transition font-bold"
            >
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تطبيق رقيب (APK v2.2)' : 'Raqeeb App (APK v2.2)'}</span>
              </div>
              <Download className="w-3.5 h-3.5 text-emerald-400" />
            </a>

            {/* 4-Digit Activation PIN button */}
            {onOpenPinModal && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenPinModal();
                }}
                className={`w-full flex items-center justify-between p-2 rounded-xl border transition font-bold cursor-pointer ${
                  isAppUnlocked
                    ? 'bg-emerald-950/70 border-emerald-700/60 text-emerald-300'
                    : 'bg-cyan-950/80 border-cyan-700/60 text-cyan-300 hover:bg-cyan-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-cyan-400" />
                  <span>{isAppUnlocked ? (isAr ? 'التطبيق مفعل بـ PIN' : 'App Active (PIN)') : (isAr ? 'أدخل كود التفعيل (4 أرقام)' : 'Enter 4-Digit PIN')}</span>
                </div>
                <span>{isAppUnlocked ? '✅' : '🔑'}</span>
              </button>
            )}

            {/* Admin Dashboard quick link if logged in */}
            {isAdminLoggedIn && onOpenAdminDashboard && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdminDashboard();
                }}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/60 text-amber-300 font-bold hover:bg-amber-500/30 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'لوحة تحكم النظام الشاملة' : 'Admin Control Panel'}</span>
                </div>
                <span>⚙️</span>
              </button>
            )}

            <a
              href={`https://wa.me/967${phone}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40 transition font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{isAr ? 'محادثة واتساب سريعة' : 'Instant WhatsApp Chat'}</span>
            </a>

            <a
              href="https://t.me/raqeeb_tech"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/40 transition font-semibold"
            >
              <Send className="w-4 h-4 text-blue-400" />
              <span>{isAr ? 'قناة تيليجرام للشروحات' : 'Telegram Channel'}</span>
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 p-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/40 transition font-semibold"
            >
              <Share2 className="w-4 h-4 text-indigo-400" />
              <span>{isAr ? 'صفحة فيسبوك الرسمية' : 'Official Facebook Page'}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main floating buttons */}
      <div className="flex items-center gap-2">
        {/* Floating WhatsApp with live badge */}
        <a
          href={`https://wa.me/967${phone}`}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 hover:shadow-emerald-500/40 transition-all duration-300 transform active:scale-95 cursor-pointer min-h-[48px]"
          title={t.whatsapp}
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <div className={`${isAr ? 'text-right' : 'text-left'} hidden sm:block`}>
            <div className="text-[11px] leading-tight font-bold text-emerald-100">{isAr ? 'واتساب 24/7' : 'WhatsApp 24/7'}</div>
            <div className="text-xs font-black font-mono tracking-tight" dir="ltr">{phone}</div>
          </div>
        </a>

        {/* Quick Social Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-white rounded-full border border-slate-700 shadow-xl transition active:scale-95 cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center"
          aria-label="Social contact options"
          title="Social contact options"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
};
