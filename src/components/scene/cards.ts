import {
  CYAN,
  VIOLET,
  FONT_BODY,
  FONT_DISPLAY,
  drawChip,
  drawChipRow,
  drawGlassBase,
  hexToRgba,
  measureChip,
  roundedRectPath,
  type Ctx,
} from './drawing'

/* ---------- Main profile card (768 x 960) ---------- */

export function drawProfileCard(ctx: Ctx, w: number, h: number) {
  drawGlassBase(ctx, w, h, 56, hexToRgba(CYAN, 0.8))
  const cx = w / 2

  // Avatar ring with MP monogram
  const ring = ctx.createLinearGradient(cx - 112, 138, cx + 112, 362)
  ring.addColorStop(0, CYAN)
  ring.addColorStop(1, VIOLET)
  ctx.beginPath()
  ctx.arc(cx, 250, 112, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(7, 11, 20, 0.55)'
  ctx.fill()
  ctx.lineWidth = 6
  ctx.strokeStyle = ring
  ctx.stroke()

  ctx.fillStyle = ring
  ctx.font = `700 84px ${FONT_DISPLAY}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('MP', cx, 256)

  // Name, role, location
  ctx.fillStyle = '#F8FAFC'
  ctx.font = `700 50px ${FONT_DISPLAY}`
  ctx.fillText('Manant Prajapati', cx, 438)

  ctx.fillStyle = CYAN
  ctx.font = `600 32px ${FONT_DISPLAY}`
  ctx.fillText('Full-Stack Developer', cx, 500)

  ctx.fillStyle = '#94A3B8'
  ctx.font = `500 27px ${FONT_BODY}`
  ctx.fillText('Patan, Gujarat', cx, 552)

  // Divider
  ctx.beginPath()
  ctx.moveTo(96, 610)
  ctx.lineTo(w - 96, 610)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)'
  ctx.stroke()

  // Technology chips
  drawChipRow(ctx, ['React', 'Angular', 'Laravel'], cx, 650)
  drawChipRow(ctx, ['TypeScript', 'Three.js'], cx, 722)

  // Availability
  const label = 'Available for opportunities'
  ctx.font = `500 25px ${FONT_BODY}`
  const textWidth = ctx.measureText(label).width
  const total = 18 + 16 + textWidth
  const startX = cx - total / 2
  ctx.beginPath()
  ctx.arc(startX + 9, 860, 9, 0, Math.PI * 2)
  ctx.fillStyle = '#34D399'
  ctx.shadowColor = 'rgba(52, 211, 153, 0.9)'
  ctx.shadowBlur = 14
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#CBD5E1'
  ctx.textAlign = 'left'
  ctx.fillText(label, startX + 34, 861)
}

/* ---------- Floating skill cards (704 x 320) ---------- */

function makeSkillCard(title: string, subtitle: string, chips: string[], accent: string) {
  return (ctx: Ctx, w: number, h: number) => {
    drawGlassBase(ctx, w, h, 44, hexToRgba(accent, 0.8))

    // Icon bubble
    ctx.beginPath()
    ctx.arc(76, 82, 28, 0, Math.PI * 2)
    ctx.fillStyle = hexToRgba(accent, 0.18)
    ctx.fill()
    ctx.lineWidth = 3
    ctx.strokeStyle = hexToRgba(accent, 0.9)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(76, 82, 8, 0, Math.PI * 2)
    ctx.fillStyle = accent
    ctx.shadowColor = accent
    ctx.shadowBlur = 16
    ctx.fill()
    ctx.shadowBlur = 0

    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#F8FAFC'
    ctx.font = `700 40px ${FONT_DISPLAY}`
    ctx.fillText(title, 126, 70)
    ctx.fillStyle = '#94A3B8'
    ctx.font = `500 25px ${FONT_BODY}`
    ctx.fillText(subtitle, 126, 112)

    let x = 48
    chips.forEach((chip) => {
      if (x + measureChip(ctx, chip) > w - 40) return
      x += drawChip(ctx, chip, x, 200) + 12
    })
  }
}

export const drawFrontendCard = makeSkillCard('Frontend', 'Interfaces and interaction', ['React', 'Angular', 'CSS'], CYAN)
export const drawBackendCard = makeSkillCard('Backend', 'Data and server logic', ['Laravel', 'PHP', 'MySQL'], VIOLET)

/* ---------- Small glowing technology badges (288 x 112) ---------- */

export function makeBadge(label: string, color: string) {
  return (ctx: Ctx, w: number, h: number) => {
    const x = 28
    const y = 24
    const bw = w - 56
    const bh = h - 48

    ctx.save()
    ctx.shadowColor = hexToRgba(color, 0.95)
    ctx.shadowBlur = 26
    roundedRectPath(ctx, x, y, bw, bh, bh / 2)
    ctx.fillStyle = 'rgba(7, 11, 20, 0.6)'
    ctx.fill()
    ctx.restore()

    roundedRectPath(ctx, x, y, bw, bh, bh / 2)
    ctx.lineWidth = 3
    ctx.strokeStyle = hexToRgba(color, 0.95)
    ctx.stroke()

    ctx.font = `700 28px ${FONT_DISPLAY}`
    const textWidth = ctx.measureText(label).width
    const total = 14 + 14 + textWidth
    const startX = w / 2 - total / 2

    ctx.beginPath()
    ctx.arc(startX + 7, h / 2, 7, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    ctx.fillStyle = '#F8FAFC'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, startX + 28, h / 2 + 2)
  }
}

export const drawReactBadge = makeBadge('React', CYAN)
export const drawLaravelBadge = makeBadge('Laravel', '#A78BFA')
export const drawAngularBadge = makeBadge('Angular', '#38BDF8')
export const drawThreeBadge = makeBadge('Three.js', VIOLET)
export const drawTypeScriptBadge = makeBadge('TypeScript', '#67E8F9')

/* ---------- Soft ambient glow (256 x 256) ---------- */

function makeGlow(color: string) {
  return (ctx: Ctx, w: number, h: number) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2)
    gradient.addColorStop(0, hexToRgba(color, 0.55))
    gradient.addColorStop(0.35, hexToRgba(color, 0.22))
    gradient.addColorStop(1, hexToRgba(color, 0))
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, w, h)
  }
}

export const drawCyanGlow = makeGlow(CYAN)
export const drawVioletGlow = makeGlow(VIOLET)
