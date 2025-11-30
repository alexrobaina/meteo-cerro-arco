import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface AmbientWeatherDevice {
  macAddress: string
  lastData: {
    dateutc: number
    tempf?: number
    humidity?: number
    windspeedmph?: number
    windgustmph?: number
    winddir?: number
    baromabsin?: number
    [key: string]: unknown
  }
  info: {
    name: string
    [key: string]: unknown
  }
}

export async function GET() {
  const apiKey = process.env.AMBIENT_API_KEY
  const applicationKey = process.env.AMBIENT_APPLICATION_KEY

  if (!apiKey || !applicationKey) {
    return NextResponse.json(
      { error: 'API keys not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://rt.ambientweather.net/v1/devices?apiKey=${apiKey}&applicationKey=${applicationKey}`,
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json'
        }
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Ambient Weather API error:', response.status, errorText)
      return NextResponse.json(
        { error: `API error: ${response.status}` },
        { status: response.status }
      )
    }

    const devices: AmbientWeatherDevice[] = await response.json()

    if (!devices || devices.length === 0) {
      return NextResponse.json(
        { error: 'No devices found' },
        { status: 404 }
      )
    }

    const device = devices[0]
    const data = device.lastData

    return NextResponse.json({
      station: device.info?.name || 'Estación Meteorológica Cerro ARCO',
      timestamp: data.dateutc,
      tempf: data.tempf,
      humidity: data.humidity,
      windspeedmph: data.windspeedmph,
      windgustmph: data.windgustmph,
      winddir: data.winddir,
      baromabsin: data.baromabsin,
    })
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    )
  }
}
