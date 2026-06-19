'use client'

import { useEffect, useState } from 'react'

type Question = {
  id: number
  type: 'multiple_choice' | 'true_false' | 'matching'
  question?: string
  items?: string[]
  options?: string[]
  pairs?: Record<string, string>
}

type Section = {
  id: number
  title: string
  image?: string | null
  text?: string
  questions: Question[]
}

type Exam = {
  title: string
  instructions: string
  sections: Section[]
}

import examData from './exam.json'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ExamUI() {
  const exam = examData as Exam
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [userData, setUserData] = useState({
    id_calon_siswa: '',
    nama_siswa: '',
    asal_sekolah: '',
    jalur_pendaftaran: ''
  })
  const [showModal, setShowModal] = useState(false) // state modal

  useEffect(() => {
    const storedData = localStorage.getItem('calonSiswa')
    if (storedData) {
      setUserData(JSON.parse(storedData))
    }
  }, [])

  const setAnswer = (qid: number, value: any) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
  }

  const isMatching = (
    q: Question
  ): q is Question & { pairs: Record<string, string> } =>
    q.type === 'matching' && !!q.pairs

  const router = useRouter()

  const handleSubmit = () => {
    axios.post('/api/submitExam', { ...answers, ...userData })
      .then(response => {
        console.log('Exam submitted successfully:', response.data);
        router.push('/tes_pengenalan');
      })
      .catch(error => {
        console.error('Error submitting exam:', error);
      });
  }

  return (
    <div className="min-h-screen bg-[#eef1f5] py-12 px-4 relative">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="
          rounded-3xl p-8
          bg-[#eef1f5]
          shadow-[8px_8px_16px_#cfd4da,-8px_-8px_16px_#ffffff]
        ">
          <h1 className="text-3xl font-bold text-gray-800">
            {exam.title}
          </h1>
          <p className="mt-2 text-gray-600">
            {exam.instructions}
          </p>
        </div>

        {/* SECTIONS */}
        {exam.sections.map(section => (
          <div
            key={section.id}
            className="
              rounded-3xl p-6 space-y-6
              bg-[#eef1f5]
              shadow-[6px_6px_14px_#cfd4da,-6px_-6px_14px_#ffffff]
            "
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {section.title}
            </h2>

            {section.image && (
              <div className="flex justify-center my-4">
                <Image src={section.image} alt={section.title} width={500} height={200} className="max-w-full h-auto rounded-lg" />
              </div>
            )}

            {section.text && (
              <p className="text-sm text-gray-600">
                {section.text}
              </p>
            )}

            {/* QUESTIONS */}
            {section.questions.map(q => (
              <div
                key={q.id}
                className="
                  rounded-2xl p-5 space-y-4
                  bg-[#eef1f5]
                  shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                "
              >
                {q.question && (
                  <p className="font-medium text-gray-800">
                    {q.id}. {q.question}
                    {q.items && (
                      <ul className="list-decimal list-inside mt-2 space-y-1">
                        {q.items.map((item, index) => (<li key={index}>{item}</li>))}
                      </ul>
                    )}
                  </p>
                )}

                {/* MULTIPLE CHOICE */}
                {q.type === 'multiple_choice' &&
                  q.options?.map(opt => (
                    <label
                      key={opt}
                      className="
                        flex items-center gap-3 p-3 rounded-xl cursor-pointer
                        bg-[#eef1f5]
                        shadow-[3px_3px_6px_#cfd4da,-3px_-3px_6px_#ffffff]
                        hover:shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                        transition
                      "
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

                {/* TRUE / FALSE */}
                {q.type === 'true_false' && (
                  <div className="flex gap-4">
                    {[true, false].map(val => (
                      <label
                        key={String(val)}
                        className="
                          flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer
                          bg-[#eef1f5]
                          shadow-[3px_3px_6px_#cfd4da,-3px_-3px_6px_#ffffff]
                          hover:shadow-[inset_3px_3px_6px_#cfd4da,inset_-3px_-3px_6px_#ffffff]
                        "
                      >
                        <input
                          type="radio"
                          name={`q-${q.id}`}
                          checked={answers[q.id] === val}
                          onChange={() => setAnswer(q.id, val)}
                        />
                        {val ? 'Benar' : 'Salah'}
                      </label>
                    ))}
                  </div>
                )}

                {/* MATCHING */}
                {isMatching(q) && (
                  <div className="space-y-3">
                    {Object.entries(q.pairs).map(([key, val]) => (
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
        <div className="text-center">
          <button
            onClick={() => setShowModal(true)}
            className="
              px-8 py-3 rounded-2xl font-semibold
              bg-[#eef1f5] text-blue-600
              shadow-[6px_6px_14px_#cfd4da,-6px_-6px_14px_#ffffff]
              hover:shadow-[inset_4px_4px_8px_#cfd4da,inset_-4px_-4px_8px_#ffffff]
              transition
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
