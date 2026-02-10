import { useQuery } from "@tanstack/react-query";

export type Article = {
  id: string;
  slug: string;
  title: string;
  date: string;
  category: string;
  tags?: string[];
  description?: string;
  coverImageUrl?: string;
  content: string;
};

const markdownFiles = import.meta.glob("../content/**/*.md", {
  as: "raw",
  eager: true,
});

type Frontmatter = Record<string, string>;

const normalizeCategory = (value: string) => value.trim().toLowerCase();

const parseTags = (value: string) => {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return trimmed
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const parseFrontmatter = (raw: string) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {} as Frontmatter, content: raw };

  const lines = match[1].split(/\r?\n/);
  const data: Frontmatter = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) continue;
    data[key.trim()] = rest.join(":").trim();
  }

  return { data, content: raw.slice(match[0].length) };
};

const deriveCategoryFromPath = (path: string) => {
  if (path.includes("/writeups/") || path.includes("\\writeups\\")) return "writeups";
  if (path.includes("/research/") || path.includes("\\research\\")) return "research";
  return "archives";
};

const parseArticle = (path: string, raw: string): Article => {
  const { data, content } = parseFrontmatter(raw);
  const filename = path.split(/[\\/]/).pop() ?? "article";
  const fallbackSlug = filename.replace(/\.md$/, "");
  const slug = data.slug ? data.slug : fallbackSlug;
  const category = data.category ? normalizeCategory(data.category) : deriveCategoryFromPath(path);
  const tags = data.tags ? parseTags(data.tags) : undefined;
  const coverImageUrl = data.coverImage || data.coverImageUrl || data.cover_image_url;

  return {
    id: slug,
    slug,
    title: data.title || fallbackSlug,
    date: data.date || "1970-01-01",
    category,
    tags,
    description: data.description,
    coverImageUrl,
    content: content.trim(),
  };
};

const allArticles = Object.entries(markdownFiles)
  .map(([path, raw]) => parseArticle(path, raw as string))
  .sort((a, b) => b.date.localeCompare(a.date));

export const useArticles = (category?: string) =>
  useQuery({
    queryKey: ["articles", category],
    queryFn: async () => {
      if (!category) return allArticles;
      const target = normalizeCategory(category);
      return allArticles.filter((article) => normalizeCategory(article.category) === target);
    },
  });

export const useArticleBySlug = (slug: string) =>
  useQuery({
    queryKey: ["article", slug],
    queryFn: async () => {
      const article = allArticles.find((entry) => entry.slug === slug);
      return article ?? null;
    },
    enabled: !!slug,
  });
