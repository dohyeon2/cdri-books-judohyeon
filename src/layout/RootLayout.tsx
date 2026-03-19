import classNames from "classnames";
import React, { type PropsWithChildren } from "react";
import { NavLink, Outlet } from "react-router";

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
            <NavLink
                to={href}
                className={({ isActive }) =>
                    classNames("flex items-center h-full body-1", {
                        "underline underline-offset-8 decoration-primary":
                            isActive,
                    })
                }
            >
                {children}
            </NavLink>
        </li>
    );
};

export const RootLayout: React.FC = () => {
    return (
        <div>
            <div className="sticky top-0 z-10">
                <GNB />
            </div>
            <Outlet />
        </div>
    );
};
