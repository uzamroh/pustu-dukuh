// User Types
export type UserRole = 'admin' | 'petugas' | 'kader_pustu' | 'kader_posyandu';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  pustu?: 'pabean' | 'bandengan';
  createdAt: Date;
}

// Petugas Types
export interface Petugas {
  id: string;
  name: string;
  role: 'loket' | 'pemeriksa' | 'obat';
  pustu: 'pabean' | 'bandengan';
}

export interface AbsensiPetugas {
  id: string;
  date: string;
  pustu: 'pabean' | 'bandengan';
  loket: string;
  pemeriksa: string;
  obat: string;
  pasienBPJS: number;
  pasienUmum: number;
  pasienGratis: number;
  pasienLaki: number;
  pasienPerempuan: number;
  createdAt: Date;
}

// Kader Pustu Types
export interface AbsensiKader {
  id: string;
  date: string;
  pustu: 'pabean' | 'bandengan';
  kaderName: string;
  selfieUrl: string;
  createdAt: Date;
}

export type SkriningStat = 'normal' | 'borderline' | 'abnormal' | 'risiko';

export interface SkriningSatu {
  id: string;
  name: string;
  age: number;
  nik: string;
  pustu: 'pabean' | 'bandengan';
  skriningType: 'ht' | 'dm' | 'adl' | 'skilas' | 'obesitas' | 'puma' | 'tb';
  answers: Record<string, string | number>;
  interpretation: string;
  status: SkriningStat;
  createdAt: Date;
}

export interface RiwayatSkrining {
  id: string;
  name: string;
  age: number;
  nik: string;
  pustu: 'pabean' | 'bandengan';
  ht?: SkriningSatu;
  dm?: SkriningSatu;
  adl?: SkriningSatu;
  skilas?: SkriningSatu;
  obesitas?: SkriningSatu;
  puma?: SkriningSatu;
  tb?: SkriningSatu;
  updatedAt: Date;
}

export interface KunjunganRumah {
  id: string;
  date: string;
  name: string;
  age: number;
  nik: string;
  address: string;
  complaint: string;
  pustu: 'pabean' | 'bandengan';
  createdAt: Date;
}

export interface PemantauanWilayah {
  id: string;
  date: string;
  kelurahan: 'padukuhan_kraton' | 'bandengan';
  category: 'kesehatan' | 'lingkungan' | 'bencana';
  description: string;
  photoUrl?: string;
  isResolved: boolean;
  createdAt: Date;
}

// Kader Posyandu Types
export interface SkriningSatuPosyandu extends SkriningSatu {
  posyandu: string;
}