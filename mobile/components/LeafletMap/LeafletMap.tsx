// components/LeafletMap.tsx
import React, { useMemo } from "react";
import { WebView } from "react-native-webview";
import { View, StyleSheet } from "react-native";
import { useTranslation } from 'react-i18next';

export interface LeafletActivity {
  lat: number;
  lng: number;
  name?: string;
  index?: number;
}

interface LeafletMapProps {
  activities: LeafletActivity[];
  userLocation?: { lat: number; lng: number } | null;
  initialRegion?: { lat: number; lng: number };
  onMarkerPress?: (activity: LeafletActivity) => void;
}

export function LeafletMap({
  activities,
  userLocation,
  initialRegion,
  onMarkerPress,
}: LeafletMapProps) {
  const { t } = useTranslation();
  const html = useMemo(() => {
    const center = initialRegion ?? activities?.[0] ?? { lat: 0, lng: 0 };

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
          <style>
            #map { height: 100vh; width: 100vw; }
            .custom-marker {
              background-color: #FF6B00;
              color: white;
              font-size: 14px;
              font-weight: bold;
              width: 30px;
              height: 30px;
              border-radius: 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid white;
            }
            .user-marker {
              background-color: #1976D2;
              color: white;
              font-size: 12px;
              font-weight: bold;
              width: 24px;
              height: 24px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 2px solid white;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>

          <script>
            const map = L.map('map').setView([${center.lat}, ${center.lng}], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19
            }).addTo(map);

            const activities = ${JSON.stringify(activities)};

            activities.forEach((atv, idx) => {
              const markerHtml = \`
                <div class="custom-marker">\${idx + 1}</div>
              \`;

              const marker = L.marker([atv.lat, atv.lng], {
                icon: L.divIcon({
                  html: markerHtml,
                  className: "",
                  iconSize: [30, 30],
                })
              }).addTo(map);

              marker.on('click', () => {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: "marker_press",
                  data: { ...atv, index: idx }
                }));
              });
            });

            ${userLocation ? `
              const userMarkerHtml = '<div class="user-marker">${t('itineraryMap.googleMaps')}</div>';
              L.marker([${userLocation.lat}, ${userLocation.lng}], {
                icon: L.divIcon({
                  html: userMarkerHtml,
                  className: "",
                  iconSize: [24, 24],
                })
              }).addTo(map);
            ` : ""}
          </script>
        </body>
      </html>
    `;
  }, [activities, userLocation, initialRegion, t]);

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        onMessage={(event) => {
          const msg = JSON.parse(event.nativeEvent.data);
          if (msg.type === "marker_press" && onMarkerPress) {
            onMarkerPress(msg.data);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
