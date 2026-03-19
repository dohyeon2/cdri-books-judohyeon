import React, { useState } from "react";
import bookIcon from "../asset/icon_book.png";
import { BookItem } from "../component/BookItem";
import { useSearchBook } from "../hook/useSearchBook";
import { SearchIcon } from "../icon/SearchIcon";

const SearchSummary: React.FC<{ totalCount: number }> = ({ totalCount }) => {
    return (
        <div className="flex gap-4">
            <span>도서 검색 결과</span>
            <span>
                총 <span className="font-bold text-primary">{totalCount}</span>
                건
            </span>
        </div>
    );
};

const SearchInput: React.FC = () => {
    return (
        <div className="rounded-full bg-light-gray grid grid-cols-[auto_1fr]">
            <div className="p-2.5 grid place-items-center">
                <SearchIcon className="w-7.5 h-7.5" />
            </div>
            <input
                name="search"
                type="text"
                className="py-4.5 caption outline-none pr-2.5 text-subtle-text placeholder:text-subtle-text"
                placeholder="검색어를 입력하세요."
            />
        </div>
    );
};

const Button: React.FC<{
    children: React.ReactNode;
    onClick: () => void;
}> = ({ children, onClick }) => {
    return (
        <button
            type="button"
            className="border-subtle-text border rounded-lg p-2.5 body-2 text-subtle-text leading-none"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const EmptyList: React.FC = () => {
    return (
        <div className="grid gap-6 place-items-center">
            <img src={bookIcon} />
            <p className="caption text-secondary-text">
                검색된 결과가 없습니다.
            </p>
        </div>
    );
};

export const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: books, isLoading } = useSearchBook({ query: searchQuery });

    const isEmpty = !isLoading && books?.documents.length === 0;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.target as HTMLFormElement);
        const value = formData.get("search") as string;
        e.preventDefault();
        setSearchQuery(value);
    };

    return (
        <div className="py-26">
            <div className="max-w-240 mx-auto px-4">
                <div className="grid gap-4">
                    <h2 className="title-2 text-title-text h-9">도서 검색</h2>
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-w-142">
                        <form onSubmit={handleSubmit}>
                            <SearchInput />
                        </form>
                        <Button onClick={() => {}}>상세검색</Button>
                    </div>
                </div>
                <div className="h-6"></div>
                <SearchSummary totalCount={books?.meta.total_count ?? 0} />
                <div>
                    {isEmpty ? (
                        <div className="grid place-items-center py-30">
                            <EmptyList />
                        </div>
                    ) : (
                        <div className="py-9">
                            {books?.documents.map((x) => (
                                <BookItem
                                    key={x.isbn}
                                    thumbnail={x.thumbnail}
                                    title={x.title}
                                    authors={x.authors}
                                    price={x.price}
                                    description={x.contents}
                                    salePrice={x.sale_price}
                                    url={x.url}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
