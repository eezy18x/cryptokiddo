import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Timeline from "@/components/Timeline";
import SidebarBento from "@/components/SidebarBento";
import { useArticles } from "@/hooks/useArticles";

const Research = () => {
  const { data: articles = [], isLoading } = useArticles("research");
  const { data: allArticles = [] } = useArticles();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="bento-narrow w-full lg:w-[360px] anim-in-top">
            <SidebarBento articles={allArticles} />
          </aside>
          <div className="flex-1 min-w-0 anim-in-bottom">
            {isLoading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <Timeline articles={articles} title="Category - research" />
            )}
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Research;
