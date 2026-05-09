"use client";

import { useEffect, useState } from "react";
import { CandidateList } from "@/components/CandidateList";
import { Header } from "@/components/Header";
import { MonthlyGoal } from "@/components/MonthlyGoal";
import { MonthlySummary } from "@/components/MonthlySummary";
import { SearchForm } from "@/components/SearchForm";
import { TabNavigation } from "@/components/TabNavigation";
import { TodayRecommendation } from "@/components/TodayRecommendation";
import { WalkRecordForm } from "@/components/WalkRecordForm";
import { WalkRecordList } from "@/components/WalkRecordList";
import { WalkSummary } from "@/components/WalkSummary";
import { generateCandidates } from "@/lib/candidates";
import {
  deleteMonthlyWalkGoal,
  getMonthlyWalkGoal,
  saveMonthlyWalkGoal,
} from "@/lib/goal";
import {
  calculateCurrentMonthComparison,
  calculateMonthSummary,
  getAvailableMonthKeys,
  getCurrentMonthKey,
  getMonthKey,
} from "@/lib/monthlySummary";
import { generateWalkRecommendation } from "@/lib/recommendation";
import { loadWalkRecords, saveWalkRecords } from "@/lib/storage";
import { summarizeWalkRecords } from "@/lib/summary";
import { walkThemes } from "@/lib/themeDisplay";
import type {
  AppTab,
  Candidate,
  CurrentLocation,
  WalkDistance,
  WalkRecommendation,
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
  const [recommendationMessage, setRecommendationMessage] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [recommendation, setRecommendation] =
    useState<WalkRecommendation | null>(null);
  const [records, setRecords] = useState<WalkRecord[]>([]);
  const [monthlyGoalKm, setMonthlyGoalKm] = useState<number | null>(null);
  const [selectedMonthKey, setSelectedMonthKey] = useState(getCurrentMonthKey());
  const [showSelectedMonthOnly, setShowSelectedMonthOnly] = useState(false);
  const [activeTab, setActiveTab] = useState<AppTab>("search");
  const walkSummary = summarizeWalkRecords(records);
  const availableMonthKeys = getAvailableMonthKeys(records);
  const monthSummary = calculateMonthSummary(records, selectedMonthKey);
  const monthComparison = calculateCurrentMonthComparison(records);
  const selectedMonthRecords = records.filter(
    (record) => getMonthKey(record.date) === selectedMonthKey,
  );

  useEffect(() => {
    setRecords(loadWalkRecords());
    setMonthlyGoalKm(getMonthlyWalkGoal());
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

  function searchCandidates(nextDistance: WalkDistance, nextTheme: WalkTheme) {
    if (!startLocation.trim()) {
      setError("出発地を入力してください。");
      setCandidates([]);
      return;
    }

    if (!Number.isFinite(nextDistance) || nextDistance <= 0) {
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
        nextDistance,
        nextTheme,
        returnToStart,
        routeOrigin,
      ),
    );
  }

  function handleSearch() {
    setRecommendationMessage("");
    searchCandidates(distance, theme);
  }

  function handleGenerateRecommendation() {
    setRecommendation(generateWalkRecommendation(walkThemes));
    setRecommendationMessage("");
  }

  function handleApplyRecommendation() {
    if (!recommendation) {
      return;
    }

    setDistance(recommendation.distanceKm);
    setTheme(recommendation.themeId);

    // 出発地がある場合だけ、反映後すぐに既存の候補生成処理を実行します。
    if (startLocation.trim()) {
      setRecommendationMessage("");
      searchCandidates(recommendation.distanceKm, recommendation.themeId);
      return;
    }

    setCandidates([]);
    setError("");
    setRecommendationMessage(
      "出発地を入力すると、この条件で散歩先を探せます。",
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

  function handleSaveMonthlyGoal(goalKm: number) {
    saveMonthlyWalkGoal(goalKm);
    setMonthlyGoalKm(goalKm);
  }

  function handleDeleteMonthlyGoal() {
    deleteMonthlyWalkGoal();
    setMonthlyGoalKm(null);
  }

  return (
    <main className="min-h-screen bg-emerald-50">
      <div className="mx-auto flex w-full max-w-[720px] flex-col gap-7 pb-10">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "search" ? (
          <>
            <TodayRecommendation
              recommendation={recommendation}
              message={recommendationMessage}
              onGenerate={handleGenerateRecommendation}
              onApply={handleApplyRecommendation}
            />
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
          </>
        ) : null}

        {activeTab === "records" ? (
          <div className="grid gap-7">
            <WalkRecordForm onAddRecord={handleAddRecord} />
            <WalkRecordList
              records={records}
              onDeleteRecord={handleDeleteRecord}
              showDeleteButton
            />
          </div>
        ) : null}

        {activeTab === "summary" ? (
          <div className="grid gap-7">
            <MonthlyGoal
              goalKm={monthlyGoalKm}
              currentMonthDistanceKm={walkSummary.currentMonthDistance}
              onSaveGoal={handleSaveMonthlyGoal}
              onDeleteGoal={handleDeleteMonthlyGoal}
            />
            <WalkSummary summary={walkSummary} />
            <MonthlySummary
              availableMonthKeys={availableMonthKeys}
              selectedMonthKey={selectedMonthKey}
              summary={monthSummary}
              comparison={monthComparison}
              showSelectedMonthOnly={showSelectedMonthOnly}
              onSelectedMonthChange={setSelectedMonthKey}
              onShowSelectedMonthOnlyChange={setShowSelectedMonthOnly}
            />
            {showSelectedMonthOnly ? (
              <WalkRecordList
                records={selectedMonthRecords}
                onDeleteRecord={handleDeleteRecord}
                title="選択月の履歴"
                showDeleteButton={false}
                emptyMessage="この月の散歩記録はまだありません。"
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </main>
  );
}
