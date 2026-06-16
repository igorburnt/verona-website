"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "./SplitText";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return; // leave everything in its visible resting state

      // Hide + offset before first paint to avoid a flash of finished text.
      gsap.set(".hero-char", { opacity: 0, y: 10 });
      gsap.set(".hero-letter", { opacity: 0, y: 28 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Top text fades in, letter by letter, in quick succession.
      tl.to(".hero-char", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.022,
      });

      // "VERONA" reveals at the same time (V -> A), letter by letter.
      tl.to(
        ".hero-letter",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.09,
        },
        0
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="flex min-h-[calc(100svh-72px)] flex-col justify-end bg-linen py-5"
    >
      <div className="flex w-full flex-1 flex-col justify-end gap-[112px] px-[60px] py-6">
        {/* Text content — right aligned */}
        <div className="flex w-full flex-col items-end gap-3 text-right text-sea">
          <h1 className="font-[family-name:var(--font-garamond)] text-[40px] leading-[1.1] sm:text-[56px]">
            <SplitText text="Making AI Intelligent" charClassName="hero-char" />
          </h1>
          <p className="w-[333px] max-w-full font-[family-name:var(--font-hedvig-serif)] text-[14px] leading-6">
            <SplitText text="Verona makes user-verified data portable, private, and programmable, so agents can transact on information the user actually owns." charClassName="hero-char" />
          </p>
        </div>

        {/* Oversized VERONA wordmark */}
        <div className="flex w-full flex-col justify-center">
          <svg
            viewBox="0 0 1320 228"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-auto w-full text-sea"
            role="img"
            aria-label="Verona"
          >
            {/* V */}
            <path className="hero-letter" d="M172.917 3.54907H215.406C208.489 14.0887 201.572 29.2394 193.997 48.6717L127.136 224.222H93.2107L25.3612 53.9415C19.4326 39.1202 14.8215 28.5806 11.1985 21.9934C7.9048 15.4061 4.28176 9.14822 0 3.54907H50.7225C50.7225 11.7831 54.0161 24.9576 60.6035 42.7432L101.774 154.068C106.715 167.572 110.338 178.441 113.302 187.004C114.949 181.405 117.913 171.195 122.854 156.703L163.366 40.4377C170.941 19.6878 172.917 10.4657 172.917 3.54907Z" fill="currentColor" />
            {/* E */}
            <path className="hero-letter" d="M385.77 187.663L380.501 224.222H245.131C248.095 215.329 249.742 201.825 249.742 183.052V44.39C249.742 25.9457 248.095 12.4419 245.131 3.54907H376.878V38.4615C361.397 32.2036 348.881 29.8981 325.167 29.8981H285.972V92.477H358.433V124.754C348.223 120.802 330.437 118.826 314.298 118.826H285.972V197.544H333.401C355.469 197.544 369.631 194.25 385.77 187.663Z" fill="currentColor" />
            {/* R */}
            <path className="hero-letter" d="M592.738 224.222H546.297L491.293 137.27C481.083 137.6 474.166 137.929 470.214 137.929H460.003V183.052C460.003 201.825 461.65 215.329 464.614 224.222H418.833C422.126 215.659 423.773 201.825 423.773 183.052V44.39C423.773 25.6163 422.126 12.1125 418.833 3.54907H482.071C539.71 3.54907 568.694 24.9576 568.694 67.4454C568.694 101.37 551.238 123.766 527.524 132L565.73 188.651C574.952 202.484 583.845 214.341 592.738 224.222ZM460.003 111.58H477.789C493.928 111.58 506.773 108.945 516.654 103.346C526.865 97.7467 531.805 86.5484 531.805 69.7509C531.805 37.8028 510.726 29.5687 474.166 29.5687H460.003V111.58Z" fill="currentColor" />
            {/* O */}
            <path className="hero-letter" d="M610.065 117.267C609.077 49.0894 658.482 -0.973702 726.99 0.0143728C793.193 0.0143728 837.658 43.8196 837.658 111.01C837.658 179.517 790.888 227.604 721.391 227.604C654.859 227.604 610.065 183.799 610.065 117.267ZM800.11 118.914C800.11 67.8631 766.514 29.3276 719.744 29.3276C676.268 29.3276 647.613 62.9226 647.613 108.704C647.613 159.426 680.879 197.961 728.308 197.961C770.796 197.961 800.11 163.378 800.11 118.914Z" fill="currentColor" />
            {/* N */}
            <path className="hero-letter" d="M1030.95 3.54907H1073.1C1070.14 12.4419 1068.49 25.9457 1068.49 44.39V224.222H1042.14L925.548 76.9969C921.925 72.0565 918.961 67.7748 916.985 63.8224C917.314 67.4454 917.644 72.0565 917.644 77.985V183.052C917.644 201.825 919.29 215.329 922.255 224.222H880.096C883.06 215.329 884.707 201.825 884.707 183.052V31.5449L864.286 3.87843V3.54907H912.374L1025.68 146.822C1028.97 151.103 1032.59 156.044 1036.22 162.302C1035.89 156.044 1035.56 150.445 1035.56 145.504V44.39C1035.56 25.9457 1033.91 12.4419 1030.95 3.54907Z" fill="currentColor" />
            {/* A */}
            <path className="hero-letter" d="M1320 224.222H1269.94C1269.94 212.365 1267.3 201.825 1261.04 185.687L1253.8 166.254H1163.55L1156.63 185.028C1150.38 201.825 1147.41 214.67 1147.41 224.222H1101.96C1110.19 213.353 1118.76 196.226 1127.98 173.5L1178.7 45.7075C1186.61 25.9457 1189.24 16.7236 1189.24 9.80696C1189.24 8.16015 1188.91 6.18396 1188.58 3.54907H1225.47L1294.97 173.829C1302.54 191.944 1312.43 213.682 1320 224.222ZM1173.43 139.576H1243.59L1213.29 59.2113C1210.65 52.2947 1209 47.0249 1208.35 43.7313L1203.08 59.2113L1173.43 139.576Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
}
