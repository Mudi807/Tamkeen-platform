'use client';

import Link from 'next/link';

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: 'أساسيات العمل المكتبي والتنسيق عن بُعد',
      duration: '3 أسابيع',
      level: 'مبتدئ',
      category: 'إدارة وأعمال',
      tag: 'مناسب للعمل من المنزل',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 2,
      title: 'التسويق الرقمي وإدارة حسابات التواصل',
      duration: '4 أسابيع',
      level: 'متوسط',
      category: 'تسويق',
      tag: 'دورة مجانية مدعومة',
      badgeColor: 'bg-teal-100 text-teal-800'
    },
    {
      id: 3,
      title: 'إدخال البيانات وتحليل السجلات للمبتدئين',
      duration: 'أسسبوعين',
      level: 'مبتدئ',
      category: 'تقنية معلومات',
      tag: 'ميسر لذوي الاحتياجات الخاصة',
      badgeColor: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              تم
            </div>
            <span className="text-2xl font-bold text-teal-700">منصة تمكين</span>
          </Link>
          <Link href="/register" className="bg-teal-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl">
            سجلي للحصول على الدورات
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 mb-2">🎓 الدورات التدريبية المتاحة</h1>
          <p className="text-slate-600 text-sm">برامج تدريبية متخصصة لرفع الكفاءة وتسهيل الدخول لسوق العمل</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${course.badgeColor}`}>
                    {course.tag}
                  </span>
                  <span className="text-xs text-slate-600">{course.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-xs text-slate-600 mb-4">المستوى: {course.level} | التخصص: {course.category}</p>
              </div>
              <button 
                onClick={() => alert('يرجى تسجيل الدخول أولاً للتسجيل في الدورة')}
                className="w-full bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold py-3 rounded-xl transition-all"
              >
                التسجيل في الدورة
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
