import React, { type PropsWithChildren } from "react";

const GNB: React.FC = () => {
    return (
        <header className="bg-white">
            <div className="max-w-384 mx-auto px-4 grid grid-cols-[auto_1fr]">
                <Brand />
                <nav>
                    <ul className="flex gap-14 h-full justify-center">
                        <MenuItem href="/">도서 검색</MenuItem>
                        <MenuItem href="/favorites">내가 찜한 책</MenuItem>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const Brand: React.FC = () => {
    return <h1 className="title-1 py-6">CERTICOS BOOKS</h1>;
};

const MenuItem: React.FC<PropsWithChildren<{ href: string }>> = ({
    children,
    href,
}) => {
    return (
        <li>
            <a href={href} className="flex items-center h-full body-1">
                {children}
            </a>
        </li>
    );
};

export const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <div className="sticky top-0 z-10">
                <GNB />
            </div>
            {children}
        </div>
    );
};
