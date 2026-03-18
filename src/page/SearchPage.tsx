import React, { useState } from "react";
import { SearchIcon } from "../icon/SearchIcon";

const SearchSummary: React.FC = () => {
    return (
        <div className="flex gap-4">
            <span>도서 검색 결과</span>
            <span>
                총 <span className="font-bold text-primary">0</span>건
            </span>
        </div>
    );
};

const SearchInput: React.FC<{
    value: string;
    onChange: (value: string) => void;
}> = ({ value, onChange }) => {
    return (
        <div className="rounded-full bg-light-gray grid grid-cols-[auto_1fr]">
            <div className="p-2.5 grid place-items-center">
                <SearchIcon className="w-7.5 h-7.5" />
            </div>
            <input
                type="text"
                className="py-4.5 caption outline-none pr-2.5 text-subtle-text placeholder:text-subtle-text w-120"
                placeholder="검색어를 입력하세요."
                value={value}
                onChange={(e) => onChange(e.target.value)}
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

export const SearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="py-26">
            <div className="max-w-240 mx-auto">
                <div className="grid gap-4">
                    <h2 className="title-2 text-title-text h-9">도서 검색</h2>
                    <div className="flex gap-4 items-center">
                        <SearchInput
                            value={searchQuery}
                            onChange={setSearchQuery}
                        />
                        <Button onClick={() => {}}>상세검색</Button>
                    </div>
                </div>
                <div className="h-6"></div>
                <SearchSummary />
            </div>
        </div>
    );
};
