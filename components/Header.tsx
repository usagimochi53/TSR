export function Header() {
  return (
    <header className="space-y-3 px-5 pt-8 sm:px-8 sm:pt-10">
      <p className="text-sm font-semibold text-leaf">今日の気分で歩く</p>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-normal text-ink sm:text-4xl">
          今日の散歩道
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-stone-700 sm:text-base">
          いつもの街に、少しだけ違う目的地を。今日の気分に合う寄り道を見つけましょう。
        </p>
      </div>
    </header>
  );
}
