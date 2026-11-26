/** Generates a legally-safe placeholder cover (SVG data URI) from a hue. */
export function makeArtwork(hue: number, variant = 0): string {
  const h2 = (hue + 40) % 360
  const shapes = [
    `<circle cx="150" cy="150" r="70" fill="hsl(${h2} 70% 85%)" opacity=".55"/>`,
    `<rect x="60" y="60" width="180" height="180" fill="hsl(${h2} 70% 85%)" opacity=".5" transform="rotate(20 150 150)"/>`,
    `<path d="M0 220 Q150 120 300 220 V300 H0Z" fill="hsl(${h2} 70% 85%)" opacity=".55"/>`,
  ]
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="hsl(${hue} 60% 35%)"/>` +
    `<stop offset="1" stop-color="hsl(${h2} 65% 60%)"/></linearGradient></defs>` +
    `<rect width="300" height="300" fill="url(#g)"/>${shapes[variant % shapes.length]}</svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}
