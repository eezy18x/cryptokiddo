import { ChevronDown, ArrowLeftRight, Search, FileText, User, X, Settings } from "lucide-react";
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
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";

const Index = () => {
  const { data: articles = [] } = useArticles();
  const [filter, setFilter] = useState<"all" | "writeups" | "research">("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredArticles = useMemo(() => {
    if (filter === "all") return articles;
    return articles.filter((article) => article.category.toLowerCase() === filter);
  }, [articles, filter]);

  const recentArticles = filteredArticles.slice(0, 5);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return articles.filter((article) => {
      const haystack = [
        article.title,
        article.description ?? "",
        article.category,
        ...(article.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [articles, searchQuery]);
  const [largeImages, setLargeImages] = useState(false);

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
        <div className="relative z-10 text-center w-full max-w-4xl px-4 sm:px-6">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 flex-1 w-full">
        <div className={`flex flex-col ${largeImages ? "" : "lg:flex-row"} gap-12`}>
          {!largeImages && (
            <aside className="bento-narrow w-full lg:w-[360px]">
              <SidebarBento articles={articles} showRecentPosts={false} />
            </aside>
          )}

          <div className="flex-1 min-w-0">
            {recentArticles.length > 0 ? (
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h2 className="font-heading text-3xl font-bold text-foreground">Recent Posts</h2>
                  {filter !== "all" && (
                    <button
                      type="button"
                      onClick={() => setFilter("all")}
                      className="text-xs px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  {recentArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/article/${article.slug}`}
                      className="group flex flex-col md:flex-row gap-4 sm:gap-5 p-4 sm:p-5 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
                    >
                      {article.coverImageUrl && (
                        <div
                          className={`w-full overflow-hidden rounded-lg border border-border bg-black/60 ${
                            largeImages ? "md:w-80 h-52 sm:h-60" : "md:w-40 h-28 sm:h-32"
                          }`}
                        >
                          <img
                            src={article.coverImageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground">{article.date}</div>
                        <h3 className="mt-1 text-lg sm:text-xl font-semibold text-foreground">{article.title}</h3>
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

            <div className="mt-10">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-6">Projects</h2>
              <div className="space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="font-heading text-2xl font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.tagline}</p>
                      </div>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm text-foreground hover:text-primary hover:border-primary/50 transition-colors"
                      >
                        View on GitHub
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] px-2 py-1 rounded bg-secondary text-accent"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed right-2 bottom-20 sm:right-4 sm:bottom-24 z-50 flex flex-col items-end gap-2 max-w-[calc(100vw-16px)]">
        {menuOpen && (
          <div className="flex flex-row sm:flex-col gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/80 border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-lg backdrop-blur"
              aria-label="Open search"
              title="Search"
            >
              <Search size={16} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => setFilter("writeups")}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border shadow-lg backdrop-blur transition-colors ${
                filter === "writeups"
                  ? "bg-primary/20 text-primary border-primary/50"
                  : "bg-secondary/80 text-foreground hover:text-primary hover:border-primary/50"
              }`}
              aria-label="Filter writeups"
              title="Writeups"
            >
              <FileText size={16} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => setFilter("research")}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-border shadow-lg backdrop-blur transition-colors ${
                filter === "research"
                  ? "bg-primary/20 text-primary border-primary/50"
                  : "bg-secondary/80 text-foreground hover:text-primary hover:border-primary/50"
              }`}
              aria-label="Filter research"
              title="Research"
            >
              <User size={16} className="mx-auto" />
            </button>
            <button
              type="button"
              onClick={() => setLargeImages((prev) => !prev)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary/80 border border-border text-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-lg backdrop-blur"
              aria-label="Toggle post image size"
              title={`Image size: ${largeImages ? "Large" : "Small"}`}
            >
              <ArrowLeftRight size={16} className="mx-auto" />
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-transparent border border-transparent text-foreground hover:text-primary transition-colors ${
            menuOpen ? "text-primary" : ""
          }`}
          aria-label="Toggle quick actions"
          title="Quick actions"
        >
          {menuOpen ? (
            <X size={16} className="mx-auto" />
          ) : (
            <Settings size={16} className="mx-auto spin-slow" />
          )}
        </button>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto mt-24 bg-card border border-border rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <Search className="text-muted-foreground" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                placeholder="Search posts by title, tags, or category..."
                className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-auto space-y-3">
              {searchQuery.trim().length === 0 && (
                <p className="text-sm text-muted-foreground">Type to search your posts.</p>
              )}
              {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                <p className="text-sm text-muted-foreground">No results found.</p>
              )}
              {searchResults.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="block rounded-lg border border-border bg-secondary/40 p-4 hover:border-primary/50 transition-colors"
                >
                  <div className="text-xs text-muted-foreground">{article.date}</div>
                  <div className="text-foreground font-semibold">{article.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{article.category}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Index;
