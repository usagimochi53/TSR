"use client";

import { useEffect, useState } from "react";
import { CandidateList } from "@/components/CandidateList";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { WalkRecordForm } from "@/components/WalkRecordForm";
import { WalkRecordList } from "@/components/WalkRecordList";
import { generateCandidates } from "@/lib/candidates";
import { loadWalkRecords, saveWalkRecords } from "@/lib/storage";
import type {
  Candidate,
  CurrentLocation,
  WalkDistance,
  WalkRecord,
  WalkTheme,
} from "@/lib/types";

export default function Home() {
  const [startLocation, setStartLocation] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [distance, setDistance] = useState<WalkDistance>(5);
  const [returnToStart, setReturnToStart] = useState(false);
  const [theme, setTheme] = useState<WalkTheme>("喫茶店巡り");
  const [error, setError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [records, setRecords] = useState<WalkRecord[]>([]);

  useEffect(() => {
    setRecords(loadWalkRecords());
  }, []);

  function handleStartLocationChange(value: string) {
    setStartLocation(value);
    setLocationError("");

    // 現在地取得後に手入力された場合は、手入力を優先するため緯度経度を破棄します。
    if (currentLocation) {
      setCurrentLocation(null);
    }
  }

  function getLocationErrorMessage(geolocationError: GeolocationPositionError) {
    if (geolocationError.code === geolocationError.PERMISSION_DENIED) {
      return "位置情報の利用が許可されませんでした。ブラウザの設定を確認してください。";
    }

    if (geolocationError.code === geolocationError.TIMEOUT) {
      return "現在地の取得がタイムアウトしました。通信環境のよい場所で再度お試しください。";
    }

    return "現在地を取得できませんでした。しばらくしてから再度お試しください。";
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError("このブラウザは現在地取得に対応していません。");
      return;
    }

    setError("");
    setLocationError("");
    setIsGettingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStartLocation("現在地");
        setIsGettingLocation(false);
      },
      (geolocationError) => {
        setLocationError(getLocationErrorMessage(geolocationError));
        setCurrentLocation(null);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }

  function handleSearch() {
    if (!startLocation.trim()) {
      setError("出発地を入力してください。");
      setCandidates([]);
      return;
    }

    if (!Number.isFinite(distance) || distance <= 0) {
      setError("距離は1km以上で入力してください。");
      setCandidates([]);
      return;
    }

    setError("");
    setLocationError("");

    // 現在地取得済みなら、Googleマップ経路URLのoriginだけ緯度経度にします。
    const routeOrigin = currentLocation
      ? `${currentLocation.latitude},${currentLocation.longitude}`
      : startLocation;

    setCandidates(
      generateCandidates(
        startLocation,
        distance,
        theme,
        returnToStart,
        routeOrigin,
      ),
    );
  }

  function handleAddRecord(record: WalkRecord) {
    const nextRecords = [record, ...records];
    setRecords(nextRecords);
    saveWalkRecords(nextRecords);
  }

  function handleDeleteRecord(id: string) {
    const nextRecords = records.filter((record) => record.id !== id);
    setRecords(nextRecords);
    saveWalkRecords(nextRecords);
  }

  return (
    <main className="min-h-screen bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-7">
        <Header />
        <SearchForm
          startLocation={startLocation}
          distance={distance}
          returnToStart={returnToStart}
          theme={theme}
          isGettingLocation={isGettingLocation}
          error={error}
          locationError={locationError}
          onStartLocationChange={handleStartLocationChange}
          onDistanceChange={setDistance}
          onReturnToStartChange={setReturnToStart}
          onThemeChange={setTheme}
          onUseCurrentLocation={handleUseCurrentLocation}
          onSubmit={handleSearch}
        />
        <CandidateList candidates={candidates} />
        <div className="grid gap-7 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <WalkRecordForm onAddRecord={handleAddRecord} />
          <WalkRecordList
            records={records}
            onDeleteRecord={handleDeleteRecord}
          />
        </div>
      </div>
    </main>
  );
}
