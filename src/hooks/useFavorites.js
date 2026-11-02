import useAppStore from '../store/useAppStore';

export default function useFavorites() {
  const favorites = useAppStore((state) => state.favorites);
  const toggleFavorite = useAppStore((state) => state.toggleFavorite);
  const clearFavorites = useAppStore((state) => state.clearFavorites);

  const isFavorite = (id) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length
  };
}
