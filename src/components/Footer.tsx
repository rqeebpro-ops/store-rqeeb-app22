import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Send, 
  Share2, 
  Radio, 
  Lock, 
  UserCheck, 
  HardDrive, 
  Code, 
  TrendingUp, 
  Heart,
  Smartphone,
  Download
} from 'lucide-react';
import { ServiceCategory, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { APK_DOWNLOAD_URL } from './AppDownloadModal';

interface FooterProps {
  phone: string;
  onSelectCategory: (cat: ServiceCategory) => void;
  lang: Language;
  onOpenDownloadModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  phone, 
  onSelectCategory, 
  lang,
  onOpenDownloadModal 
}) => {
  const t = UI_TRANSLATIONS[lang];
  const isAr = lang === 'ar';

  return (
    <footer className={`bg-slate-950 border-t border-slate-800/80 ${isAr ? 'text-right' : 'text-left'} pt-16 pb-12`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-black text-white">{t.brandName}</span>
                <span className="text-xs text-slate-400 block font-medium">{t.brandSub}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.heroDesc}
            </p>

            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-1 font-semibold">
                {isAr ? 'للتواصل المباشر والاستفسارات:' : 'Direct Contact & Inquiries:'}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${phone}`}
                  dir="ltr"
                  className="text-lg font-black font-mono text-cyan-400 hover:underline"
                >
                  {phone}
                </a>
                <span className="text-slate-600">|</span>
                <a
                  href={`https://wa.me/967${phone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:underline"
                >
                  {isAr ? 'محادثة واتساب سريعة' : 'Instant WhatsApp'}
                </a>
              </div>
            </div>

            {/* Android App Download button in footer */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-800/50 text-xs font-bold transition cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تحميل تطبيق رقيب (v2.2 APK)' : 'Download Raqeeb App (APK)'}</span>
                <Download className="w-3.5 h-3.5 text-emerald-400" />
              </a>
              <button
                onClick={onOpenDownloadModal}
                className="text-slate-400 hover:text-white text-xs underline cursor-pointer"
              >
                {isAr ? 'الباركود' : 'QR'}
              </button>
            </div>
          </div>

          {/* Col 2: Security & Unlocking Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span>{isAr ? 'خدمات فك الشفرات والأجهزة' : 'Carrier & Device Unlocks'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('unlocking')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك شفرات الشبكات (Carrier Unlock)' : 'Carrier Network Unlocking'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('unlocking')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'إصلاح المودم وفقدان السيريال IMEI' : 'Modem & IMEI Repair'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('screen_locks')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تخطي قفل حساب جوجل (FRP Bypass)' : 'Google FRP Lock Bypass'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('screen_locks')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك رمز الشاشة ونمط الأجهزة' : 'Screen Passcode & Pattern Unlock'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('screen_locks')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تجاوز أقفال آبل و MDM' : 'Apple & MDM Locks Bypass'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Data & Account Recovery */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-rose-400" />
              <span>{isAr ? 'استرجاع البيانات والحسابات' : 'Data & Account Recovery'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('account_recovery')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استرجاع حسابات فيسبوك وانستغرام' : 'Facebook & Instagram Recovery'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('account_recovery')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استرجاع حسابات تيك توك وسناب شات' : 'TikTok & Snapchat Recovery'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('account_recovery')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'فك حظر أرقام الواتساب (Spam Ban)' : 'WhatsApp Unban (Spam Recovery)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('data_recovery')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استرداد الصور والمحادثات المحذوفة' : 'Deleted Photos & Chats Retrieval'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('data_recovery')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'استخراج البيانات من الهواتف التالفة والغرقى' : 'Dead & Water-Damaged Motherboard Recovery'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Programming & Marketing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>{isAr ? 'البرمجة والتسويق الرقمي' : 'Software & Digital Marketing'}</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('programming')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تطوير المواقع والمتاجر الإلكترونية' : 'Web & E-Commerce Development'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('programming')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'برمجة البوتات الذكية والـ APIs' : 'AI Automation Bots & APIs'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('marketing')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'الحملات الإعلانية الممولة (Meta & Google)' : 'Sponsored Paid Ads (Meta & Google)'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('marketing')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'إدارة صفحات السوشيال ميديا والتصاميم' : 'Social Media Management & Creative'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('marketing')}
                  className="hover:text-cyan-300 transition text-inherit text-start cursor-pointer"
                >
                  {isAr ? 'تهيئة محركات البحث (SEO)' : 'Search Engine Optimization (SEO)'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            {isAr 
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} - رَقِـيـب للبرمجة والتسويق.`
              : `All Rights Reserved © ${new Date().getFullYear()} - Raqeeb for Programming & Marketing.`
            }
          </div>
          <div className="flex items-center gap-4">
            <span>{isAr ? 'سرية تامة 100%' : '100% Confidential'}</span>
            <span>•</span>
            <span>{isAr ? 'رقم الاتصال: ' : 'Direct Tel: '}{phone}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              {isAr ? 'صُنع بحرفية وأمان تقني' : 'Engineered with Precision & Security'}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
