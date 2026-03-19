import React from "react";
import bookIcon from "../asset/icon_book.png";
import { PageLayout } from "../layout/PageLayout";
import { useFavorite } from "../hook/useFavorite";
import { BookItem } from "../component/BookItem";

const FavoriteSummary: React.FC<{ totalCount: number }> = ({ totalCount }) => {
    return (
        <div className="flex gap-4">
            <span>찜한 책</span>
            <span>
                총 <span className="font-bold text-primary">{totalCount}</span>
                건
            </span>
        </div>
    );
};

const EmptyList: React.FC = () => {
    return (
        <div className="grid gap-6 place-items-center">
            <img src={bookIcon} />
            <p className="caption text-secondary-text">찜한 책이 없습니다.</p>
        </div>
    );
};

export const FavoritePage: React.FC = () => {
    const { favorites = [] } = useFavorite();
    const isEmpty = favorites.length === 0;
    return (
        <PageLayout>
            <h2 className="title-2 text-title-text h-9">내가 찜한 책</h2>
            <div className="h-6"></div>
            <FavoriteSummary totalCount={favorites.length} />
            <div>
                {isEmpty ? (
                    <div className="grid place-items-center py-30">
                        <EmptyList />
                    </div>
                ) : (
                    <div className="py-9">
                        {favorites.map((x) => (
                            <BookItem key={x.isbn} book={x} />
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
};
