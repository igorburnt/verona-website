"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Article = {
  image: string;
  title: string;
  excerpt: string;
  href: string;
};

const ARTICLES: Article[] = [
  {
    image: "/assets/news/card1.png",
    title: "Seamless Integration",
    excerpt:
      "Verona makes information programmable. It gives developers, communities, and applications the ability to build on verified, real-world data.",
    href: "#",
  },
  {
    image: "/assets/news/card2.png",
    title: "Seamless Integration",
    excerpt:
      "Verona makes information programmable. It gives developers, communities, and applications the ability to build on verified, real-world data.",
    href: "#",
  },
  {
    image: "/assets/news/card3.png",
    title: "Seamless Integration",
    excerpt:
      "Verona makes information programmable. It gives developers, communities, and applications the ability to build on verified, real-world data.",
    href: "#",
  },
];

function CornerDownRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </svg>
  );
}

export default function InTheNews() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.set(".news-heading, .news-cta", { opacity: 0, y: 20 });
      gsap.set(".news-card", { opacity: 0, y: 32 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(".news-heading", { opacity: 1, y: 0, duration: 0.6 })
        .to(
          ".news-card",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          "-=0.25"
        )
        .to(".news-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="flex min-h-screen flex-col justify-center bg-linen"
    >
      <div className="mx-auto flex w-full flex-col gap-6 px-6 py-12 md:px-12 lg:px-[60px]">
        {/* Heading */}
        <h2 className="news-heading font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-sea sm:text-[56px]">
          In the news
        </h2>

        {/* Cards — narrower, left-aligned, sized so the section fits one screen */}
        <div className="flex flex-wrap gap-6">
          {ARTICLES.map((article, i) => (
            <article
              key={i}
              className="news-card flex w-full flex-col gap-4 sm:w-[calc(50%-0.75rem)] lg:w-[clamp(216px,17vw,256px)]"
            >
              <div className="relative aspect-[1080/1457] overflow-hidden bg-[#e7e6e2]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-[11px]">
                <h3 className="font-[family-name:var(--font-hedvig-serif)] text-[16px] leading-[1.4] text-forest">
                  {article.title}
                </h3>
                <p className="font-[family-name:var(--font-hedvig-serif)] text-[12px] leading-[1.4] text-forest">
                  {article.excerpt}
                </p>
                <a
                  href={article.href}
                  className="flex items-center gap-0.5 font-[family-name:var(--font-hedvig-serif)] text-[12px] leading-[1.4] text-forest opacity-70 transition-opacity hover:opacity-100"
                >
                  <CornerDownRight className="size-3" />
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <a
          href="#"
          className="news-cta flex h-10 w-fit items-center rounded-[2px] border border-sea px-3 py-1 font-[family-name:var(--font-hedvig-sans)] text-[14px] leading-5 tracking-[0.625px] text-sea transition-colors hover:bg-sea/5"
        >
          Read more
        </a>
      </div>
    </section>
  );
}
