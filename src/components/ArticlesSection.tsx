import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  ShieldAlert, 
  Lightbulb, 
  Share2, 
  CheckCircle, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { ARTICLES_DATA } from '../data/articlesData';
import { ARTICLES_DATA_EN } from '../data/articlesDataEn';
import { ArticleItem, Language } from '../types';
import { UI_TRANSLATIONS } from '../i18n/translations';
import { getStoredArticles } from '../utils/adminStorage';

interface ArticlesSectionProps {
  phone: string;
  selectedArticleId?: string | null;
  lang: Language;
  articles?: ArticleItem[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ 
  phone,
  selectedArticleId,
  lang,
  articles
}) => {
  const t = UI_TRANSLATIONS[lang];
  const articlesList = articles || (lang === 'ar' ? getStoredArticles() : ARTICLES_DATA_EN);

  const [activeArticle, setActiveArticle] = useState<ArticleItem | null>(() => {
    if (selectedArticleId) {
      return articlesList.find(a => a.id === selectedArticleId) || articlesList[0];
    }
    return null;
  });

  const isAr = lang === 'ar';

  return (
    <section id="articles-section" className="py-16 sm:py-24 bg-slate-950 relative border-t border-slate-900">
      
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t.articlesBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {t.articlesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t.articlesDesc}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {articlesList.map((article) => {
            const isSelected = activeArticle?.id === article.id;
            return (
              <div
                key={article.id}
                className={`flex flex-col justify-between rounded-3xl overflow-hidden bg-slate-900/90 border transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 ${
                  isSelected ? 'border-cyan-400 ring-2 ring-cyan-500/20' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Article Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950 group">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Category badge */}
                    <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-cyan-300 border border-cyan-500/30 shadow-md`}>
                      {article.categoryName}
                    </div>

                    {/* Read time */}
                    <div className={`absolute bottom-3 ${isAr ? 'left-3' : 'right-3'} flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm`}>
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={`p-6 space-y-3 ${isAr ? 'text-right' : 'text-left'}`}>
                    <div className="text-xs font-medium text-slate-400">
                      {isAr ? 'بواسطة: ' : 'By: '}{article.author}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white hover:text-cyan-300 transition line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Step pills preview */}
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-cyan-400 block mb-2">
                        {isAr ? `ملخص خطوات الإنجاز (${article.stepsGuide.length} مراحل):` : `Process Summary (${article.stepsGuide.length} Stages):`}
                      </span>
                      <div className="space-y-1.5">
                        {article.stepsGuide.slice(0, 2).map((st) => (
                          <div key={st.stepNumber} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                              {st.stepNumber}
                            </span>
                            <span className="line-clamp-1">{st.stepTitle}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card footer CTA */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      setActiveArticle(article);
                      const viewer = document.getElementById('article-full-viewer');
                      if (viewer) viewer.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>{isSelected ? (isAr ? 'المقال مفتوح أدناه' : 'Article Open Below') : (isAr ? 'قراءة الدليل التفصيلي والخطوات' : 'Read Full Guide & Steps')}</span>
                    {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Detailed Full Guide Viewer */}
        {activeArticle && (
          <div 
            id="article-full-viewer" 
            className={`rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 sm:p-10 ${isAr ? 'text-right' : 'text-left'} space-y-8 shadow-2xl animate-in fade-in duration-300`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            
            {/* Guide Header */}
            <div className="border-b border-slate-800 pb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/40 text-xs font-bold">
                  {activeArticle.categoryName} • {activeArticle.readTime}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {activeArticle.date}
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black text-white">
                {activeArticle.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                {activeArticle.summary}
              </p>
            </div>

            {/* Step-by-Step Interactive Timeline */}
            <div className="space-y-6">
              <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>{isAr ? 'خطوات العمل الفنية والهندسية المتبعة:' : 'Technical Engineering Steps Applied:'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeArticle.stepsGuide.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-800/50 space-y-2 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-black flex items-center justify-center">
                        {step.stepNumber}
                      </span>
                      <h5 className="text-sm font-bold text-white">
                        {step.stepTitle}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pr-10">
                      {step.stepDetail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Warnings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-300">
                    {isAr ? 'تنبيه أمني هام' : 'Important Security Notice'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeArticle.warning}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-xs font-bold text-cyan-300">
                    {isAr ? 'نصيحة خبراء رقيب' : 'Raqeeb Experts Tip'}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeArticle.tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Assistance CTA */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-right">
                <div className="text-sm font-bold text-white">
                  {isAr ? 'هل تواجه هذه المشكلة وتريد من خبير رقيب حلها فوراً؟' : 'Facing this issue and need a Raqeeb expert to solve it immediately?'}
                </div>
                <div className="text-xs text-slate-400">
                  {isAr ? 'نقدم استشارة وفحص أولي مجاني، مع ضمان استرجاع الرسوم حال عدم النجاح' : 'We offer free initial inspection with a money-back guarantee.'}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/967${phone}?text=${encodeURIComponent(isAr ? `مرحباً رقيب، قرأت مقال (${activeArticle.title}) وأحتاج لمساعدتكم الفورية في حل المشكلة` : `Hello Raqeeb, I read the article (${activeArticle.title}) and need immediate assistance.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isAr ? 'طلب استشارة واتساب' : 'WhatsApp Consultation'}</span>
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
