import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import Input from '@/components/Input';
import Button from '@/components/Button';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'kader_pustu',
    pustu: 'pabean',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Password tidak cocok');
      }

      await authService.register(
        formData.email,
        formData.password,
        formData.name,
        formData.role as any,
        formData.pustu as any
      );
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <h1>Daftar Akun</h1>
          <p className="subtitle">Pustu Dukuh - Sistem Manajemen Kesehatan</p>

          <form onSubmit={handleSubmit}>
            <Input
              label="Nama Lengkap"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nama Anda"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="kader_pustu">Kader PUSTU</option>
                <option value="kader_posyandu">Kader Posyandu</option>
                <option value="petugas">Petugas</option>
              </select>
            </div>

            <div className="form-group">
              <label>PUSTU</label>
              <select name="pustu" value={formData.pustu} onChange={handleChange}>
                <option value="pabean">Pabean</option>
                <option value="bandengan">Bandengan</option>
              </select>
            </div>

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Input
              label="Konfirmasi Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            {error && <div className="error-message">{error}</div>}

            <Button type="submit" fullWidth loading={loading}>
              Daftar
            </Button>
          </form>

          <p className="login-link">
            Sudah punya akun? <a href="/login">Login di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;