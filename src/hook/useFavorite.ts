import {
    getRuntimeLocalStorage,
    useLocalStorageValue,
} from "use-json-localstorage";

const FAVORITE_KEY = "favorites";

type Book = {
    title: string;
    contents: string;
    url: string;
    isbn: string;
    authors: string[];
    publisher: string;
    translators: string[];
    price: number;
    sale_price: number;
    thumbnail: string;
    status: string;
    datetime: string;
};

export const useFavorite = () => {
    const favorites = useLocalStorageValue<Book[]>(FAVORITE_KEY, []);

    const addFavorite = (book: Book) => {
        getRuntimeLocalStorage().set(
            FAVORITE_KEY,
            Array.from(new Set([...(favorites ?? []), book])),
        );
    };

    const removeFavorite = (isbn: Book["isbn"]) => {
        getRuntimeLocalStorage().set(
            FAVORITE_KEY,
            (favorites ?? []).filter((b) => b.isbn !== isbn),
        );
    };

    return { favorites, addFavorite, removeFavorite };
};
