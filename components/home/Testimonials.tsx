import { Star } from "lucide-react";

export default function Testimonials() {
    const reviews = [
        { name: "Sarah Chen", role: "Data Analyst", text: "BrowserMesh has completely changed how we collect data. Undetectable and blazing fast." },
        { name: "Mark Johnson", role: "Developer", text: "The plugin marketplace is a game changer. I've built and sold 5 plugins in the first month." },
        { name: "Lisa Wong", role: "Marketing Lead", text: "Reliable, powerful and easy to use. Our agency saves hours every week." },
    ];
    
    return (
        <section className="max-w-7xl mx-auto px-6 py-8">
            <h2 className="text-2xl font-bold text-white mb-8">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {reviews.map((r) => (
                    <div key={r.name} className="glass neon-border rounded-2xl p-6 card-hover">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                {r.name[0]}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{r.name}</p>
                                <p className="text-slate-500 text-xs">{r.role}</p>
                            </div>
                            <div className="ml-auto flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} className="text-yellow-400" fill="currentColor" />)}
                            </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">&quot;{r.text}&quot;</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
