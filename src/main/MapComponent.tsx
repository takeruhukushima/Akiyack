import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import supabase from '../supabaseClient'; // Supabaseクライアントのインポート

// Leafletのデフォルトマーカーの設定を修正
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);

  // 1. Supabaseから住所を取得
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase.from('akiya').select('location');
        if (error) {
          throw new Error(error.message);
        }
        if (data) {
          console.log('Supabaseから取得した住所データ:', data);
          setLocations(data.map((item: { location: string }) => item.location));
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        setError('住所データの取得に失敗しました');
      }
    };

    fetchLocations();
  }, []);

  // 2. マップ初期化
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

  // 3. 住所を緯度経度に変換してピンを指す
  useEffect(() => {
    if (!map || locations.length === 0) return;

    const fetchAndDisplayMarkers = async () => {
      try {
        const markers: L.LatLng[] = [];
        for (const address of locations) {
          console.log(`Fetching coordinates for address: ${address}`);
          
          // 国土地理院のAPIを使用して住所を緯度経度に変換
          const response = await fetch(
            `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${encodeURIComponent(address)}`
          );
          const data = await response.json();
          console.log('住所から取得した緯度経度データ:', data);

          if (data.length > 0) {
            const [lon, lat] = data[0].geometry.coordinates;
            console.log(`住所: ${address}, 緯度: ${lat}, 経度: ${lon}`);

            // 緯度経度が取得できたらLeafletを使って地図にマーカーを表示
            const marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(`<b>${address}</b>`);
            markers.push(marker.getLatLng()); // マーカーの位置を保存
          } else {
            console.warn(`No results found for address: ${address}`);
          }
        }

        // すべてのマーカーが追加された後、マップの表示範囲をマーカーに合わせる
        if (markers.length > 0) {
          const group = L.latLngBounds(markers);
          map.fitBounds(group);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
        setError('緯度経度の取得に失敗しました');
      }
    };

    fetchAndDisplayMarkers();
  }, [map, locations]);

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
