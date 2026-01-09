import { MultipleChoiceForm } from './question/form/MultipleChoiceForm'
import { EssayForm } from './question/form/EssayForm'
import { MatchingForm } from './question/form/MatchingForm'
import { ImageToggle } from './question/form/ImageToggle'

export const QuestionForm = ({ data, setData }: any) => (
  <>
    {/* GAMBAR – GLOBAL */}
    <ImageToggle
      image={data.image}
      onChange={(img: any) =>
        setData({ ...data, image: img })
      }
    />

    {data.types.includes('PG') && (
      <MultipleChoiceForm
        data={data}
        onChange={(v: any) =>
          setData({ ...data, ...v })
        }
      />
    )}

    {data.types.includes('ESSAY') && (
      <EssayForm
        value={data.essayAnswer}
        onChange={(v: string) =>
          setData({ ...data, essayAnswer: v })
        }
      />
    )}

    {data.types.includes('MATCH') && (
      <MatchingForm
        pairs={data.matchPairs}
        onChange={(v: any) =>
          setData({ ...data, matchPairs: v })
        }
      />
    )}

    {data.types.includes('MORE') && (
      <MatchingForm
        pairs={data.matchPairs}
        onChange={(v: any) =>
          setData({ ...data, matchPairs: v })
        }
      />
    )}
  </>
)
