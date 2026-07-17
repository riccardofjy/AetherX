import { useState, useRef, useCallback } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

interface Props {
  text: string
  style?: React.CSSProperties
  className?: string
  tag?: keyof React.JSX.IntrinsicElements
}

export default function TextScramble({ text, style, className, tag: Tag = 'span' }: Props) {
  const [display, setDisplay] = useState(text)
  const raf = useRef<number | null>(null)

  const scramble = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    let iteration = 0
    const total = text.length * 2

    const tick = () => {
      const next = text
        .split('')
        .map((ch, i) => {
          if (i < iteration / 2) return ch
          if (ch === ' ') return ' '
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplay(next)
      iteration++
      if (iteration <= total) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    raf.current = requestAnimationFrame(tick)
  }, [text])

  const reset = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current)
    setDisplay(text)
  }, [text])

  return (
    <Tag
      className={className}
      style={{ ...style, fontVariantNumeric: 'tabular-nums', cursor: 'default' }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {display}
    </Tag>
  )
}
