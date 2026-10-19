import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  QrCode, 
  Zap, 
  WifiOff, 
  BellRing, 
  CheckCircle2,
  Lock,
  Radio,
  HardDrive,
  KeyRound
} from 'lucide-react';
import { Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface AppDownloadSectionProps {
  lang: Language;
  onOpenDownloadModal?: () => void;
  onOpenPinModal?: () => void;
  isAppUnlocked?: boolean;
}

export const AppDownloadSection: React.FC<AppDownloadSectionProps> = ({ 
  lang,
  onOpenDownloadModal,
  onOpenPinModal,
  isAppUnlocked = false
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(APK_DOWNLOAD_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(APK_DOWNLOAD_URL)}&bgcolor=0f172a&color=38bdf8`;

  return (
    <section id="download-app" className="py-16 sm:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden border-t border-b border-cyan-900/30">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/50 text-emerald-400 text-xs font-bold shadow-lg shadow-emerald-950/40">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>{isAr ? 'تطبيق الأندرويد الرسمي المعتمد' : 'Official Android Application'}</span>
            <span className="bg-emerald-800/80 text-white text-[10px] px-2 py-0.2 rounded-full font-mono">v2.2</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {t.appModalTitle}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isAr 
              ? 'احصل على جميع خدمات فك الشفرات، استرجاع الحسابات والبيانات المحذوفة، وتطوير البرمجيات والتسويق مباشرة على هاتفك الذكي بسرعة وسرية تامة وبدون أي إعلانات مزعجة.'
              : 'Access all unlocking tools, data and account recovery services, and high-impact digital marketing right from your Android device with zero lag and total confidentiality.'}
          </p>
        </div>

        {/* Bento / Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: App Features & Download Buttons */}
          <div className={`lg:col-span-7 space-y-6 ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
            
            {/* Main Action Banner */}
            <div className="p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-emerald-500/40 shadow-2xl shadow-emerald-950/50 space-y-5">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 shadow-lg shadow-emerald-500/30 flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{isAr ? 'تطبيق رَقِـيـب (نسخة APK)' : 'Raqeeb App (APK Release)'}</span>
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>v2.2</span>
                      <span>•</span>
                      <span className="text-emerald-400">{isAr ? 'محدث ومفحوص أمنياً' : 'Verified Secure'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'سيرفر MediaFire السريع' : 'High-Speed MediaFire'}</span>
                </div>
              </div>

              {/* Big CTA Download Button */}
              <div className="space-y-3">
                <a
                  href={APK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="section-download-apk-btn"
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-950/80 hover:shadow-emerald-600/40 transition duration-300 transform active:scale-95 cursor-pointer min-h-[54px]"
                >
                  <Download className="w-5 h-5 animate-bounce" />
                  <span>{t.downloadApkNow}</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </a>

                {/* Secondary buttons: Copy link & QR code toggle */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={handleCopy}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold border border-slate-800 transition cursor-pointer min-h-[44px]"
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
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 text-xs sm:text-sm font-bold border border-cyan-800/50 transition cursor-pointer min-h-[44px]"
                  >
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    <span>{showQr ? (isAr ? 'إخفاء رمز الاستجابة (QR)' : 'Hide QR') : (isAr ? 'مسح رمز QR من شاشة الكمبيوتر' : 'Scan QR Code')}</span>
                  </button>
                </div>
              </div>

              {/* QR Code container if opened */}
              {showQr && (
                <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-800/50 text-center space-y-2.5 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-xs font-semibold text-slate-300">
                    {isAr ? 'وجّه كاميرا هاتفك إلى الرمز لبدء التنزيل الفوري على الهاتف:' : 'Point your smartphone camera at this code to begin instant download:'}
                  </p>
                  <div className="inline-block p-2 bg-slate-900 border border-slate-800 rounded-xl shadow-md">
                    <img 
                      src={qrCodeUrl} 
                      alt="Scan to Download Raqeeb APK" 
                      className="w-40 h-40 sm:w-44 sm:h-44 mx-auto rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 4 Steps Install & PIN Activation Guide */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t.howToInstallTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-1">1. {isAr ? 'التنزيل' : 'Download'}</span>
                    <span>{isAr ? 'حمّل الملف مباشرة بصيغة APK' : 'Download raqeeb-v2.2.apk'}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-1">2. {isAr ? 'تأكيد الاشتراك' : 'WhatsApp'}</span>
                    <span>{isAr ? 'أرسل الطلب للمالك عبر واتساب' : 'Submit order to owner on WhatsApp'}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-1">3. {isAr ? 'رمز التفعيل (4 أرقام)' : '4-Digit PIN'}</span>
                    <span>{isAr ? 'أدخل الرمز السري لبدء الاستخدام' : 'Enter 4-digit PIN to activate app'}</span>
                  </div>
                </div>
              </div>

              {/* 4-Digit Activation Action Strip */}
              {onOpenPinModal && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-cyan-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-right w-full sm:w-auto">
                    <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-700/50 flex items-center justify-center shrink-0">
                      <KeyRound className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{isAr ? 'تفعيل التطبيق برمز PIN (4 أرقام)' : '4-Digit PIN Activation'}</span>
                        {isAppUnlocked && <span className="text-emerald-400 text-[10px]">({isAr ? 'مفعل ومصرح' : 'Active'})</span>}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {isAr ? 'هل وصلك رمز التفعيل من المالك؟ انقر لإدخاله فوراً' : 'Have your 4-digit code? Click to activate now'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={onOpenPinModal}
                    id="section-pin-verify-btn"
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      isAppUnlocked
                        ? 'bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 hover:bg-emerald-900'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-md'
                    }`}
                  >
                    {isAppUnlocked 
                      ? (isAr ? 'التطبيق مفعل برمز PIN ✅' : 'App Active (PIN) ✅') 
                      : (isAr ? 'أدخل رمز التفعيل الآن 🔑' : 'Enter 4-Digit PIN 🔑')}
                  </button>
                </div>
              )}

            </div>

            {/* App Features 4-Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>{isAr ? 'طلب فوري ومباشر' : 'Instant 1-Tap Requests'}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.appFeature1}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{isAr ? 'استشارات مشفرة ومجانية' : 'Encrypted Free Consults'}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.appFeature2}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <BellRing className="w-4 h-4 text-cyan-400" />
                  <span>{isAr ? 'تتبع حالة جهازك' : 'Live Status Updates'}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.appFeature3}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <WifiOff className="w-4 h-4 text-purple-400" />
                  <span>{isAr ? 'دليل أوفلاين' : 'Offline Directory'}</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {t.appFeature4}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Phone Mockup Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              
              {/* Outer Phone Shell / Frame */}
              <div className="relative rounded-[42px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-950 shadow-2xl shadow-cyan-950/80 border-4 border-slate-800">
                
                {/* Speaker & camera notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full flex items-center justify-center gap-2 z-20">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                  <div className="w-10 h-1.5 rounded-full bg-slate-900" />
                </div>

                {/* Phone Screen Mockup Content */}
                <div className="rounded-[32px] overflow-hidden bg-slate-950 border border-slate-800 p-4 pt-10 space-y-4 relative">
                  
                  {/* Mock App Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono px-1">
                    <span>12:45</span>
                    <div className="flex items-center gap-1">
                      <span>5G</span>
                      <div className="w-4 h-2 bg-emerald-500 rounded-sm" />
                    </div>
                  </div>

                  {/* Mock App Header */}
                  <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-none">رَقِـيـب PRO</div>
                        <div className="text-[9px] text-cyan-400 font-mono">v2.2 Verified</div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>

                  {/* Mock App Quick Services Cards */}
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-slate-200">فك شفرات الشبكات</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">فوري ⚡</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-amber-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-slate-200">تخطي قفل FRP وجوجل</span>
                      </div>
                      <span className="text-[10px] text-cyan-400 font-bold">متاح</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-rose-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-rose-400" />
                        <span className="text-xs font-bold text-slate-200">استرجاع الصور والملفات</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">آمن 100%</span>
                    </div>
                  </div>

                  {/* Mock App Action Button */}
                  <a
                    href={APK_DOWNLOAD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-950/60"
                  >
                    {isAr ? 'اضغط لتحميل التطبيق الآن' : 'Download Raqeeb APK'}
                  </a>

                  {/* Bottom App Home Indicator */}
                  <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2" />

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
