/* eslint-disable react-hooks/refs */
import {
    autoUpdate,
    flip,
    size,
    useDismiss,
    useFloating,
    useInteractions,
} from "@floating-ui/react";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import bookIcon from "../asset/icon_book.png";
import { BookItem } from "../component/BookItem";
import { useSearchBook } from "../hook/useSearchBook";
import { useSearchHistory } from "../hook/useSearchHistory";
import { SearchIcon } from "../icon/SearchIcon";
import { XIcon } from "../icon/XIcon";

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

const SearchHistoryItem: React.FC<{
    children: string;
    onDelete: () => void;
    onSubmit: (query: string) => void;
}> = ({ children, onDelete, onSubmit }) => {
    return (
        <div className="py-3 body-2 text-subtle-text leading-none pr-6 flex justify-between items-center">
            <button type="button" onClick={() => onSubmit(children)}>
                {children}
            </button>
            <button type="button" onClick={onDelete}>
                <XIcon />
            </button>
        </div>
    );
};

const SearchInput: React.FC<{
    onSubmit: (query: string) => void;
}> = ({ onSubmit: handleSubmit }) => {
    const [query, setQuery] = useState("");
    const input = useRef<HTMLInputElement>(null);
    const { history, removeHistory, addHistory } = useSearchHistory();
    const [isFocused, setIsFocused] = useState(false);
    const { refs, floatingStyles, context } = useFloating({
        open: isFocused,
        onOpenChange: setIsFocused,
        placement: "bottom-start",
        middleware: [
            flip(),
            size({
                apply: ({ rects, elements }) => {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                        maxWidth: `${rects.reference.width}px`,
                    });
                },
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(query);
                addHistory(query);
                setIsFocused(false);
            }}
        >
            <div ref={refs.setReference} {...getReferenceProps()} tabIndex={-1}>
                <div
                    className={classNames(
                        "rounded-[24px] bg-light-gray grid grid-cols-[auto_1fr] overflow-hidden",
                        {
                            "rounded-b-none": history.length > 0 && isFocused,
                        },
                    )}
                >
                    <div className="p-2.5 grid place-items-center">
                        <SearchIcon className="w-7.5 h-7.5" />
                    </div>
                    <input
                        ref={input}
                        name="search"
                        type="text"
                        onFocusCapture={() => setIsFocused(true)}
                        className="py-4.5 caption outline-none pr-2.5 text-subtle-text placeholder:text-subtle-text"
                        placeholder="검색어를 입력하세요."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsFocused(true);
                        }}
                    />
                </div>
                {isFocused && history.length > 0 && (
                    <div
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                        style={floatingStyles}
                        className="bg-light-gray rounded-b-[24px] pl-[50px] py-4 z-50"
                    >
                        {history.map((x) => (
                            <SearchHistoryItem
                                key={x}
                                onSubmit={(query) => {
                                    setQuery(query);
                                    handleSubmit(query);
                                    setIsFocused(false);
                                }}
                                onDelete={() => {
                                    removeHistory(x);
                                }}
                            >
                                {x}
                            </SearchHistoryItem>
                        ))}
                    </div>
                )}
            </div>
        </form>
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

    return (
        <div className="py-26">
            <div className="max-w-240 mx-auto px-4">
                <div className="grid gap-4">
                    <h2 className="title-2 text-title-text h-9">도서 검색</h2>
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-w-142">
                        <SearchInput onSubmit={setSearchQuery} />

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
