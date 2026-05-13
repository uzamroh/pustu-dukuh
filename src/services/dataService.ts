import { ref, set, get, remove, update, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '@/config/firebase';
import { AbsensiPetugas, AbsensiKader, KunjunganRumah, PemantauanWilayah } from '@/types';

export const dataService = {
  // Absensi Petugas
  async saveAbsensiPetugas(data: AbsensiPetugas): Promise<string> {
    const id = new Date().getTime().toString();
    await set(ref(database, `absensi_petugas/${id}`), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return id;
  },

  async getAbsensiPetugas(pustu: string): Promise<AbsensiPetugas[]> {
    const snapshot = await get(ref(database, 'absensi_petugas'));
    const data: AbsensiPetugas[] = [];
    if (snapshot.exists()) {
      const allData = snapshot.val();
      Object.keys(allData).forEach((key) => {
        if (allData[key].pustu === pustu) {
          data.push({
            ...allData[key],
            createdAt: new Date(allData[key].createdAt),
          });
        }
      });
    }
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async deleteAbsensiPetugas(id: string): Promise<void> {
    await remove(ref(database, `absensi_petugas/${id}`));
  },

  // Absensi Kader
  async saveAbsensiKader(data: AbsensiKader): Promise<string> {
    const id = new Date().getTime().toString();
    await set(ref(database, `absensi_kader/${id}`), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return id;
  },

  async getAbsensiKader(pustu: string): Promise<AbsensiKader[]> {
    const snapshot = await get(ref(database, 'absensi_kader'));
    const data: AbsensiKader[] = [];
    if (snapshot.exists()) {
      const allData = snapshot.val();
      Object.keys(allData).forEach((key) => {
        if (allData[key].pustu === pustu) {
          data.push({
            ...allData[key],
            createdAt: new Date(allData[key].createdAt),
          });
        }
      });
    }
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async deleteAbsensiKader(id: string): Promise<void> {
    await remove(ref(database, `absensi_kader/${id}`));
  },

  // Kunjungan Rumah
  async saveKunjunganRumah(data: KunjunganRumah): Promise<string> {
    const id = new Date().getTime().toString();
    await set(ref(database, `kunjungan_rumah/${id}`), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return id;
  },

  async getKunjunganRumah(pustu: string): Promise<KunjunganRumah[]> {
    const snapshot = await get(ref(database, 'kunjungan_rumah'));
    const data: KunjunganRumah[] = [];
    if (snapshot.exists()) {
      const allData = snapshot.val();
      Object.keys(allData).forEach((key) => {
        if (allData[key].pustu === pustu) {
          data.push({
            ...allData[key],
            createdAt: new Date(allData[key].createdAt),
          });
        }
      });
    }
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async updateKunjunganRumah(id: string, updates: Partial<KunjunganRumah>): Promise<void> {
    await update(ref(database, `kunjungan_rumah/${id}`), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  async deleteKunjunganRumah(id: string): Promise<void> {
    await remove(ref(database, `kunjungan_rumah/${id}`));
  },

  // Pemantauan Wilayah
  async savePemantauanWilayah(data: PemantauanWilayah): Promise<string> {
    const id = new Date().getTime().toString();
    await set(ref(database, `pemantauan_wilayah/${id}`), {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return id;
  },

  async getPemantauanWilayah(kelurahan: string): Promise<PemantauanWilayah[]> {
    const snapshot = await get(ref(database, 'pemantauan_wilayah'));
    const data: PemantauanWilayah[] = [];
    if (snapshot.exists()) {
      const allData = snapshot.val();
      Object.keys(allData).forEach((key) => {
        if (allData[key].kelurahan === kelurahan) {
          data.push({
            ...allData[key],
            createdAt: new Date(allData[key].createdAt),
          });
        }
      });
    }
    return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async updatePemantauanWilayah(id: string, updates: Partial<PemantauanWilayah>): Promise<void> {
    await update(ref(database, `pemantauan_wilayah/${id}`), {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  },

  async deletePemantauanWilayah(id: string): Promise<void> {
    await remove(ref(database, `pemantauan_wilayah/${id}`));
  },
};