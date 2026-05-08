export function Header() {
  return (
    <header className="space-y-3 px-4 pt-8 sm:pt-10">
      <p className="text-sm font-semibold text-emerald-700">今日の気分で歩く</p>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-stone-900 sm:text-4xl">
          今日の散歩道 🌿
        </h1>
        <p className="text-sm leading-6 text-stone-700 sm:text-base">
          距離とテーマを選んで、今日歩きたい場所を見つけよう。
        </p>
      </div>
    </header>
  );
}
