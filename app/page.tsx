import AiCapable from "@/components/AiCapable";
import Hero from "@/components/Hero";
import Investors from "@/components/Investors";
import Navbar from "@/components/Navbar";
import VideoFounder from "@/components/VideoFounder";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero pins while the Investors section scrolls up and overlaps it. */}
        <div className="relative">
          <div className="sticky top-0">
            <Hero />
          </div>
          <div className="relative z-10">
            <Investors />
          </div>
        </div>
        <VideoFounder />
        <AiCapable />
      </main>
    </>
  );
}
