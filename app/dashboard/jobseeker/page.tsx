'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function JobseekerDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // AI Assistant States
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [generatedBio, setGeneratedBio] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleGenerateBio = () => {
    if (!skills) {
      alert('يرجى إدخال بعض المهارات أولاً');
      return;
// محاكاة المساعد الذكي لإعداد الملخص الشخصي
const bio = `وتمتلك خبرة في (${experience || 'المجال الإداري والتنفيذي'}). تتميز بمهارات عالية...`;
setGeneratedBio(bio);  };

  const handleApply = async (jobId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('يرجى تسجيل الدخول مجدداً');
        return;
      }

      const { error } = await supabase.from('applications').insert([
        { job_id: jobId, jobseeker_id: user.id }
      ]);

      if (error) {
        if (error.code === '23505') {
          alert('لقد تقدمتِ لهذه الوظيفة سابقاً!');
        } else {
          throw error;
        }
      } else {
        alert('تم تقديم طلبكِ بنجاح!');
      }
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء التقديم');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-teal-700 text-lg">منصة تمكين | فرص العمل</Link>
          <div className="flex gap-4 items-center">
            <Link href="/courses" className="text-xs text-slate-600 hover:text-teal-600 font-bold">الدورات التدريبية</Link>
            <button 
              onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
              className="text-xs text-rose-600 font-bold"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        
        {/* Left Column: AI Profile Builder */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-teal-100 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🤖</span>
              <h3 className="font-bold text-sm text-slate-900">المساعد الذكي لإعداد الملف</h3>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              ادخلي مهاراتك وسيقوم المساعد بصياغة نبذة شخصية احترافية لملفكِ:
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">المهارات الرئيسية</label>
                <input
                  type="text"
                  placeholder="مثال: إدارة الوقت، التواصل، Word..."
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">مجال الخبرة / التخصص</label>
                <input
                  type="text"
                  placeholder="مثال: خدمة العملاء / المحاسبة..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-teal-600"
                />
              </div>

              <button
                onClick={handleGenerateBio}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-sm"
              >
                توليد النبذة الشخصية ✨
              </button>

              {generatedBio && (
                <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-xl">
                  <span className="block text-[10px] font-bold text-teal-800 mb-1">النتيجة المقترحة:</span>
                  <p className="text-xs text-slate-700 leading-relaxed">{generatedBio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Job Listings */}
        <div className="md:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-4">💼 الفرص الوظيفية المتاحة</h2>

          {loadingJobs ? (
            <p className="text-xs text-slate-600">جاري تحميل الوظائف...</p>
          ) : jobs.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-slate-100 text-xs text-slate-600">
              لا توجد وظائف معروضة حالياً.
            </div>
          ) : (
            <div className="space-y-4">
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
                  <button
                    onClick={() => handleApply(job.id)}
                    className="self-end bg-slate-900 hover:bg-teal-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
                  >
                    التقديم المباشر
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
{}}
