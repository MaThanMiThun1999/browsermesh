"use client";

import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface ReviewItem {
    id: number;
    name: string;
    role: string;
    avatar: string;
    fallbackAvatar: string;
    bg: string;
    rating: number;
    comment: string;
    likes: number;
    date: string;
}

const ALL_REVIEWS: ReviewItem[] = [
    {
        id: 1,
        name: "Priya Shah",
        role: "Data Analyst",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "P",
        bg: "bg-rose-500",
        rating: 5,
        comment:
            "Works flawlessly! Extracted thousands of products without a single block. Highly recommended for Amazon data scraping.",
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
            "Saved our team months of development time. We monitor prices across 4 Amazon marketplaces smoothly every hour.",
        likes: 15,
        date: "1 month ago",
    },
    {
        id: 6,
        name: "Emily Watson",
        role: "Data Engineer",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=120",
        fallbackAvatar: "E",
        bg: "bg-indigo-500",
        rating: 5,
        comment:
            "Super fast schema parsing and clean nested JSON outputs. Couldn't ask for a better plugin!",
        likes: 9,
        date: "1 month ago",
    },
];

export default function PluginReviews() {
    const [visibleCount, setVisibleCount] = useState<number>(3);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [reviewLikes, setReviewLikes] = useState<{ [key: number]: number }>({
        1: 24,
        2: 18,
        3: 12,
        4: 31,
        5: 15,
        6: 9,
    });
    const [likedReviews, setLikedReviews] = useState<{ [key: number]: boolean }>({});

    const toggleLikeReview = (id: number) => {
        setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
        setReviewLikes((prev) => ({
            ...prev,
            [id]: prev[id] + (likedReviews[id] ? -1 : 1),
        }));
    };

    const handleLoadMoreToggle = () => {
        if (isLoadingMore) return;

        if (visibleCount >= ALL_REVIEWS.length) {
            setVisibleCount(3);
            return;
        }

        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 3, ALL_REVIEWS.length));
            setIsLoadingMore(false);
        }, 400);
    };

    const displayedReviews = ALL_REVIEWS.slice(0, visibleCount);
    const hasMore = visibleCount < ALL_REVIEWS.length;

    return (
        <div className="w-full bg-[#080517]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-5 sm:gap-6">
            {/* Responsive Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
                <h3 className="text-white font-bold text-base sm:text-lg whitespace-nowrap">
                    Customer Reviews
                </h3>
                <span className="text-[11px] sm:text-xs text-slate-400 font-mono whitespace-nowrap">
                    Showing {displayedReviews.length} of {ALL_REVIEWS.length} reviews
                </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-5 sm:gap-6 w-full">
                {/* Left Overall Rating Box */}
                <div className="w-full lg:w-[280px] shrink-0 h-auto self-start bg-[#050312] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center shadow-inner">
                    <div className="flex flex-col items-center w-full">
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                4.8
                            </span>
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={13}
                                            className="text-amber-400 fill-amber-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-400 text-[11px] sm:text-xs mt-1">
                                    (1,812 reviews)
                                </span>
                            </div>
                        </div>

                        {/* Rating Breakdown Bars */}
                        <div className="w-full flex flex-col gap-2.5 mt-4 mb-5">
                            {[
                                { stars: 5, pct: 78 },
                                { stars: 4, pct: 17 },
                                { stars: 3, pct: 4 },
                                { stars: 2, pct: 0.8 },
                                { stars: 1, pct: 0.2 },
                            ].map((row) => (
                                <div key={row.stars} className="flex items-center gap-2.5 text-xs">
                                    <span className="text-slate-400 w-4 font-medium text-right">
                                        {row.stars}★
                                    </span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full"
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

                    <button className="w-full bg-gradient-to-r from-[#4c35e6] to-[#5b43f0] hover:from-[#5841f5] hover:to-[#674ff9] text-white font-bold text-xs py-3 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.5)] transition-all hover:scale-[1.01] active:scale-[0.99]">
                        Write a Review
                    </button>
                </div>

                {/* Right Reviews List Box */}
                <div className="flex-1 bg-[#050312] border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-inner w-full">
                    <div className="flex flex-col divide-y divide-white/5">
                        {displayedReviews.map((rev, idx) => (
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
                                        <img
                                            src={rev.avatar}
                                            alt={rev.name}
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-white/10 shadow-md shrink-0"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                e.currentTarget.nextElementSibling?.classList.remove(
                                                    "hidden"
                                                );
                                            }}
                                        />
                                        <div
                                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${rev.bg} text-white font-bold text-xs flex items-center justify-center shadow-md shrink-0 hidden`}
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
                                            className={`flex items-center gap-1.5 transition-colors ${
                                                likedReviews[rev.id]
                                                    ? "text-indigo-400 font-bold"
                                                    : "hover:text-white"
                                            }`}
                                        >
                                            <ThumbsUp size={13} />
                                            <span>{reviewLikes[rev.id]}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                            <MessageSquare size={13} />
                                            <span>Reply</span>
                                        </button>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-0 sm:pl-13">
                                    {rev.comment}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Full-Width Interactive Load More Button */}
            <button
                onClick={handleLoadMoreToggle}
                disabled={isLoadingMore}
                className="w-full bg-[#050312] border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 hover:text-white text-xs font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md group disabled:opacity-50"
            >
                {isLoadingMore ? (
                    <>
                        <Loader2 size={15} className="animate-spin text-indigo-400" />
                        <span>Loading more reviews...</span>
                    </>
                ) : hasMore ? (
                    <>
                        <span>
                            Load more reviews ({ALL_REVIEWS.length - visibleCount} remaining)
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
        </div>
    );
}
