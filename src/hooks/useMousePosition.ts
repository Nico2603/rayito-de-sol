import { useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

/**
 * Hook que rastrea la posición del mouse con spring physics.
 * Ideal para componentes React que necesitan seguir el cursor suavemente.
 */
export function useSpringMousePosition(
  springConfig = { stiffness: 120, damping: 18 },
) {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    if (!isMouseDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseLeave = () => {
      mouseX.set(-1000)
      mouseY.set(-1000)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return { x: springX, y: springY }
}

/**
 * Hook que almacena la posición del puntero en un ref mutable.
 * Mouse en desktop; touchmove en dispositivos táctiles. Ideal para loops canvas.
 */
export function useCanvasMousePosition() {
  const pointerRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const reset = () => {
      pointerRef.current.x = -1000
      pointerRef.current.y = -1000
    }

    const setFromTouch = (touches: TouchList) => {
      if (touches.length === 0) return
      const touch = touches[0]
      pointerRef.current.x = touch.clientX
      pointerRef.current.y = touch.clientY
    }

    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX
      pointerRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      reset()
    }

    const handleTouchStart = (e: TouchEvent) => {
      setFromTouch(e.touches)
    }

    const handleTouchMove = (e: TouchEvent) => {
      setFromTouch(e.touches)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        reset()
        return
      }
      setFromTouch(e.touches)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [])

  return pointerRef
}

/**
 * Detecta si el dispositivo tiene un puntero fino (mouse) o táctil.
 */
export function useIsMouseDevice() {
  const isMouse = useRef(false)

  useEffect(() => {
    isMouse.current = window.matchMedia('(pointer: fine)').matches
  }, [])

  return isMouse
}
