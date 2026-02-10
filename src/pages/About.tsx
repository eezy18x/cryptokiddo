import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SidebarBento from "@/components/SidebarBento";
import FuzzyText from "@/components/FuzzyText";
import { useArticles } from "@/hooks/useArticles";
import { projects } from "@/data/projects";

const About = () => {
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
            <div className="mb-8 flex justify-center lg:justify-start">
              <FuzzyText
                fontSize="clamp(2.4rem, 6vw, 3.6rem)"
                fontWeight={800}
                color="#ffffff"
                baseIntensity={0.12}
                hoverIntensity={0.45}
                fuzzRange={18}
                fps={60}
                direction="horizontal"
                transitionDuration={180}
              >
                About Me 
              </FuzzyText>
            </div>
            <div className="space-y-6 text-secondary-foreground leading-relaxed">
              <p>
                Hey, I'm <span className="text-primary font-bold">Suyog Jung Karki</span>, also known as{" "}
                <span className="text-primary font-bold">cryptokiddo</span>.
              </p>
              <p>
                I'm a cybersecurity enthusiast passionate about penetration testing, CTF challenges,
                red teaming, and cloud security. This site is where I share my writeups, research,
                and notes from my journey in the infosec world.
              </p>
              <div className="border border-border rounded p-6 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.name} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-foreground font-semibold">{project.name}</div>
                          <div className="text-xs text-muted-foreground">{project.tagline}</div>
                        </div>
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                        >
                          GitHub
                        </a>
                      </div>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.slice(0, 4).map((item) => (
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
              <div className="border border-border rounded p-6 bg-card">
                <h2 className="font-heading text-xl font-bold text-foreground mb-4">Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Penetration Testing",
                    "Red Teaming",
                    "CTF",
                    "Bug Bounty",
                    "Cloud Security",
                    "Active Directory",
                    "Web Security",
                    "Malware Analysis",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded bg-secondary text-primary border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default About;
