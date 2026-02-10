import { ChevronDown } from "lucide-react";
import TypingEffect from "@/components/TypingEffect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Timeline from "@/components/Timeline";
import { useArticles } from "@/hooks/useArticles";
import cyberpunkBg from "@/assets/cyberpunk-bg.png";
import SidebarBento from "@/components/SidebarBento";
import TrueFocus from "@/components/TrueFocus";
import { Link } from "react-router-dom";

const Index = () => {
  const { data: articles = [] } = useArticles();
  const recentArticles = articles.slice(0, 5);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cyberpunkBg})` }}
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="relative z-10 text-center w-full max-w-4xl px-6">
          <div className="py-6">
            <TrueFocus
              sentence="Crypto Kiddo"
              separator=" "
              manualMode={false}
              blurAmount={6}
              borderColor="#00ff66"
              glowColor="rgba(0, 255, 102, 0.6)"
              animationDuration={0.6}
              pauseBetweenAnimations={1.2}
            />
          </div>
          <div className="mt-4">
            <TypingEffect />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-muted-foreground" size={28} />
        </div>
      </section>

      {/* Profile + Recent Posts */}
      <section className="max-w-6xl mx-auto px-6 py-20 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="bento-narrow w-full lg:w-[360px]">
            <SidebarBento articles={articles} showRecentPosts={false} />
          </aside>

          <div className="flex-1 min-w-0">
            {recentArticles.length > 0 ? (
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Recent Posts</h2>
                <div className="space-y-6">
                  {recentArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug}`}
                      className="group flex flex-col md:flex-row gap-5 p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                    >
                      {article.coverImageUrl && (
                        <div className="w-full md:w-56 h-36 overflow-hidden rounded-lg border border-border bg-black/60">
                          <img
                            src={article.coverImageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">{article.date}</div>
                        <h3 className="mt-1 text-xl font-semibold text-foreground">{article.title}</h3>
                        {article.description && (
                          <p className="mt-2 text-sm text-muted-foreground">{article.description}</p>
                        )}
                        {article.tags && article.tags.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {article.tags.slice(0, 6).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] px-2 py-1 rounded bg-secondary text-accent"
                              >
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
            ) : (
              <div className="text-center">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Recent Posts</h2>
                <p className="text-muted-foreground">No articles yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
