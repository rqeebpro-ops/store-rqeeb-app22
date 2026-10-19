import React from 'react';
import { 
  ClipboardCheck, 
  Cpu, 
  ShieldCheck, 
  PackageCheck, 
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface WorkflowSectionProps {
  lang: Language;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const steps = isAr ? [
    {
      number: '01',
      title: 'التشخيص والفحص الأولي المجاني',
      desc: 'فحص رقم الـ IMEI أو حالة الحساب أو الذاكرة التالفة لتحديد نسبة النجاح والحل البرمجي الأسرع.',
      icon: ClipboardCheck,
    },
    {
      number: '02',
      title: 'الاتفاق وتأمين البيانات',
      desc: 'تحديد الوقت والتكلفة مسبقاً وتوقيع بروتوكول السرية التامة وحماية الخصوصية 100%.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      title: 'التنفيذ البرمجي في المختبر',
      desc: 'استخدام أحدث البوكسات والأدوات السحابية الرسمية ومبرمجات الـ JTAG وفك الشفرات أو إطلاق الحملة.',
      icon: Cpu,
    },
    {
      number: '04',
      title: 'الفحص الميداني والتسليم مع الضمان',
      desc: 'تسليمك ملفاتك أو جهازك أو حسابك مفحوصاً بالكامل مع ضمان استقرار دائم ودعم فني متواصل.',
      icon: PackageCheck,
    }
  ] : [
    {
      number: '01',
      title: 'Free Initial Diagnosis & Audit',
      desc: 'Inspecting device IMEI, account state, or corrupted memory to identify the optimal recovery method and success probability.',
      icon: ClipboardCheck,
    },
    {
      number: '02',
      title: 'Agreement & Data Security',
      desc: 'Pre-defining timeline and transparent pricing with strict 100% confidentiality protocols.',
      icon: ShieldCheck,
    },
    {
      number: '03',
      title: 'Lab & Engineering Execution',
      desc: 'Utilizing certified forensic boxes, direct cloud servers, JTAG programmers, and dedicated advertising campaign engines.',
      icon: Cpu,
    },
    {
      number: '04',
      title: 'Verification & Delivery with Warranty',
      desc: 'Handover of fully verified data, unlocked hardware, or live campaigns backed by continuous technical support.',
      icon: PackageCheck,
    }
  ];

  return (
    <section id="process-section" className="py-16 sm:py-20 bg-slate-900/50 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-bold border border-cyan-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isAr ? 'آلية العمل الاحترافية' : 'Professional Engineering Workflow'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isAr ? 'كيف تتم معالجة طلبك في رقيب؟' : 'How Your Request is Handled at Raqeeb'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {isAr ? 'خطوات سلسة تضمن أعلى درجات الدقة والأمان وسرعة الإنجاز بدون تعقيد' : 'Seamless workflow guaranteeing accuracy, data privacy, and rapid execution'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/40 transition group hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition duration-300">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-cyan-400/80 transition">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className={`hidden md:block absolute ${isAr ? '-left-3' : '-right-3'} top-1/2 -translate-y-1/2 z-10`}>
                    <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
