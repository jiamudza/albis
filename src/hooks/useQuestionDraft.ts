import { useEffect, useState } from 'react'
import { QuestionDraft } from '@/dto/question.dto'

const STORAGE_KEY = 'questionDraft'

export const useQuestionDraft = () => {
  const [draft, setDraft] = useState<QuestionDraft | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setDraft(JSON.parse(saved))
  }, [])

  const saveDraft = (data: QuestionDraft) => {
    setDraft(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY)
    setDraft(null)
  }

  return { draft, saveDraft, clearDraft }
}
