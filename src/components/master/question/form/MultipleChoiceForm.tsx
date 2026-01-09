export const MultipleChoiceForm = ({ data, onChange }: any) => (
  <div className="mt-3">
    <label className="text-xs font-semibold">Pilihan Ganda</label>

    {data.options.map((opt: string, i: number) => (
      <div key={i} className="flex gap-2 mt-1">
        <input
          type="radio"
          checked={data.correctAnswer === i}
          onChange={() => onChange({ correctAnswer: i })}
        />
        <input
          value={opt}
          onChange={(e) => {
            const options = [...data.options]
            options[i] = e.target.value
            onChange({ options })
          }}
          className="border rounded-full px-3 py-1 text-xs flex-1"
          placeholder={`Opsi ${i + 1}`}
        />
      </div>
    ))}
  </div>
)
