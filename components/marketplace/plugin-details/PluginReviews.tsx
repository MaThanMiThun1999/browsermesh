"use client";

import { useState, useEffect } from "react";
import { Star, ThumbsUp, MessageSquare, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { getPublicPluginReviews, PublicPluginReviewsData } from "@/lib/api";
import { formatRelativeTime } from "@/utils/date";

import { siteInfo } from "@/data/siteInfo";

interface ReviewItem {
    id: string | number;
    name: string;
    role: string;
    avatar?: string;
    fallbackAvatar: string;
    bg: string;
    rating: number;
    comment: string;
    likes: number;
    date: string;
}

export interface PluginReviewsProps {
    id?: string;
    slug?: string;
    averageRating?: number | null;
    reviewCount?: number;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
    {
        id: 1,
        name: "Priya Shah",
        role: "Data Analyst",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "P",
        bg: "bg-rose-500",
        rating: 5,
        comment:
            "Works flawlessly! Extracted thousands of listings without a single block. Highly recommended for production scraping.",
        likes: 24,
        date: "3 days ago",
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Software Engineer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "M",
        bg: "bg-blue-500",
        rating: 5,
        comment:
            "Great plugin. Easy to integrate and the data quality is excellent. Support is very responsive too.",
        likes: 18,
        date: "1 week ago",
    },
    {
        id: 3,
        name: "David Wilson",
        role: "CTO at ShopScout",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "D",
        bg: "bg-emerald-500",
        rating: 4,
        comment:
            "Reliable and fast. Handles pagination and anti-bot very well. Would love more filters in the next update!",
        likes: 12,
        date: "2 weeks ago",
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        role: "Lead Scraper Specialist",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "S",
        bg: "bg-purple-500",
        rating: 5,
        comment:
            "Extremely stable. Handled 500,000 requests without getting blocked once. The proxy rotational integration works like magic!",
        likes: 31,
        date: "3 weeks ago",
    },
    {
        id: 5,
        name: "Alex Rivera",
        role: "Ecommerce Founder",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "A",
        bg: "bg-amber-500",
        rating: 5,
        comment:
            "Saved our team months of development time. We monitor price data smoothly every hour.",
        likes: 15,
        date: "1 month ago",
    },
];

export default function PluginReviews({
    id,
    slug,
    averageRating: propAverageRating,
    reviewCount: propReviewCount,
}: PluginReviewsProps) {
    const handleWriteReviewClick = () => {
        const consoleTargetUrl = `${siteInfo.consoleUrl}/marketplace/${slug || id || ""}?tab=reviews`;
        window.open(consoleTargetUrl, "_blank", "noopener,noreferrer");
    };
    const [fetchedData, setFetchedData] = useState<PublicPluginReviewsData | null>(null);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [reviewLikes, setReviewLikes] = useState<{ [key: string]: number }>({});
    const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (!slug) return;
        let isMounted = true;

        getPublicPluginReviews(slug).then((res) => {
            if (isMounted) {
                if (res) {
                    setFetchedData(res);
                }
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, [slug]);

    const activeRating = fetchedData?.averageRating ?? propAverageRating ?? 4.8;
    const activeCount = fetchedData?.reviewCount ?? propReviewCount ?? 0;
    const activeBreakdown = fetchedData?.breakdown ?? { 5: 78, 4: 17, 3: 4, 2: 1, 1: 0 };

    const rawList: ReviewItem[] =
        fetchedData && Array.isArray(fetchedData.reviews) && fetchedData.reviews.length > 0
            ? fetchedData.reviews.map((r, i) => ({
                  id: r.id || i,
                  name: r.name || "Verified Developer",
                  role: r.role || "Data Engineer",
                  fallbackAvatar: (r.name || "V").charAt(0).toUpperCase(),
                  bg: [
                      "bg-rose-500",
                      "bg-blue-500",
                      "bg-emerald-500",
                      "bg-purple-500",
                      "bg-amber-500",
                  ][i % 5],
                  rating: r.rating || 5,
                  comment: r.comment,
                  likes: r.likes || 12,
                  date: r.date ? formatRelativeTime(r.date) : "Recently",
              }))
            : DEFAULT_REVIEWS;

    const toggleLikeReview = (id: string | number) => {
        const key = String(id);
        const isLiked = !!likedReviews[key];
        const currentLikes =
            reviewLikes[key] ?? (rawList.find((r) => String(r.id) === key)?.likes || 0);

        setLikedReviews((prev) => ({ ...prev, [key]: !isLiked }));
        setReviewLikes((prev) => ({
            ...prev,
            [key]: currentLikes + (isLiked ? -1 : 1),
        }));
    };

    const handleLoadMoreToggle = () => {
        if (isLoadingMore) return;

        if (visibleCount >= rawList.length) {
            setVisibleCount(3);
            return;
        }

        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, rawList.length));
            setIsLoadingMore(false);
        }, 300);
    };

    const displayedReviews = rawList.slice(0, visibleCount);
    const hasMore = visibleCount < rawList.length;

    return (
        <div className="w-full bg-[#080517]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-5 sm:gap-6">
            {/* Responsive Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                        Customer Reviews
                    </h2>
                    {loading && <Loader2 size={16} className="animate-spin text-indigo-400" />}
                </div>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono whitespace-nowrap">
                    Showing {displayedReviews.length} of {rawList.length} reviews
                </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-5 sm:gap-6 w-full">
                {/* Left Overall Rating Box */}
                <div className="w-full lg:w-[280px] shrink-0 h-auto self-start bg-[#050312] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center shadow-inner">
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                {activeRating.toFixed(1)}
                            </span>
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            className={`size-3.5 ${
                                                i < Math.round(activeRating)
                                                    ? "text-amber-400 fill-amber-400"
                                                    : "text-slate-600 fill-slate-700"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-400 text-[11px] sm:text-xs mt-1">
                                    ({activeCount.toLocaleString()} reviews)
                                </span>
                            </div>
                        </div>

                        {/* Rating Breakdown Bars */}
                        <div className="w-full flex flex-col gap-2.5 mt-4 mb-5">
                            {[
                                { stars: 5, pct: activeBreakdown[5] || 0 },
                                { stars: 4, pct: activeBreakdown[4] || 0 },
                                { stars: 3, pct: activeBreakdown[3] || 0 },
                                { stars: 2, pct: activeBreakdown[2] || 0 },
                                { stars: 1, pct: activeBreakdown[1] || 0 },
                            ].map((row) => (
                                <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                                    <span className="text-slate-400 w-4 font-medium text-right">
                                        {row.stars}★
                                    </span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all duration-500"
                                            style={{ width: `${row.pct}%` }}
                                        />
                                    </div>
                                    <span className="text-slate-400 w-9 text-right text-[11px] font-mono">
                                        {row.pct}%
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleWriteReviewClick}
                        className="w-full bg-gradient-to-r from-[#4c35e6] to-[#5b43f0] hover:from-[#5841f5] hover:to-[#674ff9] text-white font-bold text-xs py-3 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                        Write a Review
                    </button>
                </div>

                {/* Right Reviews List Box */}
                <div className="flex-1 bg-[#050312] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-inner w-full">
                    <div className="flex flex-col divide-y divide-white/5">
                        {displayedReviews.map((rev, idx) => {
                            const key = String(rev.id);
                            const currentLikes = reviewLikes[key] ?? rev.likes;
                            const isLiked = !!likedReviews[key];

                            return (
                                <div
                                    key={rev.id}
                                    className={`flex flex-col gap-3 ${
                                        idx === 0
                                            ? "pb-4 sm:pb-5"
                                            : idx === displayedReviews.length - 1
                                              ? "pt-4 sm:pt-5"
                                              : "py-4 sm:py-5"
                                    }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            {rev.avatar &&
                                            typeof rev.avatar === "string" &&
                                            rev.avatar.trim() !== "" &&
                                            rev.avatar !== "null" &&
                                            rev.avatar !== "undefined" ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={rev.avatar}
                                                    alt={rev.name}
                                                    title={rev.name}
                                                    width={40}
                                                    height={40}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = "none";
                                                        e.currentTarget.nextElementSibling?.classList.remove(
                                                            "hidden"
                                                        );
                                                    }}
                                                />
                                            ) : null}
                                            <div
                                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${rev.bg} text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0 ${
                                                    rev.avatar ? "hidden" : ""
                                                }`}
                                            >
                                                {rev.fallbackAvatar}
                                            </div>

                                            <div className="flex flex-col">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span className="text-white font-bold text-xs sm:text-sm">
                                                        {rev.name}
                                                    </span>
                                                    <span className="text-slate-500 text-[10px]">
                                                        • {rev.date}
                                                    </span>
                                                </div>
                                                <span className="text-slate-400 text-[11px] sm:text-xs">
                                                    {rev.role}
                                                </span>
                                                <div className="flex items-center gap-0.5 mt-1">
                                                    {[...Array(rev.rating)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            size={11}
                                                            className="text-amber-400 fill-amber-400"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0 self-end sm:self-start pt-1 sm:pt-0">
                                            <button
                                                onClick={() => toggleLikeReview(rev.id)}
                                                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                                                    isLiked
                                                        ? "text-indigo-400 font-bold"
                                                        : "hover:text-white"
                                                }`}
                                            >
                                                <ThumbsUp size={13} />
                                                <span>{currentLikes}</span>
                                            </button>
                                            <button className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                                                <MessageSquare size={13} />
                                                <span>Reply</span>
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-13">
                                        {rev.comment}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom Full-Width Interactive Load More Button */}
            {rawList.length > 3 && (
                <button
                    onClick={handleLoadMoreToggle}
                    disabled={isLoadingMore}
                    className="w-full bg-[#050312] border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white text-xs font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md group disabled:opacity-50 cursor-pointer"
                >
                    {isLoadingMore ? (
                        <>
                            <Loader2 size={15} className="animate-spin text-indigo-400" />
                            <span>Loading more reviews...</span>
                        </>
                    ) : hasMore ? (
                        <>
                            <span>
                                Load more reviews ({rawList.length - visibleCount} remaining)
                            </span>
                            <ChevronDown
                                size={14}
                                className="group-hover:translate-y-0.5 transition-transform"
                            />
                        </>
                    ) : (
                        <>
                            <span>Show less</span>
                            <ChevronUp
                                size={14}
                                className="group-hover:-translate-y-0.5 transition-transform"
                            />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
