"use client";

import { useEffect, useState } from "react";
import {
  Wind,
  Droplets,
  Gauge,
  Compass,
  Thermometer,
  CloudRain,
  RefreshCw,
} from "lucide-react";
import { mphToKmh, degreesToCardinal, inHgToHpa } from "@/lib/utils";
import { ImageCarousel } from "./ImageCarousel";

interface WeatherData {
  station: string;
  timestamp: number;
  tempf?: number;
  humidity?: number;
  windspeedmph?: number;
  windgustmph?: number;
  winddir?: number;
  baromabsin?: number;
}

export function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch("/api/weather");
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setLastUpdate(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchWeatherData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Convert values for display
  const windSpeed = weatherData?.windspeedmph
    ? mphToKmh(weatherData.windspeedmph)
    : "--";
  const windGusts = weatherData?.windgustmph
    ? mphToKmh(weatherData.windgustmph)
    : "--";
  const windDirection =
    weatherData?.winddir !== undefined
      ? degreesToCardinal(weatherData.winddir)
      : "--";
  const temperature = weatherData?.tempf
    ? Math.round((((weatherData.tempf - 32) * 5) / 9) * 10) / 10
    : "--";
  const humidity = weatherData?.humidity ?? "--";
  const pressure = weatherData?.baromabsin
    ? inHgToHpa(weatherData.baromabsin)
    : "--";

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl flex items-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin" />
          Cargando datos meteorológicos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-red-400 text-xl text-center">
          <p>Error: {error}</p>
          <button
            onClick={fetchWeatherData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Station Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {weatherData?.station || "Estación Meteorológica Cerro ARCO"}
          </h1>
          <div className="h-1 w-24 bg-blue-400 mx-auto rounded-full" />
          {lastUpdate && (
            <p className="text-white/70 text-sm mt-4">
              Última actualización: {lastUpdate.toLocaleTimeString("es-AR")}
            </p>
          )}
        </div>

        {/* Main Layout: Carousel + Cards */}
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">
          {/* Takeoff Photo Carousel - Left side with 4:5 aspect ratio */}
          <div className="lg:w-2/5">
            <ImageCarousel />
          </div>

          {/* Weather Cards Grid - Right side, 2 columns, stretch to fill height */}
          <div className="lg:w-3/5 grid grid-cols-2 gap-4 grid-rows-3">
            {/* Wind Speed Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Wind className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Viento
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {windSpeed}
              </div>
              <div className="text-sm text-gray-600">km/h</div>
            </div>

            {/* Wind Gusts Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-cyan-100 rounded-xl">
                  <CloudRain className="w-6 h-6 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Ráfagas
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {windGusts}
              </div>
              <div className="text-sm text-gray-600">km/h</div>
            </div>

            {/* Wind Direction Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Compass className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Dirección
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {windDirection}
              </div>
              <div className="text-sm text-gray-600">
                {weatherData?.winddir !== undefined
                  ? `${weatherData.winddir}°`
                  : ""}
              </div>
            </div>

            {/* Temperature Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <Thermometer className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Temperatura
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {temperature}°C
              </div>
            </div>

            {/* Humidity Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-teal-100 rounded-xl">
                  <Droplets className="w-6 h-6 text-teal-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Humedad
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">
                {humidity}%
              </div>
            </div>

            {/* Pressure Card */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Gauge className="w-6 h-6 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Presión
                </span>
              </div>
              <div className="text-4xl font-bold text-gray-900">{pressure}</div>
              <div className="text-sm text-gray-600">hPa</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-white/80 text-sm">
            Datos en tiempo real de la estación meteorológica
          </p>
          <button
            onClick={fetchWeatherData}
            className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
        </div>
      </div>
    </div>
  );
}
