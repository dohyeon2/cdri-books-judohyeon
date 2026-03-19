import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../lib/api/api";
import { queryKeys } from "../lib/api/query";
import { BOOK_API_URL } from "../lib/consts";

export const queryKeySearchBook = queryKeys("searchBook");

export const useSearchBook = ({
    query,
    target,
}: {
    query: string;
    target?: "title" | "person" | "publisher" | "isbn";
}) => {
    return useInfiniteQuery({
        queryKey: queryKeySearchBook(query),
        queryFn: ({ pageParam = 1 }) =>
            api
                .get<SearchBookResponse>(BOOK_API_URL, {
                    params: {
                        query,
                        target,
                        page: pageParam,
                    } satisfies SearchBookParams,
                })
                .then((res) => res.data),
        getNextPageParam: (lastPage, allPages) =>
            lastPage.meta.is_end ? undefined : allPages.length + 1,
        initialPageParam: 1,
    });
};

interface SearchBookResponse {
    meta: Meta;
    documents: Document[];
}

interface Meta {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
}

interface Document {
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
}

interface SearchBookParams {
    query: string;
    sort?: "accuracy" | "latest";
    page?: number;
    size?: number;
    target?: "title" | "isbn" | "publisher" | "person";
}
