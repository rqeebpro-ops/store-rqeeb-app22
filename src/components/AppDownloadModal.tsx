import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  QrCode,
  CheckCircle2,
  Zap,
  WifiOff,
  BellRing
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const APK_DOWNLOAD_URL = 'https://www.mediafire.com/file/5spwhlkd9e2yxy9/raqeeb-v2.2.apk/file';

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({
  isOpen,
  onClose,
  lang
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(APK_DOWNLOAD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadClick = () => {
    window.open(APK_DOWNLOAD_URL, '_blank');
  };

  // SVG QR Code pointing to the download URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APK_DOWNLOAD_URL)}&bgcolor=0f172a&color=38bdf8`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto bg-slate-900 border border-cyan-800/70 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 ${isAr ? 'text-right' : 'text-left'} space-y-5 scrollbar-thin`}
        onClick={(e) => e.stopPropagation()}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Close Button - 44px touch target */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center`}
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800/50">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'تطبيق الأندرويد المعتمد v2.2' : 'Official Android App v2.2'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {t.appModalTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            {t.appModalSubtitle}
          </p>
        </div>

        {/* App Meta Specifications Badges */}
        <div className="grid grid-cols-3 gap-2 py-1">
          <div className="bg-slate-950 p-2.5 sm:p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'الإصدار' : 'Version'}</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">v2.2 (APK)</div>
          </div>
          <div className="bg-slate-950 p-2.5 sm:p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'التوافق' : 'Compatibility'}</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400">Android 7.0+</div>
          </div>
          <div className="bg-slate-950 p-2.5 sm:p-3 rounded-xl border border-slate-800 text-center space-y-1">
            <div className="text-[10px] text-slate-400 font-semibold">{isAr ? 'الأمان' : 'Security'}</div>
            <div className="text-xs sm:text-sm font-bold text-cyan-300 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'نظيف 100%' : 'Safe'}</span>
            </div>
          </div>
        </div>

        {/* Primary Download CTAs */}
        <div className="space-y-3 pt-1">
          <a
            href={APK_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDownloadClick}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-950/60 hover:shadow-emerald-600/40 transition duration-200 transform active:scale-95 cursor-pointer min-h-[52px]"
          >
            <Download className="w-5 h-5 animate-bounce" />
            <span>{t.downloadApkNow}</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold border border-slate-700 transition cursor-pointer min-h-[44px]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">{t.apkLinkCopied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-cyan-400" />
                  <span>{t.copyApkLink}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowQr(!showQr)}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-800/50 transition cursor-pointer min-h-[44px]"
            >
              <QrCode className="w-4 h-4" />
              <span>{showQr ? (isAr ? 'إخفاء الباركود' : 'Hide QR') : (isAr ? 'مسح QR بالجوال' : 'Scan QR')}</span>
            </button>
          </div>
        </div>

        {/* QR Code expansion for Desktop to Phone Transfer */}
        {showQr && (
          <div className="p-4 bg-slate-950 border border-cyan-700/50 rounded-2xl text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs text-slate-300 font-semibold">
              {t.appScanQr}
            </p>
            <div className="inline-block p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
              <img 
                src={qrCodeUrl} 
                alt="QR Code to Download Raqeeb APK" 
                className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="text-[11px] text-cyan-400 font-mono break-all max-w-sm mx-auto">
              {APK_DOWNLOAD_URL}
            </div>
          </div>
        )}

        {/* Key Features List */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2.5">
          <h4 className="text-xs sm:text-sm font-bold text-cyan-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.appFeaturesTitle}</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t.appFeature1}</span>
            </div>
            <div className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t.appFeature2}</span>
            </div>
            <div className="flex items-start gap-2">
              <BellRing className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>{t.appFeature3}</span>
            </div>
            <div className="flex items-start gap-2">
              <WifiOff className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{t.appFeature4}</span>
            </div>
          </div>
        </div>

        {/* Installation Guide Steps */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-2xl p-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-300">
            {t.howToInstallTitle}
          </h4>
          <ol className="space-y-1.5 text-[11px] sm:text-xs text-slate-400 list-decimal list-inside leading-relaxed">
            <li>{t.installStep1}</li>
            <li>{t.installStep2}</li>
            <li>{t.installStep3}</li>
          </ol>
        </div>

      </div>
    </div>
  );
};
