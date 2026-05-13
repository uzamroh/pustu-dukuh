import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalScreening: 0,
    totalAbsensi: 0,
    totalKunjungan: 0,
  });

  useEffect(() => {
    // TODO: Load statistics from database
    setStats({
      totalScreening: 156,
      totalAbsensi: 48,
      totalKunjungan: 32,
    });
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <Header title="Dashboard" />
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2>Selamat datang, {user?.name}!</h2>
            <p>Kelola data kesehatan masyarakat Dukuh dengan mudah</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Screening</h3>
              <p className="stat-number">{stats.totalScreening}</p>
              <p className="stat-label">Pemeriksaan kesehatan</p>
            </div>
            <div className="stat-card">
              <h3>Total Absensi</h3>
              <p className="stat-number">{stats.totalAbsensi}</p>
              <p className="stat-label">Pencatatan kehadiran</p>
            </div>
            <div className="stat-card">
              <h3>Kunjungan Rumah</h3>
              <p className="stat-number">{stats.totalKunjungan}</p>
              <p className="stat-label">Kunjungan dilakukan</p>
            </div>
          </div>

          <div className="quick-actions">
            <h3>Akses Cepat</h3>
            <div className="action-buttons">
              <Button variant="primary" size="large">
                <a href="/screening/ht" style={{color: 'white', textDecoration: 'none'}}>Buat Screening</a>
              </Button>
              <Button variant="secondary" size="large">
                <a href="/riwayat-screening" style={{color: 'inherit', textDecoration: 'none'}}>Lihat Riwayat</a>
              </Button>
              <Button variant="secondary" size="large">
                <a href="/absensi" style={{color: 'inherit', textDecoration: 'none'}}>Input Absensi</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;