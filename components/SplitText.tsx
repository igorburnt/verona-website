import { Fragment } from "react";

/**
 * Splits a string into per-character spans (grouped per word so line wrapping
 * stays natural). Each character gets `charClassName` so GSAP can stagger them.
 */
export default function SplitText({
  text,
  charClassName = "split-char",
}: {
  text: string;
  charClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span className="inline-block">
            {[...word].map((char, ci) => (
              <span key={ci} className={`${charClassName} inline-block`}>
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
