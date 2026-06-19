'use client'

interface Props {
  options: string[]
  correctAnswers: number[]
  onChange: (payload: {
    options: string[]
    correctAnswers: number[]
  }) => void
}

export function MultiChoiceForm({
  options,
  correctAnswers,
  onChange
}: Props) {
  const updateOption = (index: number, value: string) => {
    const next = [...options]
    next[index] = value
    onChange({ options: next, correctAnswers })
  }

  const toggleCorrect = (index: number) => {
    const set = new Set(correctAnswers)
    set.has(index) ? set.delete(index) : set.add(index)
    onChange({ options, correctAnswers: Array.from(set) })
  }

  const addOption = () => {
    onChange({
      options: [...options, ''],
      correctAnswers
    })
  }

  const removeOption = (index: number) => {
    onChange({
      options: options.filter((_, i) => i !== index),
      correctAnswers: correctAnswers
        .filter(i => i !== index)
        .map(i => (i > index ? i - 1 : i))
    })
  }

  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-xs font-semibold">
        Pilihan Lebih Dari Satu
      </h3>

      {options.map((opt, i) => (
        <div
          key={i}
          className="flex items-center gap-2 border rounded px-2 py-1"
        >
          <input
            type="checkbox"
            checked={correctAnswers.includes(i)}
            onChange={() => toggleCorrect(i)}
            className="accent-accent"
          />

          <input
            value={opt}
            onChange={e => updateOption(i, e.target.value)}
            placeholder={`Opsi ${i + 1}`}
            className="flex-1 border rounded px-2 py-1 text-xs"
          />

          {options.length > 2 && (
            <button
              type="button"
              onClick={() => removeOption(i)}
              className="text-xs bg-red-500 text-white px-2 py-1 rounded"
            >
              ✕
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addOption}
        className="text-xs bg-primary text-white px-3 py-1 rounded"
      >
        + Tambah Opsi
      </button>

      <p className="text-[10px] text-slate-500">
        Centang semua jawaban yang benar
      </p>
    </div>
  )
}
