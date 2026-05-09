import type { WalkGoalSummary } from "./types";

const GOAL_STORAGE_KEY = "monthly_walk_goal";

export function getMonthlyWalkGoal(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawGoal = window.localStorage.getItem(GOAL_STORAGE_KEY);

  if (!rawGoal) {
    return null;
  }

  const goalKm = Number(rawGoal);

  return Number.isFinite(goalKm) && goalKm > 0 ? goalKm : null;
}

export function saveMonthlyWalkGoal(goalKm: number) {
  window.localStorage.setItem(GOAL_STORAGE_KEY, String(goalKm));
}

export function deleteMonthlyWalkGoal() {
  window.localStorage.removeItem(GOAL_STORAGE_KEY);
}

export function calculateWalkGoalSummary(
  goalKm: number,
  currentMonthDistanceKm: number,
): WalkGoalSummary {
  const achievementRate = (currentMonthDistanceKm / goalKm) * 100;
  const remainingKm = Math.max(goalKm - currentMonthDistanceKm, 0);

  // 表示用の進捗率はプログレスバーからはみ出さないように最大100%にします。
  return {
    goalKm,
    currentMonthDistanceKm,
    achievementRate,
    displayAchievementRate: Math.min(achievementRate, 100),
    remainingKm,
    isAchieved: currentMonthDistanceKm >= goalKm,
  };
}
