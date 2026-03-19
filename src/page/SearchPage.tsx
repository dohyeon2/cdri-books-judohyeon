/* eslint-disable react-hooks/refs */
import {
    autoUpdate,
    flip,
    offset,
    size,
    useDismiss,
    useFloating,
    useInteractions,
} from "@floating-ui/react";
import classNames from "classnames";
import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import bookIcon from "../asset/icon_book.png";
import { BookItem } from "../component/BookItem";
import { useSearchBook } from "../hook/useSearchBook";
import { useSearchHistory } from "../hook/useSearchHistory";
import { SearchIcon } from "../icon/SearchIcon";
import { XIcon } from "../icon/XIcon";
import { XIcon2 } from "../icon/XIcon2";
import { ChevronDownIcon } from "../icon/ChevronDownIcon";

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
    controller: React.RefObject<{
        input: HTMLInputElement | null;
    }>;
}> = ({ onSubmit: handleSubmit, controller }) => {
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

    useImperativeHandle(controller, () => ({
        input: input.current,
    }));

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

const Button = forwardRef<
    HTMLButtonElement,
    { children: React.ReactNode; onClick: () => void }
>(({ children, onClick }, ref) => {
    return (
        <button
            ref={ref}
            type="button"
            className="border-subtle-text border rounded-lg p-2.5 body-2 text-subtle-text leading-none"
            onClick={onClick}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button";

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

const DetailSearchButton: React.FC<{
    onSubmit: (params: {
        target: "title" | "person" | "publisher";
        query: string;
    }) => void;
}> = ({ onSubmit }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom",
        middleware: [flip(), offset(14)],
        whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <>
            <button
                type="button"
                className="border-subtle-text border rounded-lg p-2.5 body-2 text-subtle-text leading-none"
                ref={refs.setReference}
                {...getReferenceProps()}
                onClick={() => {
                    setIsOpen((p) => !p);
                }}
            >
                상세검색
            </button>
            {isOpen && (
                <div
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    style={floatingStyles}
                >
                    <DetailSearchDialog
                        onClose={() => setIsOpen(false)}
                        onSubmit={onSubmit}
                    />
                </div>
            )}
        </>
    );
};

const DetailSearchDialog: React.FC<{
    onClose: () => void;
    onSubmit: (params: {
        target: "title" | "person" | "publisher";
        query: string;
    }) => void;
}> = ({ onClose, onSubmit }) => {
    const [target, setTarget] = useState<"title" | "person" | "publisher">(
        "title",
    );
    const [query, setQuery] = useState("");
    const handleSubmit = () => {
        onSubmit({
            target,
            query,
        });
        onClose();
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="w-90 bg-white rounded-lg"
            style={{
                boxShadow: "0px 4px 14px 6px rgba(151, 151, 151, 0.15)",
            }}
        >
            <div className="flex justify-end p-2">
                <button type="button" onClick={onClose}>
                    <XIcon2 />
                </button>
            </div>
            <div className="flex gap-1 px-6">
                <DetailSearchTargetSelect
                    value={target}
                    onChange={(target) => {
                        setTarget(target);
                    }}
                />
                <input
                    type="text"
                    className="border-b border-primary py-1 px-2.5 outline-0 caption-medium text-caption-text flex-1"
                    placeholder="검색어 입력"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                />
            </div>
            <div className="h-4"></div>
            <div className="px-6 pb-9">
                <button className="caption-medium bg-primary rounded-lg p-2 text-white w-full">
                    검색하기
                </button>
            </div>
        </form>
    );
};

const DetailSearchTargetSelect: React.FC<{
    value: string;
    onChange: (value: "title" | "person" | "publisher") => void;
}> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const OPTIONS = [
        { label: "제목", value: "title" },
        { label: "저자명", value: "person" },
        { label: "출판사", value: "publisher" },
    ];

    const { refs, floatingStyles, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: "bottom-start",
        middleware: [
            flip(),
            offset(14),
            size({
                apply: ({ rects, elements }) => {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                    });
                },
            }),
        ],
        whileElementsMounted: autoUpdate,
    });

    const dismiss = useDismiss(context);
    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss]);

    return (
        <>
            <button
                ref={refs.setReference}
                {...getReferenceProps()}
                onClick={() => {
                    setIsOpen((p) => !p);
                }}
                type="button"
                className="py-1.5 px-2 border-b border-[#D2D6DA] min-w-[100px] caption-medium font-bold text-primary-text flex"
            >
                <span className="flex-1 text-left">
                    {OPTIONS.find((x) => x.value === value)?.label}
                </span>
                <span className="w-5 h-5 grid place-items-center">
                    <ChevronDownIcon className="w-[10.5px] h-[6px]" />
                </span>
            </button>
            {isOpen && (
                <div
                    className="bg-white grid"
                    ref={refs.setFloating}
                    {...getFloatingProps()}
                    style={{
                        ...floatingStyles,
                        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                >
                    {OPTIONS.filter((x) => x.value !== value).map((x) => (
                        <button
                            key={x.value}
                            type="button"
                            className="caption-medium py-1 px-2 caption-medium text-[#8D94A0] text-left"
                            onClick={() =>
                                onChange(
                                    x.value as "title" | "person" | "publisher",
                                )
                            }
                        >
                            {x.label}
                        </button>
                    ))}
                </div>
            )}
        </>
    );
};

export const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [target, setTarget] = useState<
        "title" | "person" | "publisher" | undefined
    >();
    const { data: books, isLoading } = useSearchBook({
        query: searchQuery,
        target,
    });
    const controller = useRef<{
        input: HTMLInputElement | null;
    }>(null);
    const isEmpty = !isLoading && books?.documents.length === 0;

    return (
        <div className="py-26">
            <div className="max-w-240 mx-auto px-4">
                <div className="grid gap-4">
                    <h2 className="title-2 text-title-text h-9">도서 검색</h2>
                    <div className="grid grid-cols-[1fr_auto] gap-4 items-center max-w-142">
                        <SearchInput
                            controller={
                                controller as React.RefObject<{
                                    input: HTMLInputElement | null;
                                }>
                            }
                            onSubmit={(query) => {
                                setSearchQuery(query);
                                setTarget(undefined);
                            }}
                        />
                        <DetailSearchButton
                            onSubmit={({ target, query }) => {
                                setTarget(
                                    target as "title" | "person" | "publisher",
                                );
                                setSearchQuery(query);
                                if (controller.current?.input) {
                                    controller.current.input.value = "";
                                }
                            }}
                        />
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
