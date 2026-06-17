"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Step = {
  label: string;
  title: string;
  desc: string;
  /** Diagonal placement on large screens. */
  pos: string;
};

const STEPS: Step[] = [
  {
    label: "01 Websites",
    title: "Prove the page",
    desc: "Prove what a site shows about you, without handing over the login. The proof leaves your browser; the password never does.",
    pos: "lg:col-start-1 lg:row-start-1",
  },
  {
    label: "02 Emails",
    title: "Prove the inbox",
    desc: "Prove what landed in your inbox, without opening it up. The receipt is verifiable; the contents stay sealed.",
    pos: "lg:col-start-2 lg:row-start-2",
  },
  {
    label: "03 Passport",
    title: "Prove who you are",
    desc: "Prove who you are, without copying the document. The identity checks out; the scan never leaves your hands.",
    pos: "lg:col-start-3 lg:row-start-3",
  },
  {
    label: "04 App",
    title: "Prove what you did",
    desc: "Verify a fact once, at its source. You own it, any agent you authorize acts on it, and the data underneath never shows.",
    pos: "lg:col-start-4 lg:row-start-4",
  },
];

export default function OneProof() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.set(".proof-char", { opacity: 0, y: 10 });
      gsap.set(".proof-fade", { opacity: 0, y: 16 });
      gsap.set(".proof-step", { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        defaults: { ease: "power2.out" },
      });

      tl.to(".proof-char", { opacity: 1, y: 0, duration: 0.4, stagger: 0.018 })
        .to(".proof-fade", { opacity: 1, y: 0, duration: 0.5 }, "-=0.1")
        .to(
          ".proof-step",
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.18 },
          "-=0.1"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-linen py-20">
      <div className="mx-auto flex w-full flex-col gap-16 px-6 py-6 md:px-12 lg:gap-28 lg:px-[60px]">
        {/* Heading + intro */}
        <div className="flex flex-col gap-3">
          <h2 className="max-w-[536px] font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] text-sea sm:text-[56px]">
            <SplitText
              text="One proof, and the whole network trusts it."
              charClassName="proof-char"
            />
          </h2>
          <p className="proof-fade max-w-[333px] font-[family-name:var(--font-hedvig-serif)] text-[14px] leading-6 text-sea">
            Verify a fact once, at its source. You own it, any agent you
            authorize acts on it, and the data underneath never shows.
          </p>
        </div>

        {/* Diagonal staircase of proof steps */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-2 lg:gap-y-11">
          {STEPS.map((step) => (
            <div
              key={step.label}
              className={`proof-step flex flex-col gap-4 ${step.pos}`}
            >
              <div className="flex flex-col gap-2 font-[family-name:var(--font-garamond)] leading-[1.1]">
                <p className="text-[52px] text-sky">{step.label}</p>
                <p className="text-[24px] text-sea">{step.title}</p>
              </div>
              <p className="font-[family-name:var(--font-hedvig-serif)] text-[14px] leading-6 text-sea">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
