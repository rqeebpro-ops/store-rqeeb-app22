import React from 'react';
import { 
  Radio, 
  Cpu, 
  ShieldAlert, 
  Lock, 
  Smartphone, 
  UserCheck, 
  MessageSquare, 
  FileSpreadsheet, 
  HardDrive, 
  Code, 
  Bot, 
  TrendingUp, 
  Sparkles, 
  Search,
  Clock,
  CheckCircle2,
  Shield,
  ArrowLeft,
  ArrowRight,
  Send
} from 'lucide-react';
import { ServiceItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';

interface ServiceCardProps {
  service: ServiceItem;
  onViewDetails: (service: ServiceItem) => void;
  onOrderNow: (service: ServiceItem) => void;
  lang: Language;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onViewDetails,
  onOrderNow,
  lang
}) => {
  const t = UI_TRANSLATIONS[lang];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-5 h-5 text-cyan-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-amber-400" />;
      case 'Lock': return <Lock className="w-5 h-5 text-amber-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-teal-400" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-emerald-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-rose-400" />;
      case 'HardDrive': return <HardDrive className="w-5 h-5 text-rose-400" />;
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-blue-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-purple-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Search': return <Search className="w-5 h-5 text-cyan-400" />;
      default: return <Shield className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/40">
      
      {/* Category Tag */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-slate-700/80 transition shrink-0">
              {getIcon(service.icon)}
            </div>
            <span className="text-xs font-semibold text-slate-400 truncate max-w-[130px] sm:max-w-none">
              {service.categoryName}
            </span>
          </div>

          {service.badge && (
            <span className="text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 shrink-0">
              {service.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 mb-2">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4">
          {service.shortDesc}
        </p>

        {/* Quick Specs */}
        <div className="grid grid-cols-2 gap-2 py-2.5 sm:py-3 mb-4 border-y border-slate-800/80 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{t.timeEst}{service.estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{t.successRate}{service.successRate}</span>
          </div>
        </div>

        {/* Key bullets */}
        <ul className="space-y-1.5 mb-5 sm:mb-6">
          {service.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Buttons - Mobile touch friendly (min 42px) */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => onViewDetails(service)}
          className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition cursor-pointer min-h-[42px]"
        >
          <span>{t.serviceDetails}</span>
          {lang === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => onOrderNow(service)}
          className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-950/40 transition active:scale-95 cursor-pointer min-h-[42px]"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{t.orderService}</span>
        </button>
      </div>

    </div>
  );
};
