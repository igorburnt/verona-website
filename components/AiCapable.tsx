"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Card = {
  key: string;
  title: string;
  desc: string;
  icon: string;
  img: string;
};

const CARDS: Card[] = [
  {
    key: "network",
    title: "Payy Network",
    desc: "Private-by-default stablecoin blockchain battle tested with millions of transactions.",
    icon: "/assets/factlayer/icon-network.svg",
    img: "/assets/factlayer/network.png",
  },
  {
    key: "wallet",
    title: "Pay Wallet",
    desc: "Stablecoin neobank built on Payy Network used in over 100 countries.",
    icon: "/assets/factlayer/icon-wallet.svg",
    img: "/assets/factlayer/wallet.png",
  },
  {
    key: "card",
    title: "Payy Card",
    desc: "The only self-custodial Visa card with balance and transaction privacy.",
    icon: "/assets/factlayer/icon-card.svg",
    img: "/assets/factlayer/card.png",
  },
];

/** Icon tinted by the surrounding text color via a CSS mask. */
function MaskIcon({ src, active }: { src: string; active: boolean }) {
  return (
    <span
      aria-hidden
      className={`block size-[35px] shrink-0 bg-current transition-colors duration-300 ${
        active ? "text-sky" : "text-sea"
      }`}
      style={{
        WebkitMaskImage: `url('${src}')`,
        maskImage: `url('${src}')`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export default function AiCapable() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.set(".fact-char", { opacity: 0, y: 10 });
      gsap.set(".fact-card", { opacity: 0, y: 24 });
      gsap.set(".fact-art", { opacity: 0, scale: 0.95 });

      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
          defaults: { ease: "power2.out" },
        })
        .to(".fact-char", { opacity: 1, y: 0, duration: 0.4, stagger: 0.015 })
        .to(".fact-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }, "-=0.1")
        .to(
          ".fact-art",
          { opacity: 1, scale: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="flex min-h-screen items-center bg-seashell py-20"
    >
      <div className="mx-auto flex w-full flex-col gap-12 px-6 py-6 md:px-12 lg:gap-20 lg:px-[60px]">
        {/* Heading */}
        <h2 className="max-w-[538px] font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-sea sm:text-[56px]">
          <SplitText
            text="Every participant connects to the same fact layer."
            charClassName="fact-char"
          />
        </h2>

        {/* Cards + swapping illustration */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Selectable cards */}
          <div className="flex flex-1 flex-col gap-8">
            {CARDS.map((card, i) => {
              const isActive = i === active;
              return (
                <button
                  key={card.key}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`fact-card flex w-full items-start gap-3 border-b-2 bg-linen p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-sky opacity-100"
                      : "border-transparent opacity-70 hover:opacity-90"
                  }`}
                >
                  <MaskIcon src={card.icon} active={isActive} />
                  <div className="flex flex-col gap-2 text-sea">
                    <span className="font-[family-name:var(--font-garamond)] text-[32px] leading-[1.1]">
                      {card.title}
                    </span>
                    <span className="font-[family-name:var(--font-hedvig-sans)] text-[14px] leading-[1.5]">
                      {card.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Illustration — crossfades to match the active card */}
          <div className="fact-art w-full lg:w-[648px]">
            <div className="relative aspect-[798/590] w-full">
              {CARDS.map((card, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={card.key}
                  src={card.img}
                  alt={card.title}
                  className="absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
