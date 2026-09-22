import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Contact } from "@/components/Contact";
import { HomeScrollSnap } from "@/components/HomeScrollSnap";

export default function Home() {
  return (
    <>
      <Header />
      {/* Renders nothing — just attaches the window-level wheel listener
          that snaps Projects/Contact into place once scroll is past
          Hero's own pinned zone. See HomeScrollSnap.tsx for why this isn't
          a ScrollMain-style wrapping container: Hero's scroll math depends
          on the plain document/window scroll, not a custom container. */}
      <HomeScrollSnap />
      <main>
        <Hero />
        <ProjectsGrid />
        <Contact />
      </main>
    </>
  );
}
