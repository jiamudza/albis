export const MatchingForm = ({ pairs = [], onChange }: any) => (
  <div className="mt-3">
    <label className="text-xs font-semibold">Menjodohkan</label>

    {pairs.map((p: any, i: number) => (
      <div key={i} className="flex gap-2 mt-1">
        <input
          value={p.left}
          placeholder="Kiri"
          onChange={(e) => {
            const newPairs = [...pairs]
            newPairs[i].left = e.target.value
            onChange(newPairs)
          }}
          className="border px-2 py-1 text-xs"
        />
        <input
          value={p.right}
          placeholder="Kanan"
          onChange={(e) => {
            const newPairs = [...pairs]
            newPairs[i].right = e.target.value
            onChange(newPairs)
          }}
          className="border px-2 py-1 text-xs"
        />
      </div>
    ))}
  </div>
)
