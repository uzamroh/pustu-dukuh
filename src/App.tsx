import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import '@/styles/global.css';

// Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/pages/DashboardPage';
import ScreeningPage from '@/pages/ScreeningPage';
import AbsensiPage from '@/pages/AbsensiPage';
import KunjunganRumahPage from '@/pages/KunjunganRumahPage';
import PemantauanWilayahPage from '@/pages/PemantauanWilayahPage';
import RiwayatScreeningPage from '@/pages/RiwayatScreeningPage';

// Components
import LoadingSpinner from '@/components/LoadingSpinner';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  const { user, loading } = useAuth();
  const { setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/screening/:type"
          element={
            <ProtectedRoute>
              <ScreeningPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/absensi"
          element={
            <ProtectedRoute>
              <AbsensiPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kunjungan-rumah"
          element={
            <ProtectedRoute>
              <KunjunganRumahPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pemantauan-wilayah"
          element={
            <ProtectedRoute>
              <PemantauanWilayahPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riwayat-screening"
          element={
            <ProtectedRoute>
              <RiwayatScreeningPage />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;