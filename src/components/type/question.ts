interface Question {
  date: string
  number: number
  types: string[]        // ["PG", "ESSAY", "MATCH", "IMAGE"]
  question: string
  options?: string[]     // khusus PG
  correctAnswer?: number // index jawaban benar PG
  essayAnswer?: string
  matchPairs?: { left: string; right: string }[]
  image?: File | null
}

export type { Question }