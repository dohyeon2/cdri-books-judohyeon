import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../lib/api/query";
import { BOOK_API_URL } from "../lib/consts";
import { api } from "../lib/api/api";

export const queryKeySearchBook = queryKeys("searchBook");

export const useSearchBook = ({ query }: { query: string }) => {
    return useQuery({
        queryKey: queryKeySearchBook(query),
        queryFn: () =>
            api
                .get<SearchBookResponse>(BOOK_API_URL, {
                    params: { query } satisfies SearchBookParams,
                })
                .then((res) => res.data),
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
