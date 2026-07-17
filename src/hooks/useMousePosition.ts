import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  useEffect(() => {
    const fn = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])
  return pos
}
