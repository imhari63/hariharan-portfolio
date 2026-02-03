import { personalData } from "@/utils/data/personal-data";

import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export const metadata = {
  title: "Hariharan R – Software Developer",
  description:
    "Hariharan R is a software developer and full-stack engineer. Explore projects, skills, and experience.",
};

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      {/* SEO AUTHORITY H1 (invisible, intentional) */}
      <h1 className="sr-only">Hariharan R – Software Developer</h1>

      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </div>
  );
}
