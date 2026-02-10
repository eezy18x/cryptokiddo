import { Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Article } from "@/hooks/useArticles";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link
      to={`/article/${article.id}`}
      className="flex flex-col md:flex-row gap-6 p-6 bg-card border border-border rounded hover:border-primary/40 hover:neon-border transition-all group"
    >
      {article.coverImageUrl && (
        <div className="w-full md:w-64 h-40 overflow-hidden rounded flex-shrink-0">
          <img
            src={article.coverImageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="flex flex-col justify-center gap-2">
        <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {article.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-primary">
            <Calendar size={12} /> {article.date}
          </span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">{article.category}</span>
          {article.tags?.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-accent">
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>
        {article.description && (
          <p className="text-sm text-muted-foreground mt-1">{article.description}</p>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
