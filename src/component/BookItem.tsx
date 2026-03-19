import classNames from "classnames";
import { useState, type PropsWithChildren } from "react";
import { ChevronDownIcon } from "../icon/ChevronDownIcon";
import { HeartIcon } from "../icon/HeartIcon";
import { useFavorite } from "../hook/useFavorite";

export const BookItem: React.FC<{
    book: {
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
    };
}> = ({ book }) => {
    const {
        thumbnail,
        title,
        authors,
        price,
        contents: description,
        sale_price: salePrice,
        url,
        isbn,
    } = book;
    const [isOpen, setIsOpen] = useState(false);
    const { favorites = [], addFavorite, removeFavorite } = useFavorite();
    const isFavorite = favorites.find((b) => b.isbn === isbn) !== undefined;
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
                <FavoriteButton
                    className={classNames("absolute", {
                        "w-6 h-6 top-2 right-2": isOpen,
                        "w-3 h-3 top-0.25 right-0.25": !isOpen,
                    })}
                    isFavorite={isFavorite}
                    onClick={() => {
                        if (isFavorite) {
                            removeFavorite(isbn);
                        } else {
                            addFavorite(book);
                        }
                    }}
                />
                {thumbnail && (
                    <img
                        src={thumbnail}
                        className="w-full h-full object-cover"
                    />
                )}
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
                            {(salePrice > 0 ? salePrice : price).toLocaleString(
                                "ko-KR",
                            )}
                            원
                        </p>
                    </div>
                    <div className="w-14"></div>
                    <div className="flex gap-2 items-center">
                        {!isOpen && (
                            <BookButton
                                variant="primary"
                                className={classNames({
                                    hidden: isOpen,
                                })}
                                href={url}
                            >
                                구매하기
                            </BookButton>
                        )}
                        <BookButton onClick={() => setIsOpen(!isOpen)}>
                            <span className="inline-flex gap-1.25 items-center">
                                <p>상세보기</p>
                                <ChevronDownIcon
                                    className={classNames("w-[14px] h-[8px]", {
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
                                    strikeThrough={salePrice > 0}
                                />
                                {salePrice > 0 && (
                                    <Price
                                        label="할인가"
                                        price={salePrice}
                                        bold
                                    />
                                )}
                            </div>
                            <BookButton
                                variant="primary"
                                className="w-60"
                                href={url}
                            >
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
        href?: string;
    }>
> = ({ children, variant = "base", onClick, className, href }) => {
    const Component = href ? "a" : "button";
    return (
        <Component
            type={Component === "button" ? "button" : undefined}
            href={href}
            target={href ? "_blank" : undefined}
            className={classNames(
                "inline-block py-4 px-3.25 min-w-28.75 rounded-lg leading-none caption text-center",
                className,
                {
                    "bg-primary text-white": variant === "primary",
                    "bg-light-gray text-secondary-text": variant === "base",
                },
            )}
            onClick={onClick}
        >
            {children}
        </Component>
    );
};

const FavoriteButton: React.FC<{
    isFavorite: boolean;
    className?: string;
    onClick: () => void;
}> = ({ isFavorite, className = "w-6 h-6", onClick }) => {
    return (
        <button onClick={onClick} className={className}>
            <HeartIcon isActive={isFavorite} className="w-full h-full" />
        </button>
    );
};
