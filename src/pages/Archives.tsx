import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Timeline from "@/components/Timeline";
import SidebarBento from "@/components/SidebarBento";
import { useArticles } from "@/hooks/useArticles";
import { useSearchParams } from "react-router-dom";

const Archives = () => {
  const { data: articles = [], isLoading } = useArticles();
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const monthFilter = searchParams.get("month");
  const categoryFilter = searchParams.get("category");

  const filtered = articles.filter((article) => {
    if (tagFilter && !(article.tags ?? []).includes(tagFilter)) return false;
    if (monthFilter && !article.date.startsWith(monthFilter)) return false;
    if (categoryFilter && article.category.toLowerCase() !== categoryFilter.toLowerCase())
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="bento-narrow w-full lg:w-[360px] anim-in-top">
            <SidebarBento articles={articles} />
          </aside>
          <div className="flex-1 min-w-0 anim-in-bottom">
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <Timeline articles={filtered} title="All Articles" />
            )}
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Archives;
