"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Logo = { src: string; alt: string };

const LOGOS: Logo[] = [
  { src: "/assets/investors/animoca.svg", alt: "Animoca Brands" },
  { src: "/assets/investors/multicoin.svg", alt: "Multicoin Capital" },
  { src: "/assets/investors/goldentree.svg", alt: "GoldenTree Asset Management" },
  { src: "/assets/investors/spartan.svg", alt: "Spartan" },
  { src: "/assets/investors/laser-digital.svg", alt: "Laser Digital" },
  { src: "/assets/investors/mechanism.svg", alt: "Mechanism Capital" },
  { src: "/assets/investors/sfermion.svg", alt: "Sfermion" },
  { src: "/assets/investors/draper-dragon.svg", alt: "Draper Dragon" },
  { src: "/assets/investors/figment.svg", alt: "Figment Capital" },
  { src: "/assets/investors/vessel.svg", alt: "Vessel" },
  { src: "/assets/investors/morningstar.svg", alt: "Morningstar Ventures" },
  { src: "/assets/investors/innovating.svg", alt: "Innovating Capital" },
  { src: "/assets/investors/anti-capital.svg", alt: "Anti Capital" },
  { src: "/assets/investors/hex-trust.svg", alt: "Hex Trust" },
  { src: "/assets/investors/mh-ventures.svg", alt: "MH Ventures" },
  { src: "/assets/investors/stateless.svg", alt: "Stateless Ventures" },
  { src: "/assets/investors/kucoin.svg", alt: "KuCoin Ventures" },
  { src: "/assets/investors/selini.svg", alt: "Selini" },
];

const FADE_LEFT = {
  backgroundImage:
    "linear-gradient(to right, var(--color-sea), rgba(25,37,80,0))",
};
const FADE_RIGHT = {
  backgroundImage:
    "linear-gradient(to left, var(--color-sea), rgba(25,37,80,0))",
};

export default function Investors() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Continuous right-to-left infinite loop. The track holds two identical
      // copies of the logo list; shifting it by -50% lands the second copy
      // exactly where the first began, so the loop is seamless.
      const loop = gsap.to(track.current, {
        xPercent: -50,
        ease: "none",
        duration: 45,
        repeat: -1,
      });

      if (prefersReduced) {
        loop.pause();
        return;
      }

      // Parallax drift on the background as the section scrolls through.
      gsap.fromTo(
        bgRef.current,
        { yPercent: -12 },
        {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Reveal: heading first, then the logo row.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          defaults: { ease: "power2.out" },
        })
        .from(".investor-heading", { opacity: 0, y: 30, duration: 0.7 })
        .from(".investor-marquee", { opacity: 0, duration: 0.8 }, "-=0.2");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative flex h-[245px] flex-col justify-center overflow-hidden bg-sea text-linen"
    >
      {/* Background image + left-to-right gradient overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div ref={bgRef} className="absolute inset-0 scale-125">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/investors/bg.png"
            alt=""
            className="size-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(25,37,80,0.7)] to-sea" />
      </div>

      <div className="relative z-10 flex w-full flex-col gap-6">
        {/* Heading */}
        <h2 className="investor-heading px-6 text-center font-[family-name:var(--font-hedvig-serif)] text-[28px] leading-[1.1] text-linen sm:text-[40px]">
          $36M+ raised, backed by
        </h2>

        {/* Infinite right-to-left logo marquee */}
        <div className="investor-marquee relative w-full overflow-hidden">
          {/* edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[90px] sm:w-[160px] lg:w-[209px]"
            style={FADE_LEFT}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[90px] sm:w-[160px] lg:w-[209px]"
            style={FADE_RIGHT}
          />

          <div ref={track} className="flex w-max items-center gap-[10px]">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex h-[88px] w-[150px] shrink-0 items-center justify-center px-2 sm:w-[180px]"
                aria-hidden={i >= LOGOS.length}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={i < LOGOS.length ? logo.alt : ""}
                  className="max-h-[56px] w-auto max-w-[150px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
