"use client";

import { useEffect, useState } from "react";
import { CandidateList } from "@/components/CandidateList";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { WalkRecordForm } from "@/components/WalkRecordForm";
import { WalkRecordList } from "@/components/WalkRecordList";
import { generateCandidates } from "@/lib/candidates";
import { loadWalkRecords, saveWalkRecords } from "@/lib/storage";
import type { Candidate, WalkDistance, WalkRecord, WalkTheme } from "@/lib/types";

export default function Home() {
  const [startLocation, setStartLocation] = useState("");
  const [distance, setDistance] = useState<WalkDistance>(5);
  const [theme, setTheme] = useState<WalkTheme>("喫茶店巡り");
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [records, setRecords] = useState<WalkRecord[]>([]);

  useEffect(() => {
    setRecords(loadWalkRecords());
  }, []);

  function handleSearch() {
    if (!startLocation.trim()) {
      setError("出発地を入力してください。");
      setCandidates([]);
      return;
    }

    setError("");
    setCandidates(generateCandidates(startLocation, distance, theme));
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
          theme={theme}
          error={error}
          onStartLocationChange={setStartLocation}
          onDistanceChange={setDistance}
          onThemeChange={setTheme}
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
