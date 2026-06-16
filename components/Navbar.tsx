import { DropdownIcon, GlobeIcon, LogoGlyph, VeronaWordmark } from "./icons";

const NAV_ITEMS = [
  { label: "About", hasDropdown: true },
  { label: "$VERONA", hasDropdown: true },
  { label: "Resources", hasDropdown: true },
  { label: "Blog", hasDropdown: false },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-linen/90 backdrop-blur-[4px]">
      <nav className="mx-auto flex w-full items-center justify-between gap-8 px-6 py-5 md:px-12 lg:px-[90px]">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-[11.25px] text-sea" aria-label="Verona home">
          <VeronaWordmark className="h-[22.5px] w-[130.667px]" />
          <LogoGlyph className="h-8 w-[49.41px]" />
        </a>

        {/* Primary navigation */}
        <ul className="hidden items-center gap-8 py-1.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="flex items-center font-[family-name:var(--font-hedvig-sans)] text-[14px] leading-5 tracking-[0.625px] text-sea transition-opacity hover:opacity-70"
              >
                {item.label}
                {item.hasDropdown && <DropdownIcon className="size-5" aria-hidden />}
              </button>
            </li>
          ))}
        </ul>

        {/* Language selector + CTA */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-[2px] border border-sea px-3 py-1 font-[family-name:var(--font-hedvig-sans)] text-[14px] leading-5 tracking-[0.625px] text-sea transition-colors hover:bg-sea/5"
            aria-label="Select language"
          >
            <GlobeIcon className="size-6" aria-hidden />
            EN
          </button>
          <button
            type="button"
            className="flex h-10 items-center rounded-[2px] bg-sky px-3 py-1 font-[family-name:var(--font-hedvig-sans)] text-[14px] leading-5 tracking-[0.625px] text-sea transition-opacity hover:opacity-90"
          >
            Get $Verona
          </button>
        </div>
      </nav>
    </header>
  );
}
