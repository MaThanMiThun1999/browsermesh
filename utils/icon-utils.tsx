import * as Lucide from "lucide-react";
import * as Fa6 from "react-icons/fa6";

/**
 * Dynamically selects an appropriate icon based on a table column name.
 */
export function getColumnIcon(col: string, className: string = "w-4 h-4") {
    const lw = col.toLowerCase();
    if (lw.includes("id") || lw.includes("sku")) return <Lucide.Tag className={className} />;
    if (lw.includes("price") || lw.includes("cost") || lw.includes("amount") || lw.includes("fee"))
        return <Lucide.CreditCard className={className} />;
    if (
        lw.includes("stock") ||
        lw.includes("inventory") ||
        lw.includes("quantity") ||
        lw.includes("qty")
    )
        return <Lucide.Package className={className} />;
    if (
        lw.includes("date") ||
        lw.includes("time") ||
        lw.includes("updated") ||
        lw.includes("created")
    )
        return <Lucide.Clock className={className} />;
    if (lw.includes("url") || lw.includes("link") || lw.includes("image") || lw.includes("avatar"))
        return <Lucide.Link className={className} />;
    if (lw.includes("name") || lw.includes("title") || lw.includes("label"))
        return <Lucide.Type className={className} />;
    if (lw.includes("rating") || lw.includes("star") || lw.includes("score"))
        return <Lucide.Star className={className} />;
    if (
        lw.includes("location") ||
        lw.includes("city") ||
        lw.includes("address") ||
        lw.includes("country")
    )
        return <Lucide.MapPin className={className} />;
    if (lw.includes("email") || lw.includes("mail") || lw.includes("contact"))
        return <Lucide.Mail className={className} />;
    if (lw.includes("phone") || lw.includes("mobile") || lw.includes("tel"))
        return <Lucide.Phone className={className} />;
    return <Lucide.AlignLeft className={className} />;
}

/**
 * Dynamically selects an accurate, brand-matching or category-matching icon based on a plugin's category and tags.
 * Falls back to a contextual Lucide icon if no custom iconUrl image is provided.
 */
export function getDynamicPluginIcon(
    category?: string,
    tags?: string[],
    className: string = "h-7 w-7",
    iconUrl?: string | null
) {
    if (
        iconUrl &&
        typeof iconUrl === "string" &&
        iconUrl.trim() !== "" &&
        iconUrl !== "null" &&
        iconUrl !== "undefined"
    ) {
        return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
                src={iconUrl}
                alt="plugin icon"
                className={`${className} rounded-md object-contain`}
            />
        );
    }

    const safeCategory = (category || "").toLowerCase();
    const safeTags = (tags || []).map((t) => t.toLowerCase());
    const combined = [safeCategory, ...safeTags].join(" ");

    // 1. SPECIFIC MAJOR BRANDS & PLATFORMS (Highest priority for accurate branding)
    if (combined.includes("amazon"))
        return <Fa6.FaAmazon className={className} style={{ color: "#FF9900" }} />;
    if (
        combined.includes("google") ||
        combined.includes("gmaps") ||
        combined.includes("google maps")
    )
        return <Fa6.FaGoogle className={className} style={{ color: "#4285F4" }} />;
    if (combined.includes("instagram"))
        return <Fa6.FaInstagram className={className} style={{ color: "#E1306C" }} />;
    if (combined.includes("linkedin"))
        return <Fa6.FaLinkedin className={className} style={{ color: "#0A66C2" }} />;
    if (combined.includes("twitter") || combined.includes("x.com") || combined.includes("tweet"))
        return <Fa6.FaXTwitter className={className} style={{ color: "#F8FAFC" }} />;
    if (combined.includes("youtube"))
        return <Fa6.FaYoutube className={className} style={{ color: "#FF0000" }} />;
    if (combined.includes("reddit"))
        return <Fa6.FaReddit className={className} style={{ color: "#FF4500" }} />;
    if (combined.includes("facebook") || combined.includes("fb"))
        return <Fa6.FaFacebook className={className} style={{ color: "#1877F2" }} />;
    if (combined.includes("tiktok"))
        return <Fa6.FaTiktok className={className} style={{ color: "#25F4EE" }} />;
    if (combined.includes("github"))
        return <Fa6.FaGithub className={className} style={{ color: "#F0F6FC" }} />;
    if (combined.includes("shopify"))
        return <Fa6.FaShopify className={className} style={{ color: "#95BF47" }} />;
    if (combined.includes("ebay"))
        return <Fa6.FaEbay className={className} style={{ color: "#E53238" }} />;
    if (combined.includes("pinterest"))
        return <Fa6.FaPinterest className={className} style={{ color: "#BD081C" }} />;
    if (combined.includes("spotify"))
        return <Fa6.FaSpotify className={className} style={{ color: "#1DB954" }} />;
    if (combined.includes("twitch"))
        return <Fa6.FaTwitch className={className} style={{ color: "#9146FF" }} />;
    if (combined.includes("yelp"))
        return <Fa6.FaYelp className={className} style={{ color: "#AF0606" }} />;
    if (combined.includes("discord"))
        return <Fa6.FaDiscord className={className} style={{ color: "#5865F2" }} />;
    if (combined.includes("slack"))
        return <Fa6.FaSlack className={className} style={{ color: "#E01E5A" }} />;
    if (combined.includes("telegram"))
        return <Fa6.FaTelegram className={className} style={{ color: "#24A1DE" }} />;
    if (combined.includes("whatsapp"))
        return <Fa6.FaWhatsapp className={className} style={{ color: "#25D366" }} />;
    if (combined.includes("wikipedia") || combined.includes("wiki"))
        return <Fa6.FaWikipediaW className={className} style={{ color: "#FFFFFF" }} />;

    // 2. REAL ESTATE & PROPERTY
    if (
        combined.includes("real estate") ||
        combined.includes("property") ||
        combined.includes("house") ||
        combined.includes("zillow") ||
        combined.includes("rent") ||
        combined.includes("apartment")
    ) {
        return <Lucide.Building className={className} />;
    }

    // 3. E-COMMERCE & SHOPPING
    if (
        combined.includes("shop") ||
        combined.includes("ecommerce") ||
        combined.includes("product") ||
        combined.includes("price") ||
        combined.includes("store") ||
        combined.includes("retail")
    ) {
        return <Lucide.ShoppingBag className={className} />;
    }

    // 4. JOBS & RECRUITMENT
    if (
        combined.includes("job") ||
        combined.includes("recruit") ||
        combined.includes("career") ||
        combined.includes("indeed") ||
        combined.includes("hire")
    ) {
        return <Lucide.Briefcase className={className} />;
    }

    // 5. FINANCE, CRYPTO, & STOCKS
    if (
        combined.includes("crypto") ||
        combined.includes("bitcoin") ||
        combined.includes("web3") ||
        combined.includes("nft")
    ) {
        return <Fa6.FaBitcoin className={className} style={{ color: "#F7931A" }} />;
    }
    if (
        combined.includes("finance") ||
        combined.includes("stock") ||
        combined.includes("market") ||
        combined.includes("money") ||
        combined.includes("trading")
    ) {
        return <Lucide.TrendingUp className={className} />;
    }

    // 6. TRAVEL, FLIGHTS, & HOTELS
    if (
        combined.includes("travel") ||
        combined.includes("flight") ||
        combined.includes("airline") ||
        combined.includes("vacation")
    ) {
        return <Lucide.Plane className={className} />;
    }
    if (combined.includes("hotel") || combined.includes("booking") || combined.includes("airbnb")) {
        return <Lucide.Hotel className={className} />;
    }

    // 7. MAPS, LOCAL, PLACES & REVIEWS
    if (
        combined.includes("map") ||
        combined.includes("local") ||
        combined.includes("places") ||
        combined.includes("restaurant") ||
        combined.includes("location")
    ) {
        return <Lucide.MapPin className={className} />;
    }
    if (
        combined.includes("review") ||
        combined.includes("rating") ||
        combined.includes("feedback")
    ) {
        return <Lucide.Star className={className} style={{ color: "#F59E0B" }} />;
    }

    // 8. LEADS, CONTACTS, & B2B
    if (
        combined.includes("lead") ||
        combined.includes("email") ||
        combined.includes("contact") ||
        combined.includes("b2b") ||
        combined.includes("prospect")
    ) {
        return <Lucide.Users className={className} />;
    }

    // 9. AI, BOT & AUTOMATION
    if (
        combined.includes("ai") ||
        combined.includes("llm") ||
        combined.includes("chatgpt") ||
        combined.includes("prompt") ||
        combined.includes("gpt")
    ) {
        return <Lucide.Brain className={className} />;
    }
    if (
        combined.includes("bot") ||
        combined.includes("automation") ||
        combined.includes("scraper")
    ) {
        return <Lucide.Bot className={className} />;
    }

    // 10. MEDIA: IMAGES, VIDEO, AUDIO
    if (combined.includes("image") || combined.includes("photo") || combined.includes("picture"))
        return <Lucide.Image className={className} />;
    if (combined.includes("video") || combined.includes("movie") || combined.includes("stream"))
        return <Lucide.Video className={className} />;
    if (combined.includes("audio") || combined.includes("music") || combined.includes("podcast"))
        return <Lucide.Music className={className} />;

    // 11. SOCIAL & COMMUNITY
    if (
        combined.includes("social") ||
        combined.includes("profile") ||
        combined.includes("community") ||
        combined.includes("forum")
    ) {
        return <Lucide.MessageSquare className={className} />;
    }

    // 12. DATA & ANALYTICS
    if (
        combined.includes("data") ||
        combined.includes("database") ||
        combined.includes("analytics") ||
        combined.includes("metrics")
    ) {
        return <Lucide.Database className={className} />;
    }

    // 13. CODE & DEV
    if (
        combined.includes("code") ||
        combined.includes("dev") ||
        combined.includes("api") ||
        combined.includes("tech")
    ) {
        return <Lucide.Code className={className} />;
    }

    // 14. SEARCH & SEO
    if (combined.includes("search") || combined.includes("seo") || combined.includes("keyword")) {
        return <Lucide.Search className={className} />;
    }

    // 15. GENERAL WEB SCRAPING FALLBACK
    if (combined.includes("web") || combined.includes("crawler") || combined.includes("spider")) {
        return <Lucide.Globe className={className} />;
    }

    // Ultimate default
    return <Lucide.Box className={className} />;
}

/**
 * Dynamically selects an appropriate icon based on a category name.
 */
export function getCategoryIcon(name: string, className: string = "w-[18px] h-[18px]") {
    if (name.toLowerCase() === "all") return <Lucide.Globe className={className} />;
    return getDynamicPluginIcon(name, undefined, className);
}
