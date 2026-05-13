import { ref, set, get, query, orderByChild, equalTo, remove, update } from 'firebase/database';
import { database } from '@/config/firebase';
import { SkriningSatu, RiwayatSkrining } from '@/types';

export const screeningService = {
  // HT Screening Interpretation
  interpretHTScreening(answers: Record<string, string>): { interpretation: string; status: string } {
    const riwayatHT = answers['riwayat_ht'] === 'ya';
    const konsumsiGaram = answers['konsumsi_garam'] === 'tinggi';
    const stress = answers['stress'] === 'ya';
    const olahraga = answers['olahraga'] === 'tidak';

    let risiko = 0;
    if (riwayatHT) risiko++;
    if (konsumsiGaram) risiko++;
    if (stress) risiko++;
    if (olahraga) risiko++;

    if (risiko >= 3) {
      return { interpretation: 'Risiko tinggi hipertensi. Segera konsultasi ke tenaga kesehatan.', status: 'abnormal' };
    } else if (risiko >= 2) {
      return { interpretation: 'Risiko sedang hipertensi. Lakukan pencegahan.', status: 'borderline' };
    } else {
      return { interpretation: 'Risiko rendah hipertensi. Lanjutkan gaya hidup sehat.', status: 'normal' };
    }
  },

  // DM Screening Interpretation
  interpretDMScreening(answers: Record<string, string>): { interpretation: string; status: string } {
    const riwayatDM = answers['riwayat_dm'] === 'ya';
    const beratBadan = answers['berat_badan'] === 'berlebih';
    const olahraga = answers['olahraga'] === 'tidak';
    const stressEmosional = answers['stress'] === 'ya';

    let risiko = 0;
    if (riwayatDM) risiko += 2;
    if (beratBadan) risiko++;
    if (olahraga) risiko++;
    if (stressEmosional) risiko++;

    if (risiko >= 4) {
      return { interpretation: 'Risiko sangat tinggi diabetes. Lakukan pemeriksaan gula darah segera.', status: 'abnormal' };
    } else if (risiko >= 2) {
      return { interpretation: 'Risiko tinggi diabetes. Konsultasi dengan tenaga kesehatan.', status: 'borderline' };
    } else {
      return { interpretation: 'Risiko rendah diabetes. Pertahankan gaya hidup sehat.', status: 'normal' };
    }
  },

  // ADL Screening Interpretation
  interpretADLScreening(answers: Record<string, string>): { interpretation: string; status: string } {\n    const kemandirian = Object.values(answers).filter((v) => v === 'tidak').length;\n\n    if (kemandirian >= 6) {\n      return {\n        interpretation: 'Ketergantungan berat. Membutuhkan bantuan dalam aktivitas sehari-hari.',\n        status: 'abnormal',\n      };\n    } else if (kemandirian >= 3) {\n      return {\n        interpretation: 'Ketergantungan ringan. Membutuhkan bantuan untuk beberapa aktivitas.',\n        status: 'borderline',\n      };\n    } else {\n      return {\n        interpretation: 'Mandiri. Dapat melakukan aktivitas sehari-hari tanpa bantuan.',\n        status: 'normal',\n      };\n    }\n  },\n\n  // SKILAS Screening Interpretation\n  interpretSKILASScreening(answers: Record<string, string>): { interpretation: string; status: string } {\n    const masalahKognitif = Object.entries(answers)\n      .filter(([k, v]) => k.includes('kognitif') && v === 'ya')\n      .length;\n\n    if (masalahKognitif >= 3) {\n      return {\n        interpretation: 'Berisiko gangguan kognitif. Perlu pemeriksaan lebih lanjut.',\n        status: 'abnormal',\n      };\n    } else if (masalahKognitif >= 1) {\n      return {\n        interpretation: 'Mungkin ada gangguan kognitif ringan. Pantau perkembangan.',\n        status: 'borderline',\n      };\n    } else {\n      return {\n        interpretation: 'Fungsi kognitif normal.',\n        status: 'normal',\n      };\n    }\n  },\n\n  // Obesity Screening Interpretation\n  interpretObesitasScreening(beratBadan: number, tinggiBadan: number): { imt: number; interpretation: string; status: string } {\n    const tinggiBadanM = tinggiBadan / 100;\n    const imt = beratBadan / (tinggiBadanM * tinggiBadanM);\n\n    if (imt < 18.5) {\n      return { imt: parseFloat(imt.toFixed(1)), interpretation: 'Berat badan kurang. Konsultasi untuk nutrisi yang tepat.', status: 'borderline' };\n    } else if (imt >= 18.5 && imt < 25) {\n      return { imt: parseFloat(imt.toFixed(1)), interpretation: 'Berat badan normal. Pertahankan kondisi ini.', status: 'normal' };\n    } else if (imt >= 25 && imt < 30) {\n      return { imt: parseFloat(imt.toFixed(1)), interpretation: 'Overweight. Tingkatkan aktivitas fisik dan atur pola makan.', status: 'borderline' };\n    } else {\n      return { imt: parseFloat(imt.toFixed(1)), interpretation: 'Obesitas. Segera konsultasi dengan tenaga kesehatan untuk program penurunan berat badan.', status: 'abnormal' };\n    }\n  },\n\n  // PUMA Screening Interpretation\n  interpretPUMAScreening(answers: Record<string, string>): { interpretation: string; status: string } {\n    const malnutrisiIndikator = Object.entries(answers)\n      .filter(([k, v]) => k.includes('gizi') && v === 'kurang')\n      .length;\n\n    if (malnutrisiIndikator >= 3) {\n      return {\n        interpretation: 'Terindikasi malnutrisi. Perbaiki asupan gizi segera.',\n        status: 'abnormal',\n      };\n    } else if (malnutrisiIndikator >= 1) {\n      return {\n        interpretation: 'Risiko malnutrisi. Tingkatkan asupan nutrisi yang seimbang.',\n        status: 'borderline',\n      };\n    } else {\n      return {\n        interpretation: 'Status gizi baik. Pertahankan pola makan yang seimbang.',\n        status: 'normal',\n      };\n    }\n  },\n\n  // TB Screening Interpretation\n  interpretTBScreening(answers: Record<string, string>): { interpretation: string; status: string } {\n    const gejalaDB = Object.entries(answers)\n      .filter(([k, v]) => (k.includes('batuk') || k.includes('demam') || k.includes('berat')) && v === 'ya')\n      .length;\n\n    if (gejalaDB >= 2) {\n      return {\n        interpretation: 'Curiga TB. Segera lakukan pemeriksaan lebih lanjut dengan rontgen atau tes Mantoux.',\n        status: 'abnormal',\n      };\n    } else if (gejalaDB >= 1) {\n      return {\n        interpretation: 'Ada gejala yang perlu diperhatikan. Konsultasi ke tenaga kesehatan.',\n        status: 'borderline',\n      };\n    } else {\n      return {\n        interpretation: 'Tidak ada gejala TB yang mencurigakan.',\n        status: 'normal',\n      };\n    }\n  },\n\n  // Save screening result\n  async saveScreening(screening: SkriningSatu): Promise<string> {\n    const id = screening.id || new Date().getTime().toString();\n    await set(ref(database, `screening/${id}`), {\n      ...screening,\n      createdAt: new Date().toISOString(),\n    });\n    return id;\n  },\n\n  // Get screening by ID\n  async getScreeningById(id: string): Promise<SkriningSatu | null> {\n    const snapshot = await get(ref(database, `screening/${id}`));\n    if (snapshot.exists()) {\n      return {\n        ...snapshot.val(),\n        createdAt: new Date(snapshot.val().createdAt),\n      };\n    }\n    return null;\n  },\n\n  // Get all screenings for a person\n  async getScreeningsByNIK(nik: string): Promise<SkriningSatu[]> {\n    const snapshot = await get(ref(database, 'screening'));\n    const data: SkriningSatu[] = [];\n    if (snapshot.exists()) {\n      const allData = snapshot.val();\n      Object.keys(allData).forEach((key) => {\n        if (allData[key].nik === nik) {\n          data.push({\n            ...allData[key],\n            createdAt: new Date(allData[key].createdAt),\n          });\n        }\n      });\n    }\n    return data;\n  },\n\n  // Update screening\n  async updateScreening(id: string, updates: Partial<SkriningSatu>): Promise<void> {\n    await update(ref(database, `screening/${id}`), {\n      ...updates,\n      updatedAt: new Date().toISOString(),\n    });\n  },\n\n  // Delete screening\n  async deleteScreening(id: string): Promise<void> {\n    await remove(ref(database, `screening/${id}`));\n  },\n};