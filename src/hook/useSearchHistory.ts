import {
    useLocalStorageValue,
    getRuntimeLocalStorage,
} from "use-json-localstorage";

const SEARCH_HISTORY_KEY = "searchHistory";

export const useSearchHistory = () => {
    const history = useLocalStorageValue<string[]>(SEARCH_HISTORY_KEY, []);

    const addHistory = (query: string) => {
        getRuntimeLocalStorage().set(
            SEARCH_HISTORY_KEY,
            Array.from(new Set([query, ...(history ?? [])])).slice(0, 8),
        );
    };

    const removeHistory = (query: string) => {
        const newHistory = (history ?? []).filter((q) => q !== query);
        getRuntimeLocalStorage().set(SEARCH_HISTORY_KEY, newHistory);
    };

    return { history, addHistory, removeHistory };
};
