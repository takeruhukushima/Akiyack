// src/components/MapComponent.tsx
import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // LeafletのCSSをインポート

// ジオコーディングAPIのURLとキーを設定
const GEOCODE_API_URL = 'https://nominatim.openstreetmap.org/search';
const GEOCODE_API_PARAMS = 'format=json&limit=1';

// 試しに表示する住所
const TEST_ADDRESS = '〒885-0006 宮崎県都城市吉尾町４７３−１';

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);

  useEffect(() => {
    // マップの初期化
    const newMap = L.map('map', {
      zoomControl: false
    }).setView([31.7333, 131.0667], 13); // 都城市の緯度と経度

    // タイルレイヤーの追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    setMap(newMap);

    // クリーンアップ: マップをリセット
    return () => {
      newMap.remove();
    };
  }, []);

  const geocodeAddress = async (address: string) => {
    try {
      const response = await fetch(`${GEOCODE_API_URL}?q=${encodeURIComponent(address)}&${GEOCODE_API_PARAMS}`);
      const data = await response.json();
      if (data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon)
        };
      } else {
        console.warn(`No results found for address: ${address}`);
        return { lat: 0, lng: 0 };
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      return { lat: 0, lng: 0 };
    }
  };

  useEffect(() => {
    if (!map) return;

    const fetchAndDisplayAddress = async () => {
      const coordinates = await geocodeAddress(TEST_ADDRESS);
      if (coordinates.lat !== 0 && coordinates.lng !== 0) {
        // ピンアイコンの設定
        const pinIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34]
        });

        // マーカーの追加
        const marker = L.marker([coordinates.lat, coordinates.lng], { icon: pinIcon }).addTo(map);
        marker.bindPopup(`<b>${TEST_ADDRESS}</b>`);
        
        // マップの表示範囲をマーカーに合わせる
        map.setView([coordinates.lat, coordinates.lng], 13);
      }
    };

    fetchAndDisplayAddress();
  }, [map]);

  return <div id="map" style={{ height: '100vh', width: '100vw' }}></div>;
};

export default MapComponent;
