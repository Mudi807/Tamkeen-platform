'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function CompanyDashboard() {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('طرابلس');
  const [workLocation, setWorkLocation] = useState('remote');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePostJob = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert('جلسة العمل انتهت، يرجى إعادة تسجيل الدخول');
        return;
      }

      const { error } = await supabase.from('jobs').insert([
        {
          company_id: user.id,
          title,
          city,
          work_location: workLocation,
          description,
        },
      ]);

      if (error) throw error;

      alert('تم نشر الوظيفة بنجاح!');
      setTitle('');
      setDescription('');
    } catch (err: any) {
      alert(err.message || 'حدث خطأ أثناء نشر الوظيفة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-teal-700 text-lg">لوحة تحكم الشركات | تمكين</Link>
          <button 
            onClick={() => supabase.auth.signOut().then(() => window.location.href = '/')}
            className="text-xs text-rose-600 font-bold"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm mb-8">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6">➕ إضافة فرصة عمل جديدة</h2>
          
          <form onSubmit={handlePostJob} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">المسمى الوظيفي</label>
              <input
                type="text"
                required
                placeholder="مثال: منسقة مشاريع / مدخلة بيانات عن بُعد"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">المدينة</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">طبيعة العمل</label>
                <select
                  value={workLocation}
                  onChange={(e) => setWorkLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600 bg-white"
                >
                  <option value="remote">عمل عن بُعد (Remote)</option>
                  <option value="on-site">ميداني / من المقر</option>
                  <option value="hybrid">هجين (ميداني + عن بُعد)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">تفاصيل ومسؤوليات الوظيفة</label>
              <textarea
                rows={4}
                required
                placeholder="وضّح شروط الوظيفة، والمهارات المطلوبة..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-xs transition-all shadow-md"
            >
              {loading ? 'جاري النشر...' : 'نشر الوظيفة الان'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
