import { useRef, useEffect } from "react";

export const ListEdgeObserver: React.FC<{
    onIntersect: () => void;
}> = ({ onIntersect }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onIntersect();
                }
            });
        });

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [onIntersect]);
    return <div ref={ref} />;
};
