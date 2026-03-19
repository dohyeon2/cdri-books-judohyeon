import {
    getRuntimeLocalStorage,
    useLocalStorageValue,
} from "use-json-localstorage";

const FAVORITE_KEY = "favorites";

export const useFavorite = () => {
    const favorites = useLocalStorageValue<string[]>(FAVORITE_KEY, []);

    const addFavorite = (isbn: string) => {
        getRuntimeLocalStorage().set(
            FAVORITE_KEY,
            Array.from(new Set([...(favorites ?? []), isbn])),
        );
    };

    const removeFavorite = (isbn: string) => {
        getRuntimeLocalStorage().set(
            FAVORITE_KEY,
            (favorites ?? []).filter((id) => id !== isbn),
        );
    };

    return { favorites, addFavorite, removeFavorite };
};
