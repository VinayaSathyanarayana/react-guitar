import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUpdateEffect } from 'react-use'

const parse = (text: any) => {
  const strings: { midi: number; fret: number }[] = []
  const regex = /\(([\d-]+)\|([\d-]+)\)/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index === regex.lastIndex) {
      regex.lastIndex++
    }
    strings.push({
      midi: parseInt(match[1]),
      fret: parseInt(match[2])
    })
  }

  return strings.length ? strings : null
}

export default function useQuery(initialSate: {
  strings: number[]
  tuning: number[]
}) {
  const router = useRouter()
  const queryStrings = parse(router.query.strings)
  const [tuning, setTuning] = useState(
    queryStrings?.map(({ midi }) => midi) || initialSate.tuning
  )
  const [strings, setStrings] = useState(
    queryStrings?.map(({ fret }) => fret) || initialSate.strings
  )

  useUpdateEffect(() => {
    router.replace({ pathname: '/' })
  }, [tuning, strings])

  return {
    url: `${process.env.NEXT_PUBLIC_URL}?strings=${tuning
      .map((midi, i) => `(${midi}|${strings[i] ?? 0})`)
      .join('')}`,
    strings,
    tuning,
    setStrings,
    setTuning
  }
}
