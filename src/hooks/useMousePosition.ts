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
 * Hook que almacena la posición del mouse en un ref mutable.
 * Ideal para animation loops con canvas (no causa re-renders).
 */
export function useCanvasMousePosition() {
  const mouseRef = useRef({ x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 })

  useEffect(() => {
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches
    if (!isMouseDevice) {
      mouseRef.current = { x: -1000, y: -1000, smoothX: -1000, smoothY: -1000 }
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return mouseRef
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
