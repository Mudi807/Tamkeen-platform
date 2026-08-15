'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function RegisterPage() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<'jobseeker' | 'company'>('jobseeker');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    city: 'طرابلس',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('كلمتا السر غير متطابقتين.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            account_type: accountType,
            display_name: accountType === 'jobseeker' ? formData.fullName : formData.companyName,
            phone: formData.phone,
            city: formData.city,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        if (accountType === 'jobseeker') {
          await supabase.from('jobseekers').insert([
            { id: data.user.id, full_name: formData.fullName }
          ]);
        } else {
          await supabase.from('companies').insert([
            { id: data.user.id, company_name: formData.companyName }
          ]);
        }

        alert('تم إنشاء الحساب بنجاح!');
        router.push('/login');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'حدث خطأ أثناء إنشاء الحساب.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
            تم
          </div>
          <span className="text-2xl font-bold text-teal-700">منصة تمكين</span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900">إنشاء حساب جديد</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-100 sm:px-10">
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {errorMessage}
            </div>
          )}

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-xl">
              <button
                type="button"
                onClick={() => setAccountType('jobseeker')}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                  accountType === 'jobseeker' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                👩‍💼 باحثة عن عمل
              </button>
              <button
                type="button"
                onClick={() => setAccountType('company')}
                className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
                  accountType === 'company' ? 'bg-white text-teal-700 shadow-sm' : 'text-slate-600'
                }`}
              >
                🏢 شركة / صاحب عمل
              </button>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {accountType === 'jobseeker' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اسم الشركة</label>
                <input
                  type="text"
                  name="companyName"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs text-left dir-ltr focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">كلمة السر</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">تأكيد كلمة السر</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md text-xs disabled:opacity-50 mt-2"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب الان'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="font-bold text-teal-600 underline">
              تسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
