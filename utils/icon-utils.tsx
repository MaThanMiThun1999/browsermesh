import * as Lucide from "lucide-react";
import * as Fa from "react-icons/fa";

/**
 * Dynamically selects an appropriate icon based on a table column name.
 */
export function getColumnIcon(col: string, className: string = "w-4 h-4") {
    const lw = col.toLowerCase();
    if (lw.includes("id") || lw.includes("sku")) return <Lucide.Tag className={className} />;
    if (lw.includes("price") || lw.includes("cost"))
        return <Lucide.CreditCard className={className} />;
    if (lw.includes("stock") || lw.includes("inventory") || lw.includes("quantity"))
        return <Lucide.Package className={className} />;
    if (lw.includes("date") || lw.includes("time") || lw.includes("updated"))
        return <Lucide.Clock className={className} />;
    if (lw.includes("url") || lw.includes("link") || lw.includes("image"))
        return <Lucide.Link className={className} />;
    if (lw.includes("name") || lw.includes("title")) return <Lucide.Type className={className} />;
    return <Lucide.AlignLeft className={className} />;
}

/**
 * Dynamically selects an appropriate icon based on a plugin's category and tags.
 * Falls back to a contextual lucide icon if no iconUrl is provided.
 */
export function getDynamicPluginIcon(
    category?: string,
    tags?: string[],
    className: string = "h-7 w-7",
    iconUrl?: string | null
) {
    if (iconUrl) {
        return (
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

    // 1. Specific Brand / Social Media
    if (combined.includes("twitter") || combined.includes("x.com"))
        return <Fa.FaTwitter className={className} style={{ color: "#1DA1F2" }} />;
    if (combined.includes("instagram"))
        return <Fa.FaInstagram className={className} style={{ color: "#E1306C" }} />;
    if (combined.includes("linkedin"))
        return <Fa.FaLinkedin className={className} style={{ color: "#0077b5" }} />;
    if (combined.includes("youtube"))
        return <Fa.FaYoutube className={className} style={{ color: "#FF0000" }} />;
    if (combined.includes("github") || combined.includes("repository"))
        return <Fa.FaGithub className={className} />;

    // 2. Real Estate & Property
    if (
        combined.includes("real estate") ||
        combined.includes("property") ||
        combined.includes("house") ||
        combined.includes("zillow") ||
        combined.includes("rent")
    ) {
        return <Lucide.Building className={className} />;
    }

    // 3. E-commerce & Shopping
    if (
        combined.includes("shop") ||
        combined.includes("ecommerce") ||
        combined.includes("product") ||
        combined.includes("amazon") ||
        combined.includes("ebay") ||
        combined.includes("price")
    ) {
        return <Fa.FaShoppingCart className={className} />;
    }

    // 4. Jobs & Recruitment
    if (
        combined.includes("job") ||
        combined.includes("recruit") ||
        combined.includes("career") ||
        combined.includes("indeed")
    ) {
        return <Lucide.Briefcase className={className} />;
    }

    // 5. Finance, Crypto, & Stocks
    if (combined.includes("crypto") || combined.includes("bitcoin") || combined.includes("web3")) {
        return <Fa.FaBitcoin className={className} style={{ color: "#F7931A" }} />;
    }
    if (
        combined.includes("finance") ||
        combined.includes("stock") ||
        combined.includes("market") ||
        combined.includes("money")
    ) {
        return <Lucide.TrendingUp className={className} />;
    }

    // 6. Travel, Flights, & Hotels
    if (
        combined.includes("travel") ||
        combined.includes("flight") ||
        combined.includes("airline")
    ) {
        return <Lucide.Plane className={className} />;
    }
    if (combined.includes("hotel") || combined.includes("booking") || combined.includes("airbnb")) {
        return <Lucide.Hotel className={className} />;
    }

    // 7. Maps, Local & Reviews
    if (
        combined.includes("map") ||
        combined.includes("local") ||
        combined.includes("places") ||
        combined.includes("yelp") ||
        combined.includes("restaurant")
    ) {
        return <Fa.FaMapMarkerAlt className={className} />;
    }
    if (
        combined.includes("review") ||
        combined.includes("rating") ||
        combined.includes("feedback")
    ) {
        return <Fa.FaStar className={className} style={{ color: "#FFD700" }} />;
    }

    // 8. Leads, Contacts, & B2B
    if (
        combined.includes("lead") ||
        combined.includes("email") ||
        combined.includes("contact") ||
        combined.includes("b2b")
    ) {
        return <Fa.FaAddressCard className={className} />;
    }
    if (combined.includes("phone") || combined.includes("number")) {
        return <Fa.FaPhone className={className} />;
    }

    // 9. AI, LLM, & Machine Learning
    if (
        combined.includes("ai") ||
        combined.includes("llm") ||
        combined.includes("chatgpt") ||
        combined.includes("prompt") ||
        combined.includes("machine learning")
    ) {
        return <Lucide.Brain className={className} />;
    }
    if (combined.includes("bot") || combined.includes("automation")) {
        return <Lucide.Bot className={className} />;
    }

    // 10. Media: Images, Video, Audio
    if (combined.includes("image") || combined.includes("photo") || combined.includes("picture"))
        return <Lucide.Image className={className} />;
    if (combined.includes("video") || combined.includes("movie") || combined.includes("stream"))
        return <Lucide.Video className={className} />;
    if (combined.includes("audio") || combined.includes("music") || combined.includes("podcast"))
        return <Lucide.Music className={className} />;

    // 11. Social & Community (Generic)
    if (
        combined.includes("social") ||
        combined.includes("profile") ||
        combined.includes("community") ||
        combined.includes("forum")
    ) {
        return <Lucide.Users className={className} />;
    }

    // 12. News, Blogs, & Articles
    if (
        combined.includes("news") ||
        combined.includes("article") ||
        combined.includes("blog") ||
        combined.includes("press")
    ) {
        return <Lucide.Newspaper className={className} />;
    }

    // 13. Data, Databases, & Analytics
    if (
        combined.includes("data") ||
        combined.includes("database") ||
        combined.includes("analytics") ||
        combined.includes("metrics")
    ) {
        return <Lucide.Database className={className} />;
    }

    // 14. Code & Tech
    if (
        combined.includes("code") ||
        combined.includes("dev") ||
        combined.includes("api") ||
        combined.includes("tech")
    ) {
        return <Lucide.Code className={className} />;
    }

    // 15. Search & SEO
    if (
        combined.includes("search") ||
        combined.includes("seo") ||
        combined.includes("google") ||
        combined.includes("bing") ||
        combined.includes("keyword")
    ) {
        return <Lucide.Search className={className} />;
    }

    // 16. Documents & Text
    if (
        combined.includes("text") ||
        combined.includes("document") ||
        combined.includes("pdf") ||
        combined.includes("book")
    ) {
        return <Lucide.FileText className={className} />;
    }

    // 17. Vehicles & Automotive
    if (combined.includes("car") || combined.includes("auto") || combined.includes("vehicle")) {
        return <Lucide.Car className={className} />;
    }

    // 18. Gaming
    if (combined.includes("game") || combined.includes("gaming") || combined.includes("steam")) {
        return <Lucide.Gamepad className={className} />;
    }

    // 19. Hardware & Performance
    if (combined.includes("cpu") || combined.includes("hardware") || combined.includes("gpu")) {
        return <Lucide.Cpu className={className} />;
    }

    // 20. Fallbacks for general web scraping
    if (combined.includes("web") || combined.includes("crawler") || combined.includes("spider")) {
        return <Lucide.Globe className={className} />;
    }

    // Ultimate default
    return <Lucide.Box className={className} />;
}
