import { QuestionType } from '@/dto/question.dto'

const TYPES: { label: string; value: QuestionType }[] = [
  { label: 'Pilihan Ganda', value: 'PG' },
  { label: 'Essay / Isian', value: 'ESSAY' },
  { label: 'Menjodohkan', value: 'MATCH' },
  { label: 'Lainnya', value: 'MORE' },
]

interface Props {
  value: QuestionType[]
  onChange: (types: QuestionType[]) => void
}

export const QuestionTypeSelector = ({ value, onChange }: Props) => {
  const toggle = (type: QuestionType) => {
    onChange(
      value.includes(type)
        ? value.filter((t) => t !== type)
        : [...value, type]
    )
  }

  return (
    <div className="mt-3">
      <label className="text-xs font-semibold">
        Jenis Soal
      </label>

      <div className="flex gap-4 flex-wrap mt-1">
        {TYPES.map((t) => (
          <label
            key={t.value}
            className="flex items-center gap-1 text-[10px] font-semibold cursor-pointer"
          >
            <input
              type="checkbox"
              checked={value.includes(t.value)}
              onChange={() => toggle(t.value)}
            />
            {t.label}
          </label>
        ))}
      </div>
    </div>
  )
}
