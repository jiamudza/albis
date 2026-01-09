'use client'

import { useEffect, useState } from 'react'
import { useQuestionDraft } from '@/hooks/useQuestionDraft'
import { QuestionForm } from './questionForm'
import { QuestionTypeSelector } from './question/form/QuestionTypeSelector'
import type { QuestionDraft, QuestionType } from '@/dto/question.dto'
import axios from 'axios'
import { clear } from 'console'

const DEFAULT: QuestionDraft & { category?: string } = {
  category: '',
  date: new Date().toISOString().slice(0, 10),
  number: 1,
  question: '',
  types: [],

  image: undefined,

  // PG
  options: ['', '', '', ''],
  correctAnswer: 0,

  // Essay
  essayAnswer: '',

  // MATCH
  matchInstruction: '',
  leftItems: [
    { id: 'L1', text: '' },
    { id: 'L2', text: '' }
  ],
  rightItems: [
    { id: 'R1', text: '' },
    { id: 'R2', text: '' }
  ],
  matchAnswers: [],

  isDraft: true
}

export default function AddQuestion() {
  const [open, setOpen] = useState(false)
  const { draft, saveDraft } = useQuestionDraft()

  const [data, setData] = useState<QuestionDraft>(draft ?? DEFAULT)

  // load draft jika ada
  useEffect(() => {
    if (draft) setData(draft)
  }, [draft])

  const handleSubmit = (data: QuestionDraft) => {
    console.log('Submitting question:', data)

    const formData = new FormData()

    // primitive fields
    formData.append('date', data.date)
    formData.append('number', String(data.number))
    formData.append('question', data.question)
    formData.append('correctAnswer', String(data.correctAnswer))
    formData.append('essayAnswer', data.essayAnswer)
    formData.append('matchInstruction', data.matchInstruction)
    formData.append('isDraft', String(data.isDraft))

    // JSON fields (stringify karena backend pakai JSON.parse)
    formData.append('types', JSON.stringify(data.types))
    formData.append('options', JSON.stringify(data.options))
    formData.append('leftItems', JSON.stringify(data.leftItems))
    formData.append('rightItems', JSON.stringify(data.rightItems))
    formData.append('matchAnswers', JSON.stringify(data.matchAnswers))
    formData.append('wacana', data.wacana || '')
    formData.append('category', (data as any).category || '')

    // image file (Cloudinary)
    if (data.image?.file) {
      formData.append('image', data.image.file)
    }

    // debug jika perlu
    // for (const [k, v] of formData.entries()) {
    //   console.log(k, v)
    // }

    axios.post('/api/questions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log('Question submitted successfully:', res.data)
        setOpen(false)
        localStorage.removeItem('questionDraft')
      })
      .catch(err => {
        console.error('Error submitting question:', err)
      })
  }

  const addOption = () => {
  setData(prev => ({
    ...prev,
    options: [...prev.options, '']
  }))
}

const removeOption = (index: number) => {
  setData(prev => {
    const nextOptions = prev.options.filter((_, i) => i !== index)

    return {
      ...prev,
      options: nextOptions,
      correctAnswer:
        prev.correctAnswer >= nextOptions.length
          ? 0
          : prev.correctAnswer
    }
  })
}


  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-1/10 text-sm font-semibold bg-primary text-white px-2 py-1 rounded-md hover:bg-accent transition-colors ease-in-out duration-200 hover:border-b-3 border-b-primary"
      >
        Add Question
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-white/60 backdrop-blur-lg overflow-y-auto">
            <div
              onClick={() => setOpen(false)}
              className="w-6 h-6 bg-red-400 text-center align-center font-semibold text-white rounded-tr-md rounded-bl-md absolute right-0 top-0 cursor-pointer"
            >
              x
            </div>
          <div className="relative mx-auto mt-10 bg-white max-h-[85vh] overflow-y-auto border border-slate-200 border-b-3 border-b-accent rounded-md shadow-md p-4 w-2/3">


            {/* Keterangan */}
            <div>
              <h3 className="text-xs font-semibold">Keterangan</h3>
              <input
                type="text"
                className="border border-slate-200 rounded-full focus:outline-accent focus:outline w-full mt-2 px-3 py-2 text-xs"
                placeholder="Keterangan singkat untuk soal ini"
              />
            </div>

            {/* Soal */}
            <div className="mt-4">
              <h3 className="text-xs font-semibold">Wacana (Opsional)</h3>
              <textarea
                value={data.wacana}
                onChange={(e) =>
                  setData({ ...data, wacana: e.target.value })
                }
                className="border border-slate-200 rounded-xs focus:outline-accent focus:outline w-full h-60 mt-2 px-3 py-2 text-xs"
                placeholder="Wacana soal (jika ada)"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xs font-semibold">Tambah Soal</h3>
              <textarea
                value={data.question}
                onChange={(e) =>
                  setData({ ...data, question: e.target.value })
                }
                className="border border-slate-200 rounded-xs focus:outline-accent focus:outline w-full h-20 mt-2 px-3 py-2 text-xs"
                placeholder="Tulis soal"
              />
            </div>
            <div>
  <label className="block text-xs font-semibold text-slate-600 mb-2">
    Kategori Soal
  </label>

  <div className="grid grid-cols-2 gap-3 text-xs">
    {[
      { value: 'akademik', label: 'Akademik' },
      { value: 'pengenalan', label: 'Pengenalan' },
      { value: 'gaya_belajar', label: 'Gaya Belajar' }
    ].map(cat => (
      <label
        key={cat.value}
        className="flex items-center gap-2 cursor-pointer rounded-lg border border-slate-300 px-3 py-2 hover:border-accent transition"
      >
        <input
          type="radio"
          name="category"
          value={cat.value}
          checked={data.category === cat.value}
          onChange={() =>
            setData({ ...data, category: cat.value })
          }
          className="accent-accent"
        />
        {cat.label}
      </label>
    ))}
  </div>
</div>


            {/* PILIH JENIS SOAL */}
            <QuestionTypeSelector
              value={data.types}
              onChange={(types: QuestionType[]) =>
                setData({ ...data, types })
              }
            />

            {/* FORM DINAMIS */}
            <QuestionForm data={data} setData={setData} />

            {data.types.includes('PG') && (
  <div className="mt-4 space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-xs font-semibold">Pilihan Ganda</h3>

      <button
        type="button"
        onClick={addOption}
        className="text-xs bg-primary text-white px-2 py-1 rounded hover:bg-accent transition"
      >
        + Tambah Opsi
      </button>
    </div>

    {data.options.map((opt, i) => (
      <div
        key={i}
        className="flex items-center gap-2 border border-slate-200 rounded px-2 py-1"
      >
        <input
          type="radio"
          name="correctAnswer"
          checked={data.correctAnswer === i}
          onChange={() =>
            setData({ ...data, correctAnswer: i })
          }
          className="accent-accent"
        />

        <input
          value={opt}
          onChange={e => {
            const options = [...data.options]
            options[i] = e.target.value
            setData({ ...data, options })
          }}
          placeholder={`Opsi ${i + 1}`}
          className="flex-1 border border-slate-300 rounded px-2 py-1 text-xs focus:outline-accent"
        />

        {data.options.length > 2 && (
          <button
            type="button"
            onClick={() => removeOption(i)}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            ✕
          </button>
        )}
      </div>
    ))}

    <p className="text-[10px] text-slate-500">
      Minimal 2 opsi. Pilih satu sebagai jawaban benar.
    </p>
  </div>
)}


            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  saveDraft(data)
                  setOpen(false)
                }
                }
                className="text-xs bg-slate-400 text-white px-2 py-1 rounded"
              >
                Simpan Draft
              </button>

              <button
                onClick={() => handleSubmit(data)}
                className="text-xs bg-accent text-white px-2 py-1 rounded"
              >
                Submit
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
