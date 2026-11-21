
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { supabase } from '../../utils/supabaseClient';

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Pengecekan login dan hak akses admin
  useEffect(() => {
    let mounted = true;

    const checkAdmin = async (session) => {
      if (!session) {
        if (mounted) router.replace('/admin/login');
        return;
      }

      setEmail(session.user.email || '');

      const { data, error } = await supabase.rpc('is_admin');

      if (!mounted) return;

      if (error) {
        setError('Gagal memeriksa akses admin: ' + error.message);
        setLoading(false);
        return;
      }

      if (data !== true) {
        setError('Akun ini tidak memiliki akses admin.');
        setLoading(false);
        return;
      }

      setLoading(false);
    };

    supabase.auth.getSession().then(({ data }) => {
      checkAdmin(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.replace('/admin/login');
        } else if (session) {
          checkAdmin(session);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // Logout admin
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError('Gagal logout: ' + error.message);
      return;
    }

    router.replace('/admin/login');
  };

  // Tampilan loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Memeriksa akses admin...
      </div>
    );
  }

  // Tampilan jika akses ditolak
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-center text-red-600">{error}</p>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-white"
        >
          Kembali ke Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-8 sm:px-6 sm:pt-20 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* HEADER ADMIN */}
        <div className="mb-2 rounded-2xl bg-gray-100 p-5 shadow-sm sm:p-2">

          <div className="flex flex-col justify-between gap-4 rounded-xl p-5 text-white sm:flex-row sm:items-center sm:p-6">

            <div>
              <h1 className="text-2xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-1 text-sm text-black-500">
                CV Sarana Teknik Bali
              </p>
            </div>

            {/* TOMBOL LOGOUT */}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-maroon-500 px-5 py-2.5 text-sm font-semibold text-white-500 shadow-md transition hover:bg-maroon-700"
            >
              Logout
            </button>

          </div>
        </div>

        {/* KONTEN DASHBOARD */}
        <main className="mx-auto max-w-6xl py-2">

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">
              Selamat Datang, Admin
            </h2>

            <p className="mt-1 text-sm text-black-500">
              {email}
            </p>
          </div>

          {/* MENU ADMIN */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* MENU KATALOG */}
            <Link href="/admin/katalog">
              <a className="group block rounded-2xl border border-gray-200 p-4 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="mb-4 flex h-4 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 7h16M4 7l2-3h12l2 3M5 7v13h14V7M9 11h6"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold transition group-hover:text-maroon-500">
                  Kelola Katalog Unit
                </h3>

                <p className="mt-2 text-sm leading-6 text-black-500">
                  Tambah, ubah, hapus, dan unggah gambar katalog alat.
                </p>

                <span className="mt-5 inline-block font-semibold text-maroon-500">
                  Buka Katalog →
                </span>

              </a>
            </Link>

            {/* MENU GALERI */}
            <Link href="/admin/galeri">
              <a className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

                <div className="mb-4 flex h-4 w-12 items-center justify-center rounded-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15l-5-5L5 21"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold transition group-hover:text-maroon-500">
                  Kelola Galeri Proyek
                </h3>

                <p className="mt-2 text-sm leading-6 text-black-500">
                  Tambah proyek, unggah foto, ubah, dan hapus galeri.
                </p>

                <span className="mt-5 inline-block font-semibold text-maroon-500">
                  Buka Galeri →
                </span>

              </a>
            </Link>

          </div>
        </main>

      </div>
    </div>
  );
}
