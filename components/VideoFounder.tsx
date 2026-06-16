"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function VideoFounder() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Reduced motion: skip the pinned scrub, just show it at full width.
      if (prefersReduced) {
        gsap.set(video.current, { scale: 1 });
        return;
      }

      // Pin the section and scrub the video from very small up to 100% of the
      // screen width as the user scrolls. Once it hits full width the section
      // unpins and the user continues to the section below.
      gsap.fromTo(
        video.current,
        { scale: 0.24 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=130%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-linen"
    >
      {/* Video placeholder — base size is full viewport width; it's scaled down
          at the start and grows to scale(1) === 100vw on scroll. */}
      <div
        ref={video}
        className="flex aspect-video w-screen origin-center items-center justify-center bg-white will-change-transform"
      >
        <span className="font-[family-name:var(--font-inter)] text-[68px] font-bold text-black/30">
          VIDEO
        </span>
      </div>
    </section>
  );
}
