/** Small 2D-canvas helpers used to paint the glass card textures. */

export type Ctx = CanvasRenderingContext2D

export const FONT_DISPLAY = '"Sora", "Segoe UI", system-ui, -apple-system, sans-serif'
export const FONT_BODY = '"DM Sans", "Segoe UI", system-ui, -apple-system, sans-serif'

export const CYAN = '#00E5FF'
export const VIOLET = '#8B5CF6'

export function hexToRgba(hex: string, alpha: number): string {
  const value = hex.replace('#', '')
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export function roundedRectPath(ctx: Ctx, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + w, y, x + w, y + h, radius)
  ctx.arcTo(x + w, y + h, x, y + h, radius)
  ctx.arcTo(x, y + h, x, y, radius)
  ctx.arcTo(x, y, x + w, y, radius)
  ctx.closePath()
}

/** Frosted fill plus a thin gradient border. `accent` is any CSS colour string. */
export function drawGlassBase(ctx: Ctx, w: number, h: number, radius: number, accent: string) {
  const inset = 4
  roundedRectPath(ctx, inset, inset, w - inset * 2, h - inset * 2, radius)

  const fill = ctx.createLinearGradient(0, 0, w, h)
  fill.addColorStop(0, 'rgba(255, 255, 255, 0.16)')
  fill.addColorStop(0.55, 'rgba(255, 255, 255, 0.05)')
  fill.addColorStop(1, 'rgba(139, 92, 246, 0.12)')
  ctx.fillStyle = fill
  ctx.fill()

  const border = ctx.createLinearGradient(0, 0, w, h)
  border.addColorStop(0, 'rgba(255, 255, 255, 0.6)')
  border.addColorStop(0.5, 'rgba(255, 255, 255, 0.14)')
  border.addColorStop(1, accent)
  ctx.lineWidth = 3
  ctx.strokeStyle = border
  ctx.stroke()
}

interface ChipStyle {
  font: string
  height: number
  padX: number
  color: string
  background: string
  border: string
}

export const DEFAULT_CHIP: ChipStyle = {
  font: `600 24px ${FONT_BODY}`,
  height: 52,
  padX: 22,
  color: '#E2E8F0',
  background: 'rgba(255, 255, 255, 0.08)',
  border: 'rgba(255, 255, 255, 0.22)',
}

export function measureChip(ctx: Ctx, text: string, style: ChipStyle = DEFAULT_CHIP): number {
  ctx.font = style.font
  return Math.ceil(ctx.measureText(text).width + style.padX * 2)
}

/** Draws one pill with its top-left corner at (x, y). Returns its width. */
export function drawChip(
  ctx: Ctx,
  text: string,
  x: number,
  y: number,
  style: ChipStyle = DEFAULT_CHIP,
): number {
  const width = measureChip(ctx, text, style)
  roundedRectPath(ctx, x, y, width, style.height, style.height / 2)
  ctx.fillStyle = style.background
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = style.border
  ctx.stroke()

  ctx.font = style.font
  ctx.fillStyle = style.color
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, x + style.padX, y + style.height / 2 + 1)
  return width
}

/** Draws a horizontally centred row of chips. `y` is the top of the row. */
export function drawChipRow(
  ctx: Ctx,
  labels: string[],
  centerX: number,
  y: number,
  gap = 14,
  style: ChipStyle = DEFAULT_CHIP,
) {
  const widths = labels.map((label) => measureChip(ctx, label, style))
  const total = widths.reduce((sum, value) => sum + value, 0) + gap * (labels.length - 1)
  let x = centerX - total / 2
  labels.forEach((label, index) => {
    drawChip(ctx, label, x, y, style)
    x += widths[index] + gap
  })
}
