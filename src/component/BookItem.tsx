import classNames from "classnames";
import { useState, type PropsWithChildren } from "react";
import { ChevronDownIcon } from "../icon/ChevronDownIcon";

export const BookItem: React.FC<{
    thumbnail: string;
    title: string;
    authors: string[];
    price: number;
    description: string;
    salePrice: number;
}> = ({ thumbnail, title, authors, price, description, salePrice }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={classNames(" border-b border-[#D2D6DA] flex gap-x-12", {
                "py-4 pl-12 pr-4": !isOpen,
                "pt-6 pb-10 pl-13.5 pr-4": isOpen,
            })}
        >
            <div
                className={classNames("relative flex-none", {
                    "w-[45px] h-[68px]": !isOpen,
                    "w-[210px] h-[280px]": isOpen,
                })}
            >
                <img src={thumbnail} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-rows-[auto_1fr] flex-1">
                <div
                    className={classNames("flex flex-none", {
                        "row-span-full": !isOpen,
                    })}
                >
                    <div className="flex items-center gap-4 break-keep flex-1">
                        <p className="title-3 text-primary-text">{title}</p>
                        <p className="body-2 text-secondary-text">
                            {authors.join(",")}
                        </p>
                    </div>
                    <div
                        className={classNames("flex items-center", {
                            hidden: isOpen,
                        })}
                    >
                        <p className="title-3 text-primary-text">
                            {price.toLocaleString("ko-KR")}원
                        </p>
                    </div>
                    <div className="w-14"></div>
                    <div className="flex gap-2 items-center">
                        <BookButton
                            variant="primary"
                            className={classNames({
                                hidden: isOpen,
                            })}
                        >
                            구매하기
                        </BookButton>
                        <BookButton onClick={() => setIsOpen(!isOpen)}>
                            <span className="inline-flex gap-1.25 items-center">
                                <p>상세보기</p>
                                <ChevronDownIcon
                                    className={classNames({
                                        "rotate-180": isOpen,
                                    })}
                                />
                            </span>
                        </BookButton>
                    </div>
                </div>
                <div
                    className={classNames("overflow-hidden grid w-full", {
                        "h-0": !isOpen,
                        "h-full": isOpen,
                    })}
                >
                    <div className="flex gap-12">
                        <div className="flex-1">
                            <h3 className="text-sm text-primary-text font-bold leading-[26px]">
                                책 소개
                            </h3>
                            <div className="h-3"></div>
                            <p
                                className="text-[10px] leading-[1.6] text-secondary-text"
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            ></p>
                        </div>
                        <div className="grid content-end gap-7">
                            <div className="grid gap-2 place-items-end">
                                <Price
                                    label="원가"
                                    price={price}
                                    strikeThrough
                                />
                                <Price label="할인가" price={salePrice} bold />
                            </div>
                            <BookButton variant="primary" className="w-60">
                                구매하기
                            </BookButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Price: React.FC<{
    label: string;
    price: number;
    strikeThrough?: boolean;
    bold?: boolean;
}> = ({ label, price, strikeThrough = false, bold = false }) => {
    return (
        <div className="flex items-center gap-2">
            <p className="text-[10px] text-subtle-text leading-[22px]">
                {label}
            </p>
            <p
                className={classNames(
                    "text-lg text-primary-text leading-[26px]",
                    {
                        "font-bold": bold,
                        "line-through": strikeThrough,
                    },
                )}
            >
                {price.toLocaleString("ko-KR")}원
            </p>
        </div>
    );
};

const BookButton: React.FC<
    PropsWithChildren<{
        variant?: "primary" | "base";
        onClick?: () => void;
        className?: string;
    }>
> = ({ children, variant = "base", onClick, className }) => {
    return (
        <button
            className={classNames(
                "py-4 px-3.25 min-w-28.75 rounded-lg leading-none caption",
                className,
                {
                    "bg-primary text-white": variant === "primary",
                    "bg-light-gray text-secondary-text": variant === "base",
                },
            )}
            onClick={onClick}
        >
            {children}
        </button>
    );
};
