"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { LogoGlyph, VeronaWordmark } from "./icons";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMNS: { heading: string; links: string[] }[] = [
  { heading: "Developers", links: ["Docs", "Github"] },
  {
    heading: "Humans",
    links: ["Ero", "Get $VERONA", "Stake $VERONA", "Litepaper", "Community Program"],
  },
  { heading: "Enterprise", links: ["Burnt", "Contact — Demo"] },
  { heading: "Brand", links: ["Press", "Media Kit", "Contact — PR"] },
  {
    heading: "Follow Us",
    links: ["Twitter", "Telegram", "Discord", "LinkedIn", "YouTube", "Newsletter"],
  },
];

function FooterLink({ label }: { label: string }) {
  return (
    <a
      href="#"
      className="group relative inline-block font-[family-name:var(--font-garamond)] text-[15px] leading-6 text-[rgba(248,247,243,0.9)] transition-colors hover:text-linen"
    >
      {label}
      {/* gold underline grows on hover */}
      <span className="absolute -bottom-px left-0 h-px w-0 bg-[#bea64d] transition-[width] duration-300 ease-out group-hover:w-full" />
    </a>
  );
}

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".footer-col", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="relative overflow-hidden bg-sea text-linen">
      {/* faint foliage backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/footer-bg.png"
          alt=""
          className="size-full object-cover opacity-5"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1320px] px-6 py-16 md:px-12 lg:px-[60px]">
        {/* Top: brand + link columns */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          {/* Brand */}
          <div className="footer-col flex flex-col lg:w-[238px]">
            <a
              href="/"
              className="flex items-center gap-[11.25px] text-sky"
              aria-label="Verona home"
            >
              <VeronaWordmark className="h-[22.5px] w-[130.667px]" />
              <LogoGlyph className="h-8 w-[49.4px]" />
            </a>
            <p className="mt-4 max-w-[232px] font-[family-name:var(--font-garamond)] text-[17px] italic leading-[27px] text-linen">
              The intelligence layer for AI. Verify once. Reuse everywhere.
              Expose nothing.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
            {COLUMNS.map((col) => (
              <div key={col.heading} className="footer-col flex flex-col">
                <h3 className="font-[family-name:var(--font-hedvig-sans)] text-[10.5px] uppercase leading-none tracking-[2.31px] text-seashell">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-[11px] pt-4">
                  {col.links.map((link) => (
                    <li key={link}>
                      <FooterLink label={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-24 flex flex-col gap-4 border-t border-[rgba(248,247,243,0.16)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-hedvig-sans)] text-[12px] leading-[1.6] text-[rgba(248,247,243,0.64)]">
            © 2026 Verona, a Burnt company. All rights reserved.
          </p>
          <p className="font-[family-name:var(--font-garamond)] text-[15px] italic leading-6 text-seashell">
            Verify once · Reuse everywhere · Expose nothing
          </p>
        </div>
      </div>
    </footer>
  );
}
