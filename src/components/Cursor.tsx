import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const [hovering, setHovering] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setHidden(false)
    }
    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const onHoverIn = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.matches('a, button, [data-cursor="pointer"]')) setHovering(true)
    }
    const onHoverOut = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.matches('a, button, [data-cursor="pointer"]')) setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onHoverIn)
    document.addEventListener('mouseout', onHoverOut)

    let raf: number
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1)

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
      }
      if (ringRef.current) {
        const r = hovering ? 52 : 36
        ringRef.current.style.transform = `translate(${ring.current.x - r / 2}px, ${ring.current.y - r / 2}px)`
        ringRef.current.style.width = `${r}px`
        ringRef.current.style.height = `${r}px`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onHoverIn)
      document.removeEventListener('mouseout', onHoverOut)
    }
  }, [hovering])

  // Only show on non-touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <>
      {/* Dot — follows exactly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '8px', height: '8px',
          borderRadius: '50%',
          backgroundColor: '#0AFFD9',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — lags with lerp */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '36px', height: '36px',
          borderRadius: '50%',
          border: `1.5px solid rgba(10,255,217,${hovering ? 0.8 : 0.45})`,
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s, border-color 0.2s, width 0.25s, height 0.25s',
          willChange: 'transform',
          backdropFilter: hovering ? 'blur(2px)' : 'none',
          backgroundColor: hovering ? 'rgba(10,255,217,0.06)' : 'transparent',
        }}
      />
    </>
  )
}
