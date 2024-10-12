import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 試しに表示する住所
const TEST_ADDRESS = '宮崎県都城市吉尾町４７３−１';

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  // マップ初期化
  useEffect(() => {
    const newMap = L.map('map', {
      zoomControl: false
    }).setView([31.7333, 131.0667], 13); // 都城市の緯度と経度

    // OpenStreetMapタイルを追加
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(newMap);

    setMap(newMap);

    // コンポーネントがアンマウントされた時にマップをリセット
    return () => {
      newMap.remove();
    };
  }, []);

  // 緯度経度を取得してマーカーを表示
  useEffect(() => {
    if (!map) return;

    const fetchAndDisplayMarker = async () => {
      try {
        // 住所から緯度経度を取得
        const response = await fetch(
          `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(TEST_ADDRESS)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          const [lon, lat] = data[0].geometry.coordinates;

          // マーカーの追加
          const marker = L.marker([lat, lon]).addTo(map);
          marker.bindPopup(`<b>${TEST_ADDRESS}</b>`);

          // マップをマーカーの位置に移動
          map.setView([lat, lon], 16);
        } else {
          console.warn(`No results found for address: ${TEST_ADDRESS}`);
          setError(`住所「${TEST_ADDRESS}」の結果が見つかりませんでした`);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setError('緯度経度の取得に失敗しました');
      }
    };

    fetchAndDisplayMarker();
  }, [map]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      {error && (
        <div style={{ color: 'red', position: 'absolute', top: 10, left: 10 }}>
          {error}
        </div>
      )}
      <div id="map" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
