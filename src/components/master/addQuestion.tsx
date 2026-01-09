'use client'

import { useEffect, useState } from 'react'
import { useQuestionDraft } from '@/hooks/useQuestionDraft'
import { QuestionForm } from './questionForm'
import { QuestionTypeSelector } from './question/form/QuestionTypeSelector'
import type { QuestionDraft, QuestionType } from '@/dto/question.dto'
import axios from 'axios'
import { clear } from 'console'

const DEFAULT: QuestionDraft = {
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

    // image file (Cloudinary)
    if (data.image?.file) {
      formData.append('image', data.image.file)
    }

    // debug jika perlu
    // for (const [k, v] of formData.entries()) {
    //   console.log(k, v)
    // }

    axios.post('http://localhost:5000/api/questions', formData, {
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-1/10 text-sm font-semibold bg-primary text-white px-2 py-1 rounded-md hover:bg-accent transition-colors ease-in-out duration-200 hover:border-b-3 border-b-primary"
      >
        Add Question
      </button>

      {open && (
        <div className="w-full h-screen overflow-auto absolute-center bg-white/60 backdrop-blur-lg">
          <div className="bg-white border border-slate-200 border-b-3 border-b-accent absolute-center rounded-md shadow-md p-4 w-2/3">

            <div
              onClick={() => setOpen(false)}
              className="w-6 h-6 bg-red-400 text-center align-center font-semibold text-white rounded-tr-md rounded-bl-md absolute right-0 top-0 cursor-pointer"
            >
              x
            </div>

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
              <h3 className="text-xs font-semibold">Tambah Soal</h3>
              <input
                value={data.question}
                onChange={(e) =>
                  setData({ ...data, question: e.target.value })
                }
                className="border border-slate-200 rounded-full focus:outline-accent focus:outline w-full mt-2 px-3 py-2 text-xs"
                placeholder="Tulis soal"
              />
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

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => saveDraft(data)}
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
