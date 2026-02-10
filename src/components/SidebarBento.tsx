import { Link } from "react-router-dom";
import { Github, Linkedin, ShieldCheck, Twitter } from "lucide-react";
import MagicBento from "@/components/MagicBento";
import profileAvatar from "@/assets/dp.jpg";
import type { Article } from "@/hooks/useArticles";

type SidebarBentoProps = {
  articles: Article[];
  showRecentPosts?: boolean;
};

const SidebarBento = ({ articles, showRecentPosts = true }: SidebarBentoProps) => {
  const recentArticles = articles.slice(0, 3);
  const tagCount = new Set(articles.flatMap((article) => article.tags ?? [])).size;
  const categoryCount = new Set(articles.map((article) => article.category)).size;
  const categories = Array.from(
    articles.reduce((acc, article) => {
      acc.set(article.category, (acc.get(article.category) ?? 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).sort(([a], [b]) => a.localeCompare(b));
  const tags = Array.from(
    articles
      .flatMap((article) => article.tags ?? [])
      .reduce((acc, tag) => acc.add(tag), new Set<string>())
  ).sort((a, b) => a.localeCompare(b));
  const archives = Array.from(
    articles.reduce((acc, article) => {
      const [year, month] = article.date.split("-");
      const key = `${year}-${month}`;
      acc.set(key, (acc.get(key) ?? 0) + 1);
      return acc;
    }, new Map<string, number>())
  ).sort(([a], [b]) => b.localeCompare(a));
  const lastUpdate = articles[0]?.date ?? "—";

  const profile = {
    name: "CryptoKiddo",
    subtitle: "Cybersecurity, CTFs",
    avatarSrc: profileAvatar,
    socials: [
      { href: "https://github.com/eezy18x", label: "GitHub", Icon: Github },
      {
        href: "https://www.linkedin.com/in/suyog-jung-karki-6497272ab/",
        label: "LinkedIn",
        Icon: Linkedin,
      },
      { href: "https://x.com/ix_sanz", label: "X", Icon: Twitter },
    ],
  };

  const categoryRoute = (name: string) => {
    const normalized = name.toLowerCase();
    if (normalized === "writeups") return "/writeups";
    if (normalized === "research") return "/research";
    return `/archives?category=${encodeURIComponent(normalized)}`;
  };

  return (
    <MagicBento
      textAutoHide={true}
      enableStars
      enableSpotlight
      enableBorderGlow={true}
      enableTilt={false}
      enableMagnetism={false}
      clickEffect
      spotlightRadius={400}
      particleCount={12}
      glowColor="132, 0, 255"
      disableAnimations={false}
    >
      <div>
        <div className="magic-bento-card__content items-center text-center">
          <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border border-border shadow-lg">
            <img
              src={profile.avatarSrc}
              alt={`${profile.name} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="mt-4 text-2xl font-heading font-bold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.subtitle}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center w-full">
            <div>
              <div className="text-xs text-muted-foreground">Articles</div>
              <div className="text-lg font-semibold text-foreground">{articles.length}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Tags</div>
              <div className="text-lg font-semibold text-foreground">{tagCount}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Categories</div>
              <div className="text-lg font-semibold text-foreground">{categoryCount}</div>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/suyog-jung-karki-6497272ab/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-secondary text-foreground px-4 py-2 text-sm hover:bg-secondary/80 transition-colors"
          >
            <ShieldCheck size={16} />
            Follow Me
          </a>
          <div className="mt-4 flex items-center justify-center gap-4 text-muted-foreground">
            {profile.socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-foreground transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="magic-bento-card__content">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold">Announcement</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            This is my blog where I post writeups from Boxes & CTFs along with exploit research.
          </p>
        </div>
      </div>

      {showRecentPosts && (
        <div>
          <div className="magic-bento-card__content">
            <h3 className="text-sm font-semibold text-foreground">Recent Posts - 3</h3>
            <div className="mt-4 space-y-4 text-sm">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.slug}`}
                  className="group grid grid-cols-[56px,1fr] sm:grid-cols-[64px,1fr] gap-3 items-center border-b border-border/60 pb-3 last:border-b-0 last:pb-0 hover:text-primary transition-colors"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border border-border bg-black/60 p-1 anim-in-top">
                    {article.coverImageUrl ? (
                      <img
                        src={article.coverImageUrl}
                        alt={article.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/60" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground">{article.date}</div>
                    <div className="text-foreground truncate">{article.title}</div>
                    {article.tags && article.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-secondary text-accent rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
              {recentArticles.length === 0 && (
                <div className="text-muted-foreground text-xs">No posts yet.</div>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="magic-bento-card__content">
          <h3 className="text-sm font-semibold text-foreground">Categories</h3>
          <div className="mt-4 space-y-2 text-sm">
            {categories.map(([name, count]) => (
              <Link
                key={name}
                to={categoryRoute(name)}
                className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="capitalize">{name}</span>
                <span className="text-foreground">{count}</span>
              </Link>
            ))}
            {categories.length === 0 && (
              <div className="text-muted-foreground text-xs">No categories yet.</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="magic-bento-card__content">
          <h3 className="text-sm font-semibold text-foreground">Tags</h3>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/archives?tag=${encodeURIComponent(tag)}`}
                className="rounded-full bg-secondary px-2.5 py-1 text-muted-foreground hover:text-primary transition-colors"
              >
                {tag}
              </Link>
            ))}
            {tags.length === 0 && <span className="text-muted-foreground text-xs">No tags yet.</span>}
          </div>
        </div>
      </div>

      <div>
        <div className="magic-bento-card__content">
          <h3 className="text-sm font-semibold text-foreground">Archives</h3>
          <div className="mt-4 space-y-2 text-sm">
            {archives.map(([key, count]) => {
              const [year, month] = key.split("-");
              const label = new Date(Number(year), Number(month) - 1, 1).toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              });
              return (
                <Link
                  key={key}
                  to={`/archives?month=${encodeURIComponent(key)}`}
                  className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
                >
                  <span>{label}</span>
                  <span className="text-foreground">{count}</span>
                </Link>
              );
            })}
            {archives.length === 0 && (
              <div className="text-muted-foreground text-xs">No archives yet.</div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="magic-bento-card__content">
          <h3 className="text-sm font-semibold text-foreground">Website Info</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Link
              to="/about"
              className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
            >
              <span>Website</span>
              <span className="text-foreground">CryptoKiddo</span>
            </Link>
            <Link
              to="/archives"
              className="flex items-center justify-between text-muted-foreground hover:text-primary transition-colors"
            >
              <span>Article Count</span>
              <span className="text-foreground">{articles.length}</span>
            </Link>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Unique Visitors</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-16 rounded-full netflix-loader" />
                <span className="h-2 w-3 rounded-full netflix-loader" />
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Page Views</span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-20 rounded-full netflix-loader" />
                <span className="h-2 w-3 rounded-full netflix-loader" />
              </span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Last Update</span>
              <span className="text-foreground">{lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>
    </MagicBento>
  );
};

export default SidebarBento;
