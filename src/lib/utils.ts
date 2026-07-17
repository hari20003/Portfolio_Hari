import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * True only when WebGL is hardware-accelerated. Software rasterizers
 * (SwiftShader/llvmpipe) crawl at ~1fps with a fullscreen particle field,
 * so callers should fall back to CSS effects.
 */
export function hasHardwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ?? canvas.getContext('webgl')) as WebGLRenderingContext | null
    if (!gl) return false
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer)
  } catch {
    return false
  }
}

export const scrollToId = (id: string) => {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = (window as any).__lenis
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
