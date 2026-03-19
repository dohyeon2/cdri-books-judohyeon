import { useMemo, useState } from "react";
import {
    getRuntimeLocalStorage,
    useLocalStorageValue,
} from "use-json-localstorage";

const FAVORITE_KEY = "cdri-books-judohyeon-favorites";

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

export const useFavorite = ({ size = Infinity }: { size?: number } = {}) => {
    const [page, setPage] = useState(1);
    const favorites = useLocalStorageValue<Book[]>(FAVORITE_KEY, []);

    const totalCount = favorites?.length ?? 0;

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

    const fetchNextPage = () => {
        if (page * size >= totalCount) return;
        setPage(page + 1);
    };

    return {
        favorites: favorites?.slice(0, page * size) ?? [],
        totalCount,
        addFavorite,
        removeFavorite,
        fetchNextPage,
    };
};
