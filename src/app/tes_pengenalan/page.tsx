'use client'

import { useEffect, useState } from 'react'

type QuestionType =
  | 'multiple_choice'
  | 'checkbox'
  | 'true_false'
  | 'short_answer'
  | 'paragraph'
  | 'matching'

type Question = {
  id: number
  type: QuestionType
  question: string
  options?: string[]
  pairs?: Record<string, string>
}

type Section = {
  id: number
  title: string
  text?: string
  questions: Question[]
}

type Exam = {
  title: string
  instructions?: string
  sections: Section[]
}

import examData from './exam.json'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ExamRenderer() {
  const exam = examData as Exam
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showModal, setShowModal] = useState(false) // state modal

  const setAnswer = (qid: number, value: any) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  const toggleCheckbox = (qid: number, option: string) => {
    const current: string[] = answers[qid] || []
    setAnswer(
      qid,
      current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
    )
  }

  const isMatching = (
    q: Question
  ): q is Question & { pairs: Record<string, string> } =>
    q.type === 'matching' && !!q.pairs

  const [userData, setUserData] = useState({
    id_calon_siswa: '',
    nama_siswa: '',
    asal_sekolah: '',
    jalur_pendaftaran: ''
  })
  const router = useRouter()

  useEffect(() => {
    const storedData = localStorage.getItem('calonSiswa')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const handleSubmit = () => {
    axios.post('/api/submitExam', { ...answers, ...userData })
      .then(response => {
        console.log('Exam submitted successfully:', response.data);
        router.push('/tes_cara_belajar');
      })
      .catch(error => {
        console.error('Error submitting exam:', error);
      });
  }

  return (
    <div className="min-h-screen bg-[#eef1f5] py-10 relative">
      <div className="max-w-4xl mx-auto px-6 space-y-10">

        {/* HEADER */}
        <div className="p-8 rounded-2xl bg-[#eef1f5]
          shadow-[8px_8px_16px_#cfd4da,-8px_-8px_16px_#ffffff]">
          <h1 className="text-3xl font-bold text-gray-800">
            {exam.title}
          </h1>
          {exam.instructions && (
            <p className="mt-3 text-gray-600">
              {exam.instructions}
            </p>
          )}
        </div>

        {exam.sections.map(section => (
          <div key={section.id} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-700">
              {section.title}
            </h2>

            {section.text && (
              <p className="text-gray-600 text-sm">
                {section.text}
              </p>
            )}

            {section.questions.map(q => (
              <div
                key={q.id}
                className="p-6 rounded-2xl bg-[#eef1f5]
                shadow-[6px_6px_12px_#cfd4da,-6px_-6px_12px_#ffffff]
                space-y-4"
              >
                <p className="font-medium text-gray-800">
                  {q.id}. {q.question}
                </p>

                {/* MULTIPLE CHOICE */}
                {q.type === 'multiple_choice' &&
                  q.options?.map(opt => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 p-3 rounded-xl
                      bg-[#eef1f5]
                      shadow-[inset_2px_2px_5px_#cfd4da,inset_-2px_-2px_5px_#ffffff]
                      cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={answers[q.id] === opt}
                        onChange={() => setAnswer(q.id, opt)}
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                {/* CHECKBOX */}
                {q.type === 'checkbox' &&
                  q.options?.map(opt => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 p-3 rounded-xl
                      bg-[#eef1f5]
                      shadow-[inset_2px_2px_5px_#cfd4da,inset_-2px_-2px_5px_#ffffff]
                      cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={(answers[q.id] || []).includes(opt)}
                        onChange={() => toggleCheckbox(q.id, opt)}
                      />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}

                {/* SHORT ANSWER */}
                {q.type === 'short_answer' && (
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    className="
                      w-full px-4 py-3 rounded-xl bg-[#eef1f5]
                      shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                      focus:outline-none
                    "
                  />
                )}

                {/* PARAGRAPH */}
                {q.type === 'paragraph' && (
                  <textarea
                    rows={4}
                    value={answers[q.id] || ''}
                    onChange={e => setAnswer(q.id, e.target.value)}
                    className="
                      w-full px-4 py-3 rounded-xl bg-[#eef1f5]
                      shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                      focus:outline-none
                    "
                  />
                )}

                {/* MATCHING */}
                {isMatching(q) && (
                  <div className="space-y-3">
                    {Object.keys(q.pairs).map(key => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="w-32 text-gray-700">
                          {key}
                        </span>
                        <select
                          value={answers[q.id]?.[key] || ''}
                          onChange={e =>
                            setAnswer(q.id, {
                              ...(answers[q.id] || {}),
                              [key]: e.target.value
                            })
                          }
                          className="
                            flex-1 px-4 py-2 rounded-xl bg-[#eef1f5]
                            shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                            focus:outline-none
                          "
                        >
                          <option value="">Pilih</option>
                          {Object.values(q.pairs).map(v => (
                            <option key={v} value={v}>{v}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}

        {/* SUBMIT */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowModal(true)}
            className="
              px-6 py-3 rounded-2xl bg-[#eef1f5] font-medium
              shadow-[6px_6px_12px_#cfd4da,-6px_-6px_12px_#ffffff]
              active:shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
            "
          >
            Lanjut
          </button>
        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Konfirmasi</h3>
            <p className="text-gray-600">Apakah Anda yakin ingin melanjutkan?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
              >
                Batal
              </button>
              <button
                onClick={() => { handleSubmit(); setShowModal(false) }}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
