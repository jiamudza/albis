export const ImageToggle = ({ image, onChange }: any) => (
  <div className="mt-3">
    <label className="text-xs font-semibold flex gap-2 items-center">
      <input
        type="checkbox"
        checked={!!image}
        onChange={(e) =>
          onChange(
            e.target.checked
              ? { file: null, previewUrl: '' }
              : undefined
          )
        }
      />
      Sertakan Gambar
    </label>

    {image && (
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (!file) return

          onChange({
            file,
            previewUrl: URL.createObjectURL(file),
          })
        }}
        className="text-xs mt-2"
      />
    )}

    {image?.previewUrl && (
      <img
        src={image.previewUrl}
        className="mt-2 max-h-40 rounded-md border"
      />
    )}
  </div>
)
