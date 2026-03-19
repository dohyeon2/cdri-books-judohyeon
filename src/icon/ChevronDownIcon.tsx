import React from "react";

interface Props {
    className?: string;
}

export const ChevronDownIcon: React.FC<Props> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 14 8"
            fill="none"
            className={className}
        >
            <path
                d="M2 -5.24537e-07L7 5L12 -8.74228e-08L14 1L7 8L-4.37114e-08 0.999999L2 -5.24537e-07Z"
                fill="#B1B8C0"
            />
        </svg>
    );
};
