import type { MatchItem, MatchAnswer } from './match.dto'

/* =========================
   QUESTION TYPE
========================= */
export type QuestionType = 'PG' | 'ESSAY' | 'MATCH' | 'MORE'

/* =========================
   IMAGE (OPSIONAL)
========================= */
export interface QuestionImage {
  file?: File
  previewUrl?: string
}

/* =========================
   MAIN QUESTION DRAFT
========================= */
export interface QuestionDraft {
   category?: string
  // metadata
  date: string               // tanggal soal
  number: number           // nomor urut soal
  wacana?: string            // wacana soal (opsional)
  question: string           // teks soal utama
  types: QuestionType[]      // bisa PG / ESSAY / MATCH (atau kombinasi)

  // shared (opsional untuk semua jenis)
  image?: QuestionImage

  /* ---------- PILIHAN GANDA ---------- */
  options: string[]          // daftar opsi
  correctAnswer: number      // index jawaban benar

  /* ---------- ESSAY ---------- */
  essayAnswer: string        // kunci jawaban / panduan koreksi

  /* ---------- MATCHING ---------- */
  matchInstruction: string   // instruksi pengerjaan
  leftItems: MatchItem[]     // item kolom kiri
  rightItems: MatchItem[]    // item kolom kanan (boleh diacak)
  matchAnswers: MatchAnswer[]// mapping jawaban benar

  // status
  isDraft: boolean           // draft / final
}
