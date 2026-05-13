import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { screeningService } from '@/services/screeningService';
import { useAuth } from '@/hooks/useAuth';
import './ScreeningPage.css';

const ScreeningPage = () => {
  const { type } = useParams<{ type: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({
    nama: '',
    nik: '',
    umur: '',
  });

  const screeningTypes: Record<string, { title: string; fields: string[] }> = {
    ht: {
      title: 'Screening Hipertensi',
      fields: ['riwayat_ht', 'konsumsi_garam', 'stress', 'olahraga'],
    },
    dm: {
      title: 'Screening Diabetes',
      fields: ['riwayat_dm', 'berat_badan', 'olahraga', 'stress'],
    },
    adl: {
      title: 'Screening ADL',
      fields: ['mandi', 'berpakaian', 'makan', 'mobilitas', 'buang_air', 'kontinensia'],
    },
    obesitas: {
      title: 'Screening Obesitas',
      fields: ['berat_badan', 'tinggi_badan'],
    },
    tb: {
      title: 'Screening Tuberkulosis',
      fields: ['batuk', 'demam', 'berat_badan_turun', 'keringat_malam'],
    },
  };

  const currentScreening = screeningTypes[type || 'ht'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Save screening to database
      console.log('Screening data:', formData);
      navigate('/riwayat-screening');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard-main">
        <Header title={currentScreening?.title || 'Screening'} />
        <div className="screening-content">
          <form onSubmit={handleSubmit} className="screening-form">
            <div className="form-section">
              <h3>Data Dasar</h3>
              <Input
                label="Nama"
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
              <Input
                label="NIK"
                type="text"
                name="nik"
                value={formData.nik}
                onChange={handleChange}
                required
              />
              <Input
                label="Umur"
                type="number"
                name="umur"
                value={formData.umur}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <h3>Pertanyaan Screening</h3>
              {currentScreening?.fields.map((field) => (
                <div key={field} className="form-group">
                  <label>{field.replace(/_/g, ' ').toUpperCase()}</label>
                  <select name={field} value={formData[field] || ''} onChange={handleChange}>
                    <option value="">-- Pilih --</option>
                    <option value="ya">Ya</option>
                    <option value="tidak">Tidak</option>
                  </select>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
                Kembali
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                Simpan Screening
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ScreeningPage;