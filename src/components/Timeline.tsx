import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "@/hooks/useArticles";

interface TimelineProps {
  articles: Article[];
  title: string;
}

const Timeline = ({ articles, title }: TimelineProps) => {
  const grouped = articles.reduce<Record<string, Article[]>>((acc, article) => {
    const year = article.date.split("-")[0];
    if (!acc[year]) acc[year] = [];
    acc[year].push(article);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-foreground mb-10 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-muted-foreground" />
        {title} - {articles.length}
      </h1>

      <div className="relative ml-4 border-l border-border pl-8">
        {years.map((year) => (
          <div key={year} className="mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 flex items-center gap-3 -ml-[2.85rem]">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              {year}
            </h2>
            <div className="flex flex-col gap-6">
              {grouped[year].map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="flex items-start gap-4 group -ml-[2.35rem]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground flex-shrink-0 mt-2" />
                  <div>
                    <span className="flex items-center gap-1.5 text-xs text-primary">
                      <Calendar size={12} /> {article.date}
                    </span>
                    <span className="text-foreground group-hover:text-primary transition-colors font-medium">
                      {article.title}
                    </span>
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {article.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-secondary text-accent rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {articles.length === 0 && (
          <p className="text-muted-foreground text-sm">No articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default Timeline;
