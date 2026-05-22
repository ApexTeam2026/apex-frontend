import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { UserPlaceService } from "@/src/api/services/user-place-service";
import { useAuth } from "@/src/hooks/useAuth";


type FavoritesContextType = {
  favoriteIds: number[];

  toggleFavorite: (placeId: number) => Promise<void>;

  isFavorite: (placeId: number) => boolean;

  loading: boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType>({
    favoriteIds: [],
    toggleFavorite: async () => {},
    isFavorite: () => false,
    loading: false,
  });

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  // загрузка favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setFavoriteIds([]);
        return;
      }

      try {
        setLoading(true);

        const data =
          await UserPlaceService.getFavorites(user.id);

        console.log("FAVORITES RESPONSE:");
        console.log(JSON.stringify(data, null, 2));

        const ids = data.map(
          (item: any) => item.placeId
        );

        setFavoriteIds(ids);

      } catch (error: any) {

        console.log(
          error?.response?.data || error.message
        );

      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const isFavorite = (placeId: number) => {
    return favoriteIds.includes(placeId);
  };

  const toggleFavorite = async (
    placeId: number
  ) => {
    if (!user) return;

    const currentlyFavorite =
      favoriteIds.includes(placeId);

    // optimistic update
    if (currentlyFavorite) {
      setFavoriteIds(prev =>
        prev.filter(id => id !== placeId)
      );
    } else {
      setFavoriteIds(prev => [...prev, placeId]);
    }

    try {
      await UserPlaceService.addFavorite({
        userId: Number(user.id),
        placeId: Number(placeId),
        isFavorite: true,
        isVisited: false,
        });

    } catch (error) {

      // rollback
      if (currentlyFavorite) {
        setFavoriteIds(prev => [
          ...prev,
          placeId,
        ]);
      } else {
        setFavoriteIds(prev =>
          prev.filter(id => id !== placeId)
        );
      }
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        toggleFavorite,
        isFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () =>
  useContext(FavoritesContext);