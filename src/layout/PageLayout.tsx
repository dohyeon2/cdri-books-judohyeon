import React, { type PropsWithChildren } from "react";

export const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="py-26">
            <div className="max-w-240 mx-auto px-4">{children}</div>
        </div>
    );
};
