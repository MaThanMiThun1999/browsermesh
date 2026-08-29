export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pt-28 sm:pt-36 pb-16 selection:bg-indigo-500/30">
            {children}
        </div>
    );
}
