import type { FavoriteCourse } from "@/lib/types";
import { FavoriteCourseCard } from "./FavoriteCourseCard";

type FavoriteCourseListProps = {
  favorites: FavoriteCourse[];
  onDeleteFavorite: (id: string) => void;
  title?: string;
  description?: string;
  selectedFavoriteId?: string | null;
  showSelectButton?: boolean;
  onSelectFavorite?: (favorite: FavoriteCourse) => void;
};

export function FavoriteCourseList({
  favorites,
  onDeleteFavorite,
  title = "お気に入りコース",
  description = "あとで歩きたい候補を保存して、同じ条件の地図をすぐ開けます。",
  selectedFavoriteId = null,
  showSelectButton = false,
  onSelectFavorite,
}: FavoriteCourseListProps) {
  return (
    <section className="space-y-3 px-4">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-stone-900">
          {title}
        </h2>
        <p className="text-sm leading-6 text-stone-600">
          {description}
        </p>
      </div>

      {favorites.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-emerald-200 bg-white p-5 text-sm leading-6 text-stone-600 shadow-sm">
          お気に入りコースはまだありません。散歩先候補から、あとで歩きたいコースを保存してみましょう。
        </p>
      ) : (
        <div className="grid gap-3">
          {favorites.map((favorite) => (
            <FavoriteCourseCard
              key={favorite.id}
              favorite={favorite}
              onDelete={onDeleteFavorite}
              isSelected={favorite.id === selectedFavoriteId}
              showSelectButton={showSelectButton}
              onSelect={onSelectFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
