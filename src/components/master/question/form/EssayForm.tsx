export const EssayForm = ({ value, onChange }: any) => (
  <div className="mt-3">
    <label className="text-xs font-semibold">Jawaban Essay</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-md px-3 py-2 text-xs"
    />
  </div>
)
