"use client";

import { useEffect, useRef, useState } from "react";
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

const COLS = 3;
const ROWS = 4;
const CELLS = COLS * ROWS;

function LogoImg({ logo, className }: { logo: Logo; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt={logo.alt}
      className={`max-h-11 w-auto max-w-[72%] object-contain ${className ?? ""}`}
    />
  );
}

/**
 * A single grid cell that continuously crossfades from one investor logo to the
 * next, in random order (per the Figma development annotation). Two stacked
 * layers swap front/back so one logo fades into the next.
 */
function LogoCell({
  seed,
  enabled,
}: {
  seed: number;
  enabled: boolean;
}) {
  const [aIdx, setAIdx] = useState(seed % LOGOS.length);
  const [bIdx, setBIdx] = useState((seed + 1) % LOGOS.length);
  const [front, setFront] = useState<"a" | "b">("a");

  // Mirror state into refs so the self-scheduling timeout never reads stale values.
  const aRef = useRef(aIdx);
  const bRef = useRef(bIdx);
  const frontRef = useRef(front);
  aRef.current = aIdx;
  bRef.current = bIdx;
  frontRef.current = front;

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;

    const pickDifferent = (current: number) => {
      if (LOGOS.length <= 1) return current;
      let next = current;
      while (next === current) next = Math.floor(Math.random() * LOGOS.length);
      return next;
    };

    const schedule = () => {
      // staggered, randomized cadence so cells don't change in lockstep
      const delay = 2600 + Math.random() * 4200;
      timer = setTimeout(() => {
        const showing = frontRef.current === "a" ? aRef.current : bRef.current;
        const next = pickDifferent(showing);
        // load the next logo into the hidden (back) layer, then flip
        if (frontRef.current === "a") {
          setBIdx(next);
          setFront("b");
        } else {
          setAIdx(next);
          setFront("a");
        }
        schedule();
      }, delay);
    };

    // unique initial offset per cell
    const startTimer = setTimeout(schedule, (seed % 6) * 350);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [enabled, seed]);

  return (
    <div className="investor-cell relative flex min-h-[88px] items-center justify-center overflow-hidden px-2 sm:min-h-[120px]">
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out"
        style={{ opacity: front === "a" ? 1 : 0 }}
      >
        <LogoImg logo={LOGOS[aIdx]} />
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out"
        style={{ opacity: front === "b" ? 1 : 0 }}
      >
        <LogoImg logo={LOGOS[bIdx]} />
      </div>
    </div>
  );
}

export default function Investors() {
  const root = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [cycling, setCycling] = useState(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        setCycling(false);
        return;
      }

      // Subtle parallax on the background image as the section scrolls through.
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

      // Reveal: left text first, then the logos. Start cycling once logos are in.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "power2.out" },
        onComplete: () => setCycling(true),
      });

      tl.from(".investor-heading", {
        opacity: 0,
        y: 30,
        duration: 0.7,
      }).from(
        ".investor-cell",
        {
          opacity: 0,
          y: 24,
          duration: 0.5,
          stagger: { each: 0.06, from: "start" },
        },
        "-=0.2"
      );
    },
    { scope: root }
  );

  // Fallback: if the reveal never runs (e.g. reduced motion paths), still cycle.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;
    const t = setTimeout(() => setCycling(true), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-sea py-20 text-linen"
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

      <div className="relative mx-auto grid w-full grid-cols-1 items-center gap-12 px-6 py-6 md:px-12 lg:grid-cols-2 lg:gap-[112px] lg:px-[60px]">
        {/* Heading */}
        <div className="investor-heading flex flex-col items-center text-center lg:items-end lg:text-right">
          <h2 className="font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-linen sm:text-[56px]">
            $36M+ raised,
            <br />
            backed by
          </h2>
        </div>

        {/* Cycling 3x4 logo grid */}
        <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-10">
          {Array.from({ length: CELLS }).map((_, i) => (
            <LogoCell key={i} seed={i} enabled={cycling} />
          ))}
        </div>
      </div>
    </section>
  );
}
