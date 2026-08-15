'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚀</span>
            <span className="font-extrabold text-teal-700 text-xl tracking-tight">منصة تمكين</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs font-bold text-slate-600 hover:text-teal-600 transition-colors px-4 py-2"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
            >
              انضم إلينا
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-right">
          <span className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
            ✨ مستقبل العمل المرن والمهني
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            تمكين الكفاءات وتسهيل الوصول إلى <span className="text-teal-600">الفرص الحقيقية</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            منصة رائدة تهدف إلى ربط أصحاب العمل بالكفاءات المتميزة، وتوفير بيئة تدريبية وعملية متكاملة تدعم النمو المهني وتفتح آفاقاً جديدة.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/register"
              className="bg-slate-900 hover:bg-teal-600 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-md"
            >
              استكشف الفرص الآن
            </Link>
            <Link
              href="/courses"
              className="bg-white border border-slate-200 hover:border-teal-600 text-slate-700 font-bold text-sm px-8 py-3.5 rounded-xl transition-all"
            >
              تصفح الدورات التدريبية
            </Link>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-500/10 to-slate-200/50 p-8 rounded-3xl border border-teal-100/50 shadow-inner flex flex-col justify-center gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <span className="text-3xl">💼</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">فرص عمل مرنة ومتنوعة</h3>
              <p className="text-xs text-slate-500">وظائف عن بُعد، هجينة، وميدانية تناسب قدراتك.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <span className="text-3xl">🤖</span>
            <div>
              <h3 className="font-bold text-sm text-slate-900">مساعد ذكي لبناء الملف</h3>
              <p className="text-xs text-slate-500">صياغة احترافية للنبذة الشخصية بضغطة زر واحدة.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white py-8 mt-20 text-center text-xs text-slate-500">
        جميعRights Reserved © 2026 منصة تمكين
      </footer>
    </div>
  );
}