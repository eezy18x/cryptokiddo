import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SidebarBento from "@/components/SidebarBento";
import { projects } from "@/data/projects";
import { useArticles } from "@/hooks/useArticles";

const Projects = () => {
  const { data: articles = [] } = useArticles();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="bento-narrow w-full lg:w-[360px] anim-in-top">
            <SidebarBento articles={articles} />
          </aside>
          <div className="flex-1 min-w-0 anim-in-bottom">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-8 text-glow">
              Projects
            </h1>
            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h2 className="font-heading text-2xl font-semibold text-foreground">
                        {project.name}
                      </h2>
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
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Projects;
