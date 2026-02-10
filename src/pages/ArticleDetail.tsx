import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useArticleBySlug } from "@/hooks/useArticles";
import { Calendar, Tag } from "lucide-react";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = useArticleBySlug(slug || "");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-20 flex-1 w-full">
        {isLoading && <p className="text-muted-foreground">Loading...</p>}
        {!isLoading && !article && <p className="text-muted-foreground">Article not found.</p>}
        {article && (
          <article>
            {article.coverImageUrl && (
              <img
                src={article.coverImageUrl}
                alt={article.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
            )}
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs mb-6">
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
            <div className="article-content prose prose-invert prose-sm max-w-none [&_h1]:font-heading [&_h2]:font-heading [&_h3]:font-heading [&_a]:text-primary [&_code]:bg-secondary [&_code]:px-1 [&_code]:rounded [&_pre]:bg-secondary [&_pre]:p-4 [&_pre]:rounded [&_blockquote]:border-l-primary">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content || ""}
              </ReactMarkdown>
            </div>
          </article>
        )}
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default ArticleDetail;
