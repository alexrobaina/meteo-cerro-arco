// Convert mph to km/h
export function mphToKmh(mph: number): number {
  return Math.round(mph * 1.60934 * 10) / 10
}

// Convert wind direction degrees to cardinal direction
export function degreesToCardinal(degrees: number): string {
  const directions = [
    'N', 'NNE', 'NE', 'ENE',
    'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW',
    'W', 'WNW', 'NW', 'NNW'
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

// Convert inHg to hPa
export function inHgToHpa(inHg: number): number {
  return Math.round(inHg * 33.8639 * 10) / 10
}
