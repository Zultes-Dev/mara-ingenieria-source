// sections/CoverageMap.tsx
// Componente aislado que carga Leaflet.
// Se importa SOLO via dynamic() con ssr:false en Coverage.tsx
// → Jamás se ejecuta en el servidor → sin errores de window/document

'use client'

import { useEffect, useRef } from 'react'
import { coverage } from '@config/content'
import { site }     from '@config/site'
import 'leaflet/dist/leaflet.css'

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  // Guard: evita doble inicialización en React Strict Mode (dev)
  const initialized = useRef(false)

  useEffect(() => {
    if (!mapRef.current || initialized.current) return
    initialized.current = true

    async function initMap() {
      // Import dinámico — garantiza que no se bundlee en el server chunk
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center:             [4.5709, -74.2973],
        zoom:               5,
        zoomControl:        true,
        scrollWheelZoom:    false,
        attributionControl: false,
      })

      // Dark tile layer (CartoDB)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 18,
      }).addTo(map)

      // ── Marker factory ──────────────────────────────
      function createIcon(color: string, size: number) {
        return L.divIcon({
          html: `
            <div style="
              width:${size}px;height:${size}px;border-radius:50%;
              background:${color}22;border:2px solid ${color};
              box-shadow:0 0 16px ${color}88;
              display:flex;align-items:center;justify-content:center;
              position:relative;
            ">
              <div style="width:${size / 3.5}px;height:${size / 3.5}px;border-radius:50%;background:${color};"></div>
            </div>`,
          className:   '',
          iconSize:    [size, size],
          iconAnchor:  [size / 2, size / 2],
          popupAnchor: [0, -size / 2],
        })
      }

      // ── Sede principal ──────────────────────────────
      const { lat, lng } = site.contact.coordinates
      L.marker([lat, lng], { icon: createIcon('#00AEEF', 40) })
        .addTo(map)
        .bindPopup(`
          <div style="font-family:'Barlow Semi Condensed',sans-serif;">
            <div style="font-size:13px;font-weight:700;color:#00AEEF;margin-bottom:4px;">
              MARA Ingeniería
            </div>
            <div style="font-size:12px;opacity:.8;">${site.contact.address}</div>
            <div style="font-size:11px;opacity:.5;margin-top:4px;">Sede principal</div>
          </div>`)
        .openPopup()

      // ── Cobertura nacional — círculo visual ─────────
      L.circle([lat, lng], {
        radius:      1_650_000,
        color:       'rgba(0,174,239,0.25)',
        fill:        true,
        fillColor:   'rgba(0,174,239,0.04)',
        fillOpacity: 1,
        weight:      1,
        dashArray:   '6,8',
      }).addTo(map)

      // ── Ciudades principales ─────────────────────────
      coverage.cities.forEach(({ lat: cLat, lng: cLng, name }) => {
        L.marker([cLat, cLng], { icon: createIcon('#22c55e', 18) })
          .addTo(map)
          .bindPopup(`<div style="font-family:'Barlow Semi Condensed',sans-serif;font-size:12px;font-weight:600;">${name}</div>`)
      })
    }

    initMap()
  }, [])

  return <div ref={mapRef} style={{ height: 480, width: '100%' }} />
}
