"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Logo = { src: string };

const LOGOS: Logo[] = [
  "coindesk",
  "fortune",
  "bitcoin",
  "nasdaq",
  "newsweek",
  "yahoo",
  "msn",
  "nyse",
  "cnbc",
  "bbc",
  "nypost",
  "theblock",
  "fox5",
  "forbes",
  "coinbureau",
  "benzinga",
].map((name) => ({ src: `/assets/brands/${name}.png` }));

const CELLS = 9; // 3 x 3

/**
 * One grid cell. Crossfades from its current logo to a new one whenever its
 * `logo` prop changes, using two stacked layers so one fades into the next.
 */
function LogoCell({ logo }: { logo: Logo }) {
  const [a, setA] = useState(logo);
  const [b, setB] = useState<Logo | null>(null);
  const [front, setFront] = useState<"a" | "b">("a");
  const frontRef = useRef(front);
  const curRef = useRef(logo);
  frontRef.current = front;

  useEffect(() => {
    if (logo.src === curRef.current.src) return;
    curRef.current = logo;
    if (frontRef.current === "a") {
      setB(logo);
      setFront("b");
    } else {
      setA(logo);
      setFront("a");
    }
  }, [logo]);

  return (
    <div className="brand-cell relative flex items-center justify-center self-stretch">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={a.src}
        alt=""
        className="absolute max-h-[44px] max-w-[70%] object-contain mix-blend-multiply transition-opacity duration-700 ease-out"
        style={{ opacity: front === "a" ? 1 : 0 }}
      />
      {b && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={b.src}
          alt=""
          className="absolute max-h-[44px] max-w-[70%] object-contain mix-blend-multiply transition-opacity duration-700 ease-out"
          style={{ opacity: front === "b" ? 1 : 0 }}
        />
      )}
    </div>
  );
}

/**
 * 3x3 grid. Each tick swaps one random cell to a logo that is NOT currently
 * shown in any cell, so no two cells ever display the same logo at once
 * (per the Figma annotation).
 */
function BrandGrid({ enabled }: { enabled: boolean }) {
  const [slots, setSlots] = useState<number[]>(() =>
    Array.from({ length: CELLS }, (_, i) => i % LOGOS.length)
  );

  useEffect(() => {
    if (!enabled) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      timer = setTimeout(() => {
        setSlots((prev) => {
          const used = new Set(prev);
          const available: number[] = [];
          for (let i = 0; i < LOGOS.length; i++) {
            if (!used.has(i)) available.push(i);
          }
          if (available.length === 0) return prev;
          const cell = Math.floor(Math.random() * CELLS);
          const next = available[Math.floor(Math.random() * available.length)];
          const copy = prev.slice();
          copy[cell] = next;
          return copy;
        });
        tick();
      }, 1400 + Math.random() * 2200);
    };
    tick();
    return () => clearTimeout(timer);
  }, [enabled]);

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2.5 lg:h-[479px]">
      {slots.map((logoIdx, i) => (
        <LogoCell key={i} logo={LOGOS[logoIdx]} />
      ))}
    </div>
  );
}

export default function BrandAlreadyUse() {
  const root = useRef<HTMLElement>(null);
  const [cycling, setCycling] = useState(false);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.set(".brand-char", { opacity: 0, y: 10 });
      gsap.set(".brand-fade", { opacity: 0, y: 16 });
      gsap.set(".brand-cell", { opacity: 0, scale: 0.92 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
          defaults: { ease: "power2.out" },
          onComplete: () => setCycling(true),
        })
        .to(".brand-char", { opacity: 1, y: 0, duration: 0.4, stagger: 0.015 })
        .to(".brand-fade", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to(
          ".brand-cell",
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05 },
          "-=0.2"
        );
    },
    { scope: root }
  );

  // Fallback so cycling still starts (e.g. reduced motion / no reveal).
  useEffect(() => {
    const t = setTimeout(() => setCycling(true), 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={root} className="flex min-h-screen items-center bg-linen py-20">
      <div className="mx-auto grid w-full grid-cols-1 items-center gap-12 px-6 py-6 md:px-12 lg:grid-cols-2 lg:gap-[112px] lg:px-[60px]">
        {/* Text */}
        <div className="flex flex-col gap-4">
          <h2 className="font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-sky sm:text-[56px]">
            <SplitText
              text="Verona, leveraged by brands you already use."
              charClassName="brand-char"
            />
          </h2>
          <p className="brand-fade font-[family-name:var(--font-hedvig-serif)] text-[18px] leading-[1.5] text-sea sm:text-[20px]">
            From rideshare to retail, household names route verified
            intelligence through Verona&mdash;so your actions stay yours, and
            your rewards stay real.
          </p>
        </div>

        {/* Cycling logo grid */}
        <BrandGrid enabled={cycling} />
      </div>
    </section>
  );
}
