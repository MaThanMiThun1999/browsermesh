import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "content/blog");

export interface BlogFrontmatter {
    title: string;
    description: string;
    date: string;
    author: string;
    category: string;
    tags?: string[];
    readTime?: string;
    coverImage?: string;
}

export interface BlogPostData {
    slug: string;
    frontmatter: BlogFrontmatter;
    content: string;
}

export function getBlogSlugs(): string[] {
    if (!fs.existsSync(blogDirectory)) return [];
    return fs
        .readdirSync(blogDirectory)
        .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getBlogPostBySlug(slug: string): BlogPostData | null {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(blogDirectory, `${realSlug}.md`);
    const fullPathMdx = path.join(blogDirectory, `${realSlug}.mdx`);

    let fileContents = "";
    if (fs.existsSync(fullPath)) {
        fileContents = fs.readFileSync(fullPath, "utf8");
    } else if (fs.existsSync(fullPathMdx)) {
        fileContents = fs.readFileSync(fullPathMdx, "utf8");
    } else {
        return null;
    }

    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        frontmatter: data as BlogFrontmatter,
        content,
    };
}

export function getAllBlogPosts(): BlogPostData[] {
    const slugs = getBlogSlugs();
    const posts = slugs
        .map((slug) => getBlogPostBySlug(slug))
        .filter((post): post is BlogPostData => post !== null)
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.date || "1970-01-01").getTime();
            const dateB = new Date(b.frontmatter.date || "1970-01-01").getTime();
            return dateB - dateA;
        });
    return posts;
}
