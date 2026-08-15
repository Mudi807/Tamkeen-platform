'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function UnifiedHomePage() {
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

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

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleGenerateBio = () => {
    if (!skills) {
      alert('يرجى إدخال المهارات الأساسية أولاً');
      return;
    }
    const bio = `كفاءة طموحة وتمتلك خبرة في (${experience || 'المجال الإداري والتنفيذي'}). تتميز بمهارات عالية في: ${skills}. تسعى للانضمام إلى فريق عمل ديناميكي لتقديم قيمة مضافة وتحقيق أهداف المنظمة بكفاءة عالية.`;
    setGeneratedBio(bio);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800 scroll-smooth">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-teal-600/20">
              تم
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-teal-700 to-teal-500 bg-clip-text text-transparent">
              منصة تمكين
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
            <a href="#about" className="hover:text-teal-600 transition-all">عن المنصة</a>
            <a href="#courses" className="hover:text-teal-600 transition-all">الدورات التدريبية</a>
            <a href="#ai-assistant" className="hover:text-teal-600 transition-all">المساعد الذكي</a>
            <a href="#jobs" className="hover:text-teal-600 transition-all">فرص العمل</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-xs font-bold text-slate-700 hover:text-teal-600 px-4 py-2.5 rounded-xl transition-all">
              تسجيل الدخول
            </Link>
            <Link href="/register" className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-5 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/20">
              إنشاء حساب
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-teal-50 text-teal-700 text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-teal-100">
          ✨ المنصة الأولى لتمكين الكفاءات والكوادر النسائية وذوي الاحتياجات الخاصة
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight max-w-4xl mx-auto mb-6">
          اكتشفي الفرص الوظيفية التي تناسب طموحكِ وأسلوب حياتكِ
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          نربط بين الكفاءات وأصحاب الشركات لتقديم فرص عمل مرنة (عن بُعد، ميداني، وهجين) ودورات تدريبية متخصصة.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#jobs" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-8 py-4 rounded-2xl transition-all shadow-lg shadow-teal-600/25">
            استعراض الوظائف المتاحة
          </a>
          <a href="#ai-assistant" className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 font-bold text-sm px-8 py-4 rounded-2xl transition-all">
            تجربة المساعد الذكي 🤖
          </a>
        </div>
      </section>

      <section id="about" className="bg-white py-16 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="bg-teal-100 text-teal-800 text-xs font-bold px-4 py-1.5 rounded-full">رسالتنا ورؤيتنا</span>
            <h2 className="text-3xl font-black text-slate-900 mt-3 mb-2">تمكين الكفاءات للجميع دون استثناء</h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto">
              بيئة عمل مرنة وشاملة تضمن تكافؤ الفرص وتمكّن المرأة وذوي الاحتياجات الخاصة من الانخراط الفاعل في سوق العمل.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-4">👩‍💼</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">تمكين المرأة والمرونة الوظيفية</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                خيارات عمل مرنة تشمل العمل عن بُعد (Remote)، والدوام الجزئي، والوظائف التي توفر بيئات عمل آمنة ومحفزة للكوادر النسائية والقياديات الشابة.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl mb-4">♿</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">دمج ذوي الاحتياجات الخاصة</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                تهيئة بيئات العمل الميدانية الميسرة (Accessible Workplaces) وتوسيع مجالات التوظيف الرقمي المباشر من المنزل.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="courses" className="py-16 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-2">🎓 الدورات التدريبية المتاحة</h2>
          <p className="text-slate-600 text-xs sm:text-sm">برامج تدريبية متخصصة لرفع الكفاءة وتسهيل الدخول لسوق العمل</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${course.badgeColor}`}>{course.tag}</span>
                  <span className="text-xs text-slate-600">{course.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-xs text-slate-600 mb-4">المستوى: {course.level} | التخصص: {course.category}</p>
              </div>
              <Link href="/register" className="w-full text-center bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold py-3 rounded-xl transition-all">
                التسجيل في الدورة
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="ai-assistant" className="bg-gradient-to-br from-teal-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-teal-500/20 text-teal-300 text-xs font-bold px-4 py-1.5 rounded-full mb-4 border border-teal-500/30">
            🤖 خدمة ذكية مجانية
          </div>
          <h2 className="text-3xl font-black mb-2">المساعد الذكي لإعداد النبذة الشخصية</h2>
          <p className="text-slate-300 text-xs sm:text-sm mb-8">ادخلي مهاراتكِ وسنقوم بصياغة نبذة احترافية ملائمة لملفكِ الوظيفي فوراً:</p>

          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/10 text-right max-w-xl mx-auto space-y-4">
            <div>
              <label className="block text-xs font-bold text-teal-200 mb-1">المهارات الرئيسية</label>
              <input
                type="text"
                placeholder="مثال: إدارة الوقت، التواصل، إدخال البيانات..."
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs border border-white/10 focus:outline-none focus:border-teal-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-teal-200 mb-1">مجال الخبرة / التخصص</label>
              <input
                type="text"
                placeholder="مثال: خدمة العملاء / التسويق الرقمي..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 text-xs border border-white/10 focus:outline-none focus:border-teal-400"
              />
            </div>
            <button onClick={handleGenerateBio} className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-extrabold py-3.5 rounded-xl transition-all shadow-md">
              توليد النبذة الاحترافية ✨
            </button>

            {generatedBio && (
              <div className="mt-4 p-4 bg-teal-950/80 border border-teal-500/40 rounded-xl text-right">
                <span className="block text-[11px] font-bold text-teal-300 mb-1">النبذة المقترحة:</span>
                <p className="text-xs text-slate-200 leading-relaxed">{generatedBio}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="jobs" className="py-16 max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">💼 الفرص الوظيفية المتاحة</h2>
            <p className="text-slate-600 text-xs sm:text-sm">الوظائف المضافة مؤخراً عبر الشركاء</p>
          </div>
          <Link href="/register" className="text-xs font-bold text-teal-600 hover:underline">
            عرض كافة الوظائف ←
          </Link>
        </div>

        {loadingJobs ? (
          <p className="text-xs text-slate-600 text-center py-8">جاري تحميل الوظائف...</p>
        ) : jobs.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 text-xs text-slate-600">
            لا توجد وظائف معروضة حالياً. يمكنك تسجيل الدخول بنشاط لنشر أول وظيفة!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-900 text-base">{job.title}</h3>
                    <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2.5 py-1 rounded-md">
                      {job.work_location === 'remote' ? 'عن بُعد' : job.work_location === 'hybrid' ? 'هجين' : 'ميداني'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3">{job.city} • {job.description}</p>
                </div>
                <Link href="/login" className="self-end bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all">
                  التقديم المباشر
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="bg-white border-t border-slate-100 py-8 text-center text-xs text-slate-500">
        <p>© 2026 منصة تمكين. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
