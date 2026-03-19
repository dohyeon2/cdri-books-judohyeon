import { useEffect, useRef, useState } from "react";

const SEARCH_HISTORY_KEY = "searchHistory";

export const useSearchHistory = () => {
    const [history, setHistory] = useState<string[]>([]);
    const isLoaded = useRef(false);

    useEffect(() => {
        const loadHistory = () => {
            const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
            if (stored) {
                setHistory(JSON.parse(stored) ?? []);
            }
        };
        if (!isLoaded.current) {
            loadHistory();
            isLoaded.current = true;
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    }, [history]);

    const addHistory = (query: string) => {
        setHistory((p) => {
            const newHistory = Array.from(new Set([query, ...p])).slice(0, 8);
            return newHistory;
        });
    };

    const removeHistory = (query: string) => {
        const newHistory = history.filter((q) => q !== query);
        setHistory(newHistory);
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
    };

    return { history, addHistory, removeHistory };
};
