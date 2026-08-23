import fs from "fs";
import path from "path";
import matter from "gray-matter";

const docsDirectory = path.join(process.cwd(), "content/docs");

export interface DocFrontmatter {
    title: string;
    description?: string;
    order?: number;
    category?: string;
}

export interface DocData {
    slug: string;
    frontmatter: DocFrontmatter;
    content: string;
}

export function getDocSlugs() {
    if (!fs.existsSync(docsDirectory)) return [];
    return fs
        .readdirSync(docsDirectory)
        .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));
}

export function getDocBySlug(slug: string): DocData | null {
    const realSlug = slug.replace(/\.mdx?$/, "");
    const fullPath = path.join(docsDirectory, `${realSlug}.md`);
    const fullPathMdx = path.join(docsDirectory, `${realSlug}.mdx`);

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
        frontmatter: data as DocFrontmatter,
        content,
    };
}

export function getAllDocs(): DocData[] {
    const slugs = getDocSlugs();
    const docs = slugs
        .map((slug) => getDocBySlug(slug))
        .filter((doc): doc is DocData => doc !== null)
        .sort((a, b) => {
            const orderA = a.frontmatter.order ?? 999;
            const orderB = b.frontmatter.order ?? 999;
            return orderA - orderB;
        });
    return docs;
}
