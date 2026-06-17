import AiCapable from "@/components/AiCapable";
import Hero from "@/components/Hero";
import InTheNews from "@/components/InTheNews";
import Investors from "@/components/Investors";
import Navbar from "@/components/Navbar";
import OneProof from "@/components/OneProof";
import VideoFounder from "@/components/VideoFounder";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Investors />
        <VideoFounder />
        <AiCapable />
        <OneProof />
        <InTheNews />
      </main>
    </>
  );
}
