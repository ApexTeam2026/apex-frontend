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

  ratings: Record<number, number>;

  visitedIds: number[];

  toggleFavorite: (
    placeId: number
  ) => Promise<void>;

  setPlaceRating: (
    placeId: number,
    rating: number
  ) => Promise<void>;

  isFavorite: (
    placeId: number
  ) => boolean;

  loading: boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType>({
    favoriteIds: [],

    ratings: {},

    visitedIds: [],

    toggleFavorite: async () => {},

    setPlaceRating: async () => {},

    isFavorite: () => false,

    loading: false,
  });

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {

  const { user } = useAuth();

  const [favoriteIds, setFavoriteIds] =
    useState<number[]>([]);

  const [ratings, setRatings] =
    useState<Record<number, number>>({});

  const [visitedIds, setVisitedIds] =
    useState<number[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const fetchFavorites = async () => {

      if (!user) {

        setFavoriteIds([]);
        setRatings({});
        setVisitedIds([]);

        return;
      }

      try {

        setLoading(true);

        const favoritesData =
          await UserPlaceService.getFavorites(
            user.id
          );

        const visitedData =
          await UserPlaceService.getVisited(
            user.id
          );

        console.log(
          "FAVORITES RESPONSE:"
        );

        console.log(
          JSON.stringify(
            favoritesData,
            null,
            2
          )
        );

        console.log(
          "VISITED RESPONSE:"
        );

        console.log(
          JSON.stringify(
            visitedData,
            null,
            2
          )
        );

        // FAVORITES
        const favoritePlaces =
          favoritesData
            .filter(
              (item: any) =>
                item.isFavorite
            )
            .map(
              (item: any) =>
                item.placeId
            );

        setFavoriteIds(
          favoritePlaces
        );

        // RATINGS
        const ratingsMap:
          Record<number, number> = {};

        visitedData.forEach(
          (item: any) => {

            ratingsMap[
              item.placeId
            ] =
              item.rating || 0;
          }
        );

        setRatings(
          ratingsMap
        );

        // VISITED
        const visitedPlaces =
          visitedData
            .filter(
              (item: any) =>
                item.isVisited === true
            )
            .map(
              (item: any) =>
                item.placeId
            );

        setVisitedIds(
          visitedPlaces
        );

        console.log(
          "UPDATED FAVORITES:",
          favoritePlaces
        );

        console.log(
          "UPDATED VISITED IDS:",
          visitedPlaces
        );

      } catch (error: any) {

        console.log(
          error?.response?.data ||
          error.message
        );

      } finally {

        setLoading(false);
      }
    };

    fetchFavorites();

  }, [user]);

  const isFavorite = (
    placeId: number
  ) => {

    return favoriteIds.includes(
      placeId
    );
  };

  const toggleFavorite = async (
    placeId: number
  ) => {

    if (!user) return;

    const currentlyFavorite =
      favoriteIds.includes(
        placeId
      );

    // optimistic update
    if (currentlyFavorite) {

      setFavoriteIds(prev =>
        prev.filter(
          id => id !== placeId
        )
      );

    } else {

      setFavoriteIds(prev => [
        ...prev,
        placeId,
      ]);
    }

    try {

      await UserPlaceService.addFavorite({

        userId: Number(user.id),

        placeId: Number(placeId),

        isFavorite:
          !currentlyFavorite,

        isVisited:
          visitedIds.includes(
            placeId
          ),

        rating:
          ratings[placeId] || 0,
      });

      // синхронизация после обновления
      setFavoriteIds(prev => {

        if (currentlyFavorite) {

          return prev.filter(
            id => id !== placeId
          );
        }

        if (
          prev.includes(placeId)
        ) {

          return prev;
        }

        return [
          ...prev,
          placeId,
        ];
      });

    } catch (error) {

      console.log(
        "TOGGLE FAVORITE ERROR:"
      );

      console.log(error);

      // rollback
      if (currentlyFavorite) {

        setFavoriteIds(prev => [
          ...prev,
          placeId,
        ]);

      } else {

        setFavoriteIds(prev =>
          prev.filter(
            id => id !== placeId
          )
        );
      }
    }
  };

  const setPlaceRating = async (
    placeId: number,
    rating: number
  ) => {

    if (!user) return;

    // optimistic rating
    setRatings(prev => ({
      ...prev,
      [placeId]: rating,
    }));

    // optimistic visited
    setVisitedIds(prev => {

      if (
        prev.includes(placeId)
      ) {

        return prev;
      }

      return [
        ...prev,
        placeId,
      ];
    });

    try {

      await UserPlaceService.setVisited({

        userId: Number(user.id),

        placeId: Number(placeId),

        isFavorite:
          favoriteIds.includes(
            placeId
          ),

        isVisited: true,

        rating: rating,
      });

      await UserPlaceService.updateRating(
        Number(user.id),
        Number(placeId),
        Number(rating)
      );

    } catch (error) {

      console.log(
        "SET RATING ERROR:"
      );

      console.log(error);
    }
  };

  return (

    <FavoritesContext.Provider
      value={{

        favoriteIds,
        visitedIds,
        ratings,
        toggleFavorite,
        setPlaceRating,
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