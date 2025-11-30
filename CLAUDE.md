# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Real-time weather dashboard for a paragliding takeoff site (Cerro ARCO) built with Next.js. Displays live weather data from an Ambient Weather station.

## Tech Stack

- Next.js (React framework)
- Tailwind CSS for styling
- Lucide React for icons
- Ambient Weather API for real-time data

## Key Weather Metrics

The dashboard displays these metrics from the Ambient Weather API:
- `windspeedmph` - instantaneous wind speed
- `windgustmph` - max wind speed in last 10 minutes
- `winddir` - wind direction (0-360°)
- `humidity` - outdoor humidity (0-100%)
- `baromabsin` - absolute pressure (inHg)

## API Integration

Uses Ambient Weather REST API:
- API Documentation: https://ambientweather.docs.apiary.io/
- Device Data Specs: https://github.com/ambient-weather/api-docs/wiki/Device-Data-Specs

API keys should be stored in environment variables (not committed to repo).

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Notes

- Weather data should be fetched server-side or via API routes to protect API keys
- Convert mph to km/h for display (multiply by 1.60934)
- Convert wind direction degrees to cardinal directions (N, NE, E, etc.)
- Dashboard is designed for outdoor visibility with high contrast cards
