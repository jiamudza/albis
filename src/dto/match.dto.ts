// Item di kolom kiri atau kanan
export interface MatchItem {
  id: string          // identifier unik (L1, R3, dll)
  text: string        // isi teks
}

// Jawaban benar (mapping)
export interface MatchAnswer {
  leftId: string      // id item kiri
  rightId: string     // id item kanan yang BENAR
}
