"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AiCapable() {
  const root = useRef<HTMLElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return; // leave everything in its visible resting state

      // Hide the pieces before reveal (same idea as the Hero: text first, then
      // the visual appears).
      gsap.set(".cap-char", { opacity: 0, y: 10 });
      gsap.set(".cap-fade", { opacity: 0, y: 16 });
      gsap.set(image.current, { opacity: 0, scale: 0.92 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(".cap-char", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.018,
      })
        .to(".cap-fade", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to(
          image.current,
          { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.3"
        );

      // Gentle parallax drift on the illustration as the section scrolls past.
      gsap.fromTo(
        image.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-screen items-center overflow-hidden bg-forest py-20"
    >
      {/* Forest background with the ornamental diamond pattern (color baked in). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-forest bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/ai-capable-pattern.png')" }}
      />

      <div className="relative z-10 mx-auto grid w-full grid-cols-1 items-center gap-12 px-6 py-6 md:px-12 lg:grid-cols-2 lg:gap-[112px] lg:px-[60px]">
        {/* Text content */}
        <div className="flex flex-col items-center gap-3 text-center lg:items-end lg:text-right">
          <h2 className="font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-linen sm:text-[56px]">
            <SplitText
              text="Today's AI is capable, until it counts."
              charClassName="cap-char"
            />
          </h2>
          <p className="cap-fade w-[333px] max-w-full font-[family-name:var(--font-hedvig-serif)] text-[14px] leading-6 text-seashell">
            Agents need provable information to act, and can&apos;t store
            sensitive data.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center lg:justify-start">
          <div
            ref={image}
            className="relative aspect-[820/606] w-full max-w-[760px] overflow-hidden will-change-transform"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/ai-capable.jpg"
              alt="An emblematic illustration: medallions of agent actions flowing toward a central light"
              className="absolute inset-0 size-full scale-105 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
